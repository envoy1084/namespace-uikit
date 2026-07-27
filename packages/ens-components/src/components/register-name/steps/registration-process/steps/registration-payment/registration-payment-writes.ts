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
  prepareSetPrimaryNameWrite,
  type PreparedRegisterNameWrite,
  type PreparedRegistrationPaymentApprovalWrite,
  type PreparedSetAddressRecordWrite,
  type PreparedSetPrimaryNameWrite,
} from "#/actions";
import { parseRegistrationDuration } from "#/lib/helpers";

export interface PreparedRegistrationPaymentWrites {
  addressRecord?: PreparedSetAddressRecordWrite;
  approval?: PreparedRegistrationPaymentApprovalWrite;
  calls: readonly [PreparedContractWrite, ...PreparedContractWrite[]];
  primaryName?: PreparedSetPrimaryNameWrite;
  registration: PreparedRegisterNameWrite;
}

export interface PrepareRegistrationPaymentWritesProps {
  attempt: StoredRegistrationAttempt;
  network: EnsNetwork;
  payment: RegistrationPaymentStatus;
  paymentToken: EnsPaymentToken;
  reverseRegistrarAddress: Address;
}

export function prepareRegistrationPaymentWrites(
  props: PrepareRegistrationPaymentWritesProps,
): Result<PreparedRegistrationPaymentWrites, unknown> {
  const { attempt, network, payment, paymentToken, reverseRegistrarAddress } =
    props;
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
  let primaryName: PreparedSetPrimaryNameWrite | undefined;
  if (attempt.setPrimaryName) {
    const preparedAddressRecord = prepareSetAddressRecordWrite({
      account: attempt.account,
      input: attempt.normalizedName,
      network,
      owner: attempt.owner,
      resolverAddress: attempt.resolver.address,
    });
    if (preparedAddressRecord.isErr()) return err(preparedAddressRecord.error);

    const preparedPrimaryName = prepareSetPrimaryNameWrite({
      account: attempt.account,
      input: attempt.normalizedName,
      network,
      reverseRegistrarAddress,
    });
    if (preparedPrimaryName.isErr()) return err(preparedPrimaryName.error);

    addressRecord = preparedAddressRecord.value;
    primaryName = preparedPrimaryName.value;
  }

  const calls: PreparedContractWrite[] = [
    ...(approval === undefined ? [] : [approval]),
    registration.value,
    ...(addressRecord === undefined ? [] : [addressRecord]),
    ...(primaryName === undefined ? [] : [primaryName]),
  ];

  return ok({
    ...(addressRecord === undefined ? {} : { addressRecord }),
    ...(approval === undefined ? {} : { approval }),
    calls: calls as [PreparedContractWrite, ...PreparedContractWrite[]],
    ...(primaryName === undefined ? {} : { primaryName }),
    registration: registration.value,
  });
}
