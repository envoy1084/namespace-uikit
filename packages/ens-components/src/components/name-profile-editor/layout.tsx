"use client";

import {
  FlowBody,
  FlowFooter,
  FlowHeader,
  FlowHeading,
  type FlowLayoutProps,
} from "#/components/flow-layout";
import type { NameProfileEditorPresentation } from "#/components/name-profile-editor/customization";

type NameProfileEditorLayoutProps = Omit<FlowLayoutProps, "inlineClassName" | "presentation"> & {
  presentation: NameProfileEditorPresentation;
};

export function NameProfileEditorHeader(props: NameProfileEditorLayoutProps) {
  return <FlowHeader {...props} inlineClassName="px-6 pt-6" />;
}

export function NameProfileEditorHeading(props: NameProfileEditorLayoutProps) {
  return <FlowHeading {...props} />;
}

export function NameProfileEditorBody(props: NameProfileEditorLayoutProps) {
  return <FlowBody {...props} inlineClassName="px-6" />;
}

export function NameProfileEditorFooter(props: NameProfileEditorLayoutProps) {
  return <FlowFooter {...props} inlineClassName="px-6 pb-6" />;
}
