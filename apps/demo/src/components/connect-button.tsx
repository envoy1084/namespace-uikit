import { useCallback, useEffect, useState } from "react";

import { Button, Dropdown, Label } from "@thenamespace/uikit";
import {
  CheckIcon,
  Copy01Icon,
  HugeiconsIcon,
  LogoutSquare01Icon,
} from "@thenamespace/uikit/icons";
import { useConnect, useConnection, useDisconnect, useSwitchChain } from "wagmi";
import { sepolia } from "wagmi/chains";

import { truncateAddress } from "../lib/helpers";
import { WalletAvatar } from "./wallet-avatar";

interface AccountDropdownProps {
  address: string;
  onDisconnect: () => void;
}

function AccountDropdown({ address, onDisconnect }: AccountDropdownProps) {
  const [copied, setCopied] = useState(false);

  const copyAddress = useCallback(async () => {
    await navigator.clipboard.writeText(address);
    setCopied(true);
  }, [address]);

  useEffect(() => {
    if (!copied) {
      return;
    }

    const timeout = window.setTimeout(() => {
      setCopied(false);
    }, 1500);

    return () => {
      window.clearTimeout(timeout);
    };
  }, [copied]);

  return (
    <Dropdown>
      <Button aria-label="Open wallet menu" variant="secondary">
        <WalletAvatar address={address} />
        <span className="text-sm font-normal">{truncateAddress(address)}</span>
      </Button>
      <Dropdown.Popover className="min-w-64" placement="bottom end">
        <Dropdown.Menu>
          <Dropdown.Item
            id="copy-address"
            onAction={copyAddress}
            shouldCloseOnSelect={false}
            textValue="Copy address"
          >
            <WalletAvatar address={address} />
            <Label>{truncateAddress(address)}</Label>
            <HugeiconsIcon
              className="text-muted ms-auto size-4"
              icon={copied ? CheckIcon : Copy01Icon}
            />
          </Dropdown.Item>
          <Dropdown.Item
            id="disconnect"
            onAction={onDisconnect}
            textValue="Disconnect"
            variant="danger"
          >
            <HugeiconsIcon className="text-danger size-4 shrink-0" icon={LogoutSquare01Icon} />
            <Label>Disconnect</Label>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown.Popover>
    </Dropdown>
  );
}

export function ConnectButton() {
  const connection = useConnection();
  const { connect, connectors, isPending } = useConnect();
  const { disconnect } = useDisconnect();
  const { isPending: isSwitchingChain, switchChain } = useSwitchChain();

  if (!connection.isConnected || !connection.address) {
    return (
      <Dropdown>
        <Button isDisabled={isPending}>Connect wallet</Button>
        <Dropdown.Popover className="min-w-56" placement="bottom end">
          <Dropdown.Menu aria-label="Choose a wallet">
            {connectors.map((connector) => (
              <Dropdown.Item
                id={connector.id}
                key={connector.uid}
                onAction={() => connect({ connector })}
                textValue={connector.name}
              >
                <Label>{connector.name}</Label>
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown.Popover>
      </Dropdown>
    );
  }

  if (connection.chainId !== sepolia.id) {
    return (
      <Button
        isDisabled={isSwitchingChain}
        onPress={() => switchChain({ chainId: sepolia.id })}
        variant="danger-soft"
      >
        Switch to Sepolia
      </Button>
    );
  }

  return <AccountDropdown address={connection.address} onDisconnect={disconnect} />;
}
