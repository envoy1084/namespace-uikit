"use client";

import {
  FlowBody,
  FlowFooter,
  FlowHeader,
  FlowHeading,
  type FlowLayoutProps,
} from "#/components/flow-layout";
import { useNameRenewal } from "#/components/name-renewal/context";

type NameRenewalLayoutProps = Omit<FlowLayoutProps, "presentation">;

export function NameRenewalHeader(props: NameRenewalLayoutProps) {
  const { presentation } = useNameRenewal();
  return <FlowHeader {...props} presentation={presentation} />;
}

export function NameRenewalHeading(props: NameRenewalLayoutProps) {
  const { presentation } = useNameRenewal();
  return <FlowHeading {...props} presentation={presentation} />;
}

export function NameRenewalBody(props: NameRenewalLayoutProps) {
  const { presentation } = useNameRenewal();
  return <FlowBody {...props} presentation={presentation} />;
}

export function NameRenewalFooter(props: NameRenewalLayoutProps) {
  const { presentation } = useNameRenewal();
  return <FlowFooter {...props} presentation={presentation} />;
}
