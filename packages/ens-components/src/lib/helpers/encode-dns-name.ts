import { concat, numberToHex, stringToHex, type Hex } from "viem";

/** Encodes a normalized ENS name using DNS wire format. */
export function encodeDnsName(name: string): Hex {
  const labels = name.split(".");
  const encodedLabels = labels.map((label) => {
    const encoded = stringToHex(label);
    const byteLength = (encoded.length - 2) / 2;
    if (byteLength === 0 || byteLength > 255) {
      throw new Error("Invalid DNS label");
    }

    return concat([numberToHex(byteLength, { size: 1 }), encoded]);
  });

  return concat([...encodedLabels, "0x00"]);
}
