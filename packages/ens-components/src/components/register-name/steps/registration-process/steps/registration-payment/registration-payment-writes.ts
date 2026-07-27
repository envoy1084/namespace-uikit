import type { Address } from "viem";

import type {
  PreparedContractWrite,
  RegistrationPaymentStatus,
} from "#/actions";
import type { StoredRegistrationAttempt } from "#/components/register-name/hooks/use-registration-attempts";
import type { EnsNetwork, EnsPaymentToken } from "#/data";

import { err, ok, type Result } from "neverthrow";

import {
  prepareRegisterNameWrite,
  prepareRegistrationPaymentApprovalWrite,
  prepareSetAddressRecordWrite,
  prepareSetL1PrimaryNameWrite,
  prepareSetL2PrimaryNameWrite,
  type PreparedRegisterNameWrite,
  type PreparedRegistrationPaymentApprovalWrite,
  type PreparedSetAddressRecordWrite,
  type PreparedSetL1PrimaryNameWrite,
  type PreparedSetL2PrimaryNameWrite,
} from "#/actions";
import { parseRegistrationDuration } from "#/lib/helpers";

export interface PreparedRegistrationPaymentWrites {
  addressRecord?: PreparedSetAddressRecordWrite;
  approval?: PreparedRegistrationPaymentApprovalWrite;
  calls: readonly [PreparedContractWrite, ...PreparedContractWrite[]];
  l1PrimaryName?: PreparedSetL1PrimaryNameWrite;
  l2PrimaryName?: PreparedSetL2PrimaryNameWrite;
  registration: PreparedRegisterNameWrite;
}

export interface PrepareRegistrationPaymentWritesProps {
  attempt: StoredRegistrationAttempt;
  network: EnsNetwork;
  payment: RegistrationPaymentStatus;
  paymentToken: EnsPaymentToken;
  l1ReverseRegistrarAddress: Address;
  l2ReverseRegistrarAddress: Address;
}

export function prepareRegistrationPaymentWrites(
  props: PrepareRegistrationPaymentWritesProps,
): Result<PreparedRegistrationPaymentWrites, unknown> {
  const {
    attempt,
    l1ReverseRegistrarAddress,
    l2ReverseRegistrarAddress,
    network,
    payment,
    paymentToken,
  } = props;
  const duration = parseRegistrationDuration(attempt.duration);
  if (duration === undefined) return err("INVALID_DURATION");

  const registration = prepareRegisterNameWrite({
    account: attempt.account,
    duration,
    input: attempt.label,
    network,
    owner: attempt.owner,
    paymentTokenAddress: paymentToken.address,
    referrer: attempt.referrer,
    registrarAddress: attempt.registrarAddress,
    resolverAddress: attempt.resolver.address,
    secret: attempt.secret,
    subregistryAddress: attempt.subregistry,
  });
  if (registration.isErr()) return err(registration.error);

  let approval: PreparedRegistrationPaymentApprovalWrite | undefined;
  if (!payment.hasSufficientAllowance) {
    const preparedApproval = prepareRegistrationPaymentApprovalWrite({
      account: attempt.account,
      amount: payment.total,
      network,
      paymentTokenAddress: paymentToken.address,
      registrarAddress: attempt.registrarAddress,
    });
    if (preparedApproval.isErr()) return err(preparedApproval.error);
    approval = preparedApproval.value;
  }

  let addressRecord: PreparedSetAddressRecordWrite | undefined;
  let l1PrimaryName: PreparedSetL1PrimaryNameWrite | undefined;
  let l2PrimaryName: PreparedSetL2PrimaryNameWrite | undefined;
  if (attempt.setPrimaryName) {
    const preparedAddressRecord = prepareSetAddressRecordWrite({
      account: attempt.account,
      input: attempt.normalizedName,
      network,
      owner: attempt.account,
      resolverAddress: attempt.resolver.address,
    });
    if (preparedAddressRecord.isErr()) return err(preparedAddressRecord.error);

    const preparedL2PrimaryName = prepareSetL2PrimaryNameWrite({
      account: attempt.account,
      input: attempt.normalizedName,
      l2ReverseRegistrarAddress,
      network,
    });
    if (preparedL2PrimaryName.isErr()) return err(preparedL2PrimaryName.error);

    const preparedL1PrimaryName = prepareSetL1PrimaryNameWrite({
      account: attempt.account,
      input: attempt.normalizedName,
      l1ReverseRegistrarAddress,
      network,
    });
    if (preparedL1PrimaryName.isErr()) return err(preparedL1PrimaryName.error);

    addressRecord = preparedAddressRecord.value;
    l1PrimaryName = preparedL1PrimaryName.value;
    l2PrimaryName = preparedL2PrimaryName.value;
  }

  const calls: PreparedContractWrite[] = [
    ...(approval === undefined ? [] : [approval]),
    registration.value,
    ...(addressRecord === undefined ? [] : [addressRecord]),
    ...(l2PrimaryName === undefined ? [] : [l2PrimaryName]),
    ...(l1PrimaryName === undefined ? [] : [l1PrimaryName]),
  ];

  return ok({
    ...(addressRecord === undefined ? {} : { addressRecord }),
    ...(approval === undefined ? {} : { approval }),
    calls: calls as [PreparedContractWrite, ...PreparedContractWrite[]],
    ...(l1PrimaryName === undefined ? {} : { l1PrimaryName }),
    ...(l2PrimaryName === undefined ? {} : { l2PrimaryName }),
    registration: registration.value,
  });
}
