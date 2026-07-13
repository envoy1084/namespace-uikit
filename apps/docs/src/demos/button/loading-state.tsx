"use client";

import React, { useState } from "react";

import { Button, Spinner } from "@thenamespace/uikit";
import { Attachment01Icon, HugeiconsIcon } from "@thenamespace/uikit/icons";

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
          {isPending ? (
            <Spinner color="current" size="sm" />
          ) : (
            <HugeiconsIcon icon={Attachment01Icon} />
          )}
          {isPending ? "Uploading..." : "Upload File"}
        </>
      )}
    </Button>
  );
}
