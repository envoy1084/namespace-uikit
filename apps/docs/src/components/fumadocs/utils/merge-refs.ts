// oxlint-disable eslint/no-shadow, jsdoc/check-tag-names, unicorn/consistent-function-scoping
import type * as React from "react";

export function mergeRefs<T>(
  ...refs: (React.Ref<T> | undefined)[]
): React.RefCallback<T> {
  return (value) => {
    refs.forEach((ref) => {
      if (typeof ref === "function") {
        ref(value);
      } else if (ref) {
        ref.current = value;
      }
    });
  };
}
