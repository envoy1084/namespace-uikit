import { defineConfig } from "vocs/config";

const docs = (path: string) => (path.length === 0 ? "/docs" : `/docs/${path}`);
const page = (text: string, path: string) => ({ text, link: docs(path) });

export default defineConfig({
  accentColor: "#587cff",
  baseUrl: "https://ens-components.vercel.app",
  colorScheme: "light dark",
  description: "React components, hooks, and typed actions for integrating ENS v2.",
  head: {
    link: [{ rel: "manifest", href: "/site.webmanifest" }],
    meta: {
      themeColor: "#f4f4f4",
    },
  },
  iconUrl: "/namespace.svg",
  logoUrl: "/namespace.svg",
  ogImageUrl: "https://ens-components.vercel.app/images/ens-components-og.png",
  renderStrategy: "partial-static",
  sidebar: {
    "/docs": [
      page("Overview", ""),
      {
        text: "Components",
        collapsed: false,
        items: [
          page("NameRegistration", "components/name-registration"),
          page("NameRenewal", "components/name-renewal"),
          page("NameProfileEditor", "components/name-profile-editor"),
          page("TransactionProgress", "components/transaction-progress"),
        ],
      },
      {
        text: "Provider",
        collapsed: false,
        items: [page("EnsProvider", "providers/ens-provider")],
      },
      {
        text: "Hooks",
        items: [
          page("useNameAvailability", "hooks/use-name-availability"),
          page("useNamePrice", "hooks/use-name-price"),
          page("useRegistrationPaymentStatus", "hooks/use-registration-payment-status"),
          page("useCommitmentStatus", "hooks/use-commitment-status"),
          page("useCommitName", "hooks/use-commit-name"),
          page("useRegisterName", "hooks/use-register-name"),
          page("useNameRenewalPrice", "hooks/use-name-renewal-price"),
          page("useNameRenewalPaymentStatus", "hooks/use-name-renewal-payment-status"),
          page("useRenewName", "hooks/use-renew-name"),
          page("useNameProfile", "hooks/use-name-profile"),
          page("useNameRecords", "hooks/use-name-records"),
          page("useNameProfilePermissions", "hooks/use-name-profile-permissions"),
          page("useNameResolver", "hooks/use-name-resolver"),
          page("useResolverCapabilities", "hooks/use-resolver-capabilities"),
          page("useDeployPermissionedResolver", "hooks/use-deploy-permissioned-resolver"),
          page("useUpdateProfileRecords", "hooks/use-update-profile-records"),
          page("useSetAddressRecord", "hooks/use-set-address-record"),
          page("useSetPrimaryName", "hooks/use-set-primary-name"),
          page("useApprovePaymentToken", "hooks/use-approve-payment-token"),
          page("useWalletCapabilities", "hooks/use-wallet-capabilities"),
          page("useExecuteContractWrites", "hooks/use-execute-contract-writes"),
          page("useContractWritesStatus", "hooks/use-contract-writes-status"),
          page("Write mutation options", "hooks/write-mutation-options"),
        ],
      },
      {
        text: "Read actions",
        items: [
          page("Contract reads", "actions/read/contract-reads"),
          page("prepareCommitmentStatusRead", "actions/read/prepare-read-commitment-status"),
          page("prepareNameAvailabilityRead", "actions/read/prepare-read-name-availability"),
          page("prepareNamePriceRead", "actions/read/prepare-read-name-price"),
          page(
            "prepareNameProfileDiscoveryRead",
            "actions/read/prepare-read-name-profile-discovery",
          ),
          page(
            "prepareNameProfilePermissionsRead",
            "actions/read/prepare-read-name-profile-permissions",
          ),
          page("prepareNameRecordsRead", "actions/read/prepare-read-name-records"),
          page(
            "prepareNameRenewalPaymentStatusRead",
            "actions/read/prepare-read-name-renewal-payment-status",
          ),
          page("prepareNameRenewalPriceRead", "actions/read/prepare-read-name-renewal-price"),
          page("prepareNameResolverRead", "actions/read/prepare-read-name-resolver"),
          page(
            "preparePermissionedResolverSupportRead",
            "actions/read/prepare-read-permissioned-resolver-support",
          ),
          page(
            "preparePermissionedResolverVerificationRead",
            "actions/read/prepare-read-permissioned-resolver-verification",
          ),
          page(
            "prepareRegistrationPaymentStatusRead",
            "actions/read/prepare-read-registration-payment-status",
          ),
        ],
      },
      {
        text: "Write actions",
        items: [
          page("Contract write status", "actions/write/contract-write-status"),
          page("executeContractWrites", "actions/write/execute-contract-writes"),
          page("prepareCommitNameWrite", "actions/write/prepare-write-commit-name"),
          page(
            "preparePaymentTokenApprovalWrite",
            "actions/write/prepare-write-payment-token-approval",
          ),
          page(
            "preparePermissionedResolverDeploymentWrite",
            "actions/write/prepare-write-permissioned-resolver-deployment",
          ),
          page("prepareProfileRecordsWrite", "actions/write/prepare-write-profile-records"),
          page("prepareRegisterNameWrite", "actions/write/prepare-write-register-name"),
          page("prepareRenewNameWrite", "actions/write/prepare-write-renew-name"),
          page("prepareSetAddressRecordWrite", "actions/write/prepare-write-set-address-record"),
          page("prepareSetL1PrimaryNameWrite", "actions/write/prepare-write-set-l1-primary-name"),
          page("prepareSetL2PrimaryNameWrite", "actions/write/prepare-write-set-l2-primary-name"),
          page("supportsAtomicBatchCalls", "actions/write/supports-atomic-batch-calls"),
        ],
      },
      {
        text: "Icons",
        items: [page("ENS icons", "icons/icons")],
      },
    ],
  },
  title: "ENS Components",
  titleTemplate: "%s · ENS Components",
  topNav: [
    { text: "Home", link: "/" },
    { text: "Documentation", link: "/docs", match: "/docs" },
    {
      text: "GitHub",
      link: "https://github.com/thenamespace/uikit/tree/main/packages/ens-components",
    },
  ],
});
