"use client";

import React, { useState } from "react";

import { Paperclip } from "@gravity-ui/icons";
import { Button, Spinner } from "@thenamespace/uikit";

export function LoadingState() {
  const [isLoading, setLoading] = useState(false);

  const handlePress = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <Button isPending={isLoading} onPress={handlePress}>
      {({ isPending }) => (
        <>
          {isPending ? <Spinner color="current" size="sm" /> : <Paperclip />}
          {isPending ? "Uploading..." : "Upload File"}
        </>
      )}
    </Button>
  );
}
