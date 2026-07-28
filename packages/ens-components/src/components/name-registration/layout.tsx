"use client";

import {
  FlowBody,
  FlowFooter,
  FlowHeader,
  FlowHeading,
  type FlowLayoutProps,
} from "#/components/flow-layout";
import { useNameRegistration } from "#/components/name-registration/context";

type NameRegistrationLayoutProps = Omit<FlowLayoutProps, "presentation">;

export function NameRegistrationHeader(props: NameRegistrationLayoutProps) {
  const { presentation } = useNameRegistration();
  return <FlowHeader {...props} presentation={presentation} />;
}

export function NameRegistrationHeading(props: NameRegistrationLayoutProps) {
  const { presentation } = useNameRegistration();
  return <FlowHeading {...props} presentation={presentation} />;
}

export function NameRegistrationBody(props: NameRegistrationLayoutProps) {
  const { presentation } = useNameRegistration();
  return <FlowBody {...props} presentation={presentation} />;
}

export function NameRegistrationFooter(props: NameRegistrationLayoutProps) {
  const { presentation } = useNameRegistration();
  return <FlowFooter {...props} presentation={presentation} />;
}
