# Documentation migration

This file is the implementation checklist for reducing the upstream HeroUI documentation app into the Namespace UIKit documentation site.

## Target

- One English React documentation tree at `/docs`.
- Documentation for every public `@thenamespace/uikit` component, including the components recreated from HeroUI Pro.
- Interactive examples backed by the local workspace package.
- A concise `/llms.txt` index, a complete `/llms-full.txt`, and a plain-text MDX representation for every documentation page.
- All site-owned images, fonts, icons, and metadata served from `apps/docs/public`.
- No runtime dependency on HeroUI websites, APIs, CDNs, branding, or promotional services.
- Oxlint and Oxfmt as the only lint/format tools.

## Upstream audit

The source app at `.repos/heroui/apps/docs` currently contains:

- 250 English and 250 Chinese MDX pages.
- 683 English and 683 Chinese demo modules.
- React and React Native documentation trees.
- Migration and versioned release documentation.
- Blog, showcase, theme-builder, theme-preset, and Pro promotion surfaces.
- Newsletter, changelog, search, agent-search, RSS, Open Graph, and native-app routes.
- MCP discovery, OAuth/OpenID/JWKS, API catalog, agent skills, and install routes.
- Per-platform LLM indexes, pattern indexes, raw MDX, and full-document endpoints.
- Remote HeroUI asset, avatar, chat-image, GitHub, Figma, Discord, X, App Store, and Play Store references.
- ESLint plus prebuild scripts for skills and generated theme presets.

Copying the complete app would preserve most of the systems that must be removed. The migration therefore keeps only the reusable Fumadocs content pipeline, React demos, component preview helpers, API documentation helpers, code blocks, search, theme switching, and LLM text generation.

## Route contract

Keep:

- `/` — small UIKit documentation landing page.
- `/docs/[[...slug]]` — English React documentation.
- `/llms.txt` — page index with absolute documentation links.
- `/llms-full.txt` — concatenated text for every retained page.
- `/docs/[[...slug]].mdx` — plain-text representation of one documentation page.
- `/api/search` — local Fumadocs search, if required by the selected layout.

Remove:

- All `[lang]`, `cn`, locale dictionary, locale switcher, and translated demo paths.
- All `native` and native showcase/app routes.
- `releases`, `migration`, blog, showcase, themes, RSS, newsletter, changelog, skills, install, agent, MCP, OAuth, OpenID, JWKS, API catalog, and Pro routes.
- Platform-specific and pattern-specific LLM endpoints.

## Content contract

The retained upstream React component pages and demos must be adapted as follows:

- Replace package imports with `@thenamespace/uikit` public entry points.
- Replace HeroUI names, URLs, repository links, metadata, and product copy with Namespace UIKit equivalents.
- Remove CLI, MCP, agent-skill, migration, release, Native, Pro subscription, and theme-builder references.
- Keep only getting-started material that applies to installing, styling, theming, composing, and using the React package.
- Verify every documented prop and class name against the local source rather than assuming upstream parity.

The Pro-derived component inventory is the set of local components that do not exist in the retained free React component documentation. Each requires a page and at least the examples represented in Storybook; additional useful examples should be added where they clarify controlled state, composition, variants, accessibility, or responsive behavior.

## Asset contract

- Scan MDX, TSX, CSS, metadata, and manifests for remote URLs.
- Download every site-owned asset that remains in retained content into `apps/docs/public`.
- Rewrite retained references to root-relative local paths.
- Remove unused upstream assets and remote image allowlists.
- External links used as citations or integration destinations may remain; images, fonts, icons, and branding artwork may not load from HeroUI infrastructure.

## Tooling and verification

Implementation is complete only when all of the following are true:

- The workspace installs without upstream workspace-only packages.
- `apps/docs` passes Oxfmt, Oxlint, and TypeScript checks.
- A production Next.js build succeeds without ignored TypeScript errors.
- Every UIKit public component entry point maps to a documentation page.
- Every retained MDX preview resolves to an existing demo and renders with `@thenamespace/uikit`.
- `/llms.txt`, `/llms-full.txt`, and every per-page MDX endpoint return successful plain-text responses.
- Searches find no Chinese/native/release/migration/version/theme-builder/preset/MCP/OAuth/CLI/Pro-promotion routes or navigation entries.
- Searches find no HeroUI branding or HeroUI-hosted asset URLs in the built application.
- Desktop and mobile smoke tests confirm navigation, search, theme switching, component previews, and code examples.
