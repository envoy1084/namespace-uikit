"use client";

import React from "react";

import { Button, Spinner } from "@thenamespace/uikit";

export function Loading() {
  return (
    <Button isPending>
      {({ isPending }) => (
        <>
          {isPending ? <Spinner color="current" size="sm" /> : null}
          Uploading...
        </>
      )}
    </Button>
  );
}
