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
      {
        text: "Introduction",
        collapsed: false,
        items: [
          page("Overview", ""),
          page("Installation", "installation"),
          page("Getting Started", "getting-started"),
          page("TypeScript", "typescript"),
        ],
      },
      {
        text: "Guides",
        collapsed: false,
        items: [
          page("Choosing an API", "guides/choosing-an-api"),
          page("Error Handling", "guides/error-handling"),
          page("Queries", "guides/queries"),
          page("Transactions", "guides/transactions"),
          page("Custom Configuration", "guides/custom-configuration"),
          page("Component Customization", "guides/component-customization"),
        ],
      },
      {
        text: "Configuration",
        collapsed: false,
        items: [
          page("createEnsConfig", "config/create-ens-config"),
          page("EnsProvider", "config/ens-provider"),
          page("Contracts", "config/contracts"),
          page("Payment Tokens", "config/payment-tokens"),
        ],
      },
      {
        text: "Components",
        collapsed: false,
        link: docs("components"),
        items: [
          page("NameRegistration", "components/name-registration"),
          page("NameRenewal", "components/name-renewal"),
          page("NameProfileEditor", "components/name-profile-editor"),
          page("TransactionProgress", "components/transaction-progress"),
        ],
      },
      {
        text: "Hooks",
        collapsed: true,
        link: docs("hooks"),
        items: [
          page("useNameAvailability", "hooks/use-name-availability"),
          page("useNameRegistrationPrice", "hooks/use-name-registration-price"),
          page("useNameRegistrationPaymentStatus", "hooks/use-name-registration-payment-status"),
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
          page("useUpdateNameProfileRecords", "hooks/use-update-name-profile-records"),
          page("useSetAddressRecord", "hooks/use-set-address-record"),
          page("useSetPrimaryName", "hooks/use-set-primary-name"),
          page("useApprovePaymentToken", "hooks/use-approve-payment-token"),
          page("useWalletCapabilities", "hooks/use-wallet-capabilities"),
          page("useExecuteContractWrites", "hooks/use-execute-contract-writes"),
          page("useContractWritesStatus", "hooks/use-contract-writes-status"),
        ],
      },
      {
        text: "Actions",
        collapsed: true,
        link: docs("actions"),
        items: [
          {
            text: "Read Actions",
            collapsed: true,
            items: [
              page("Contract Reads", "actions/read/contract-reads"),
              page("GraphQL Reads", "actions/read/graphql-reads"),
              page("prepareCommitmentStatusRead", "actions/read/prepare-read-commitment-status"),
              page("prepareNameAvailabilityRead", "actions/read/prepare-read-name-availability"),
              page(
                "prepareNameRegistrationPriceRead",
                "actions/read/prepare-read-name-registration-price",
              ),
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
                "prepareNameRegistrationPaymentStatusRead",
                "actions/read/prepare-read-name-registration-payment-status",
              ),
            ],
          },
          {
            text: "Write Actions",
            collapsed: true,
            items: [
              page("Contract Writes", "actions/write/contract-writes"),
              page("Contract Write Status", "actions/write/contract-write-status"),
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
              page(
                "prepareNameProfileRecordsWrite",
                "actions/write/prepare-write-name-profile-records",
              ),
              page("prepareRegisterNameWrite", "actions/write/prepare-write-register-name"),
              page("prepareRenewNameWrite", "actions/write/prepare-write-renew-name"),
              page(
                "prepareSetAddressRecordWrite",
                "actions/write/prepare-write-set-address-record",
              ),
              page(
                "prepareSetL1PrimaryNameWrite",
                "actions/write/prepare-write-set-l1-primary-name",
              ),
              page(
                "prepareSetL2PrimaryNameWrite",
                "actions/write/prepare-write-set-l2-primary-name",
              ),
              page("supportsAtomicBatchCalls", "actions/write/supports-atomic-batch-calls"),
            ],
          },
        ],
      },
      {
        text: "Icons",
        collapsed: true,
        items: [page("Record Icons", "icons/icons")],
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
