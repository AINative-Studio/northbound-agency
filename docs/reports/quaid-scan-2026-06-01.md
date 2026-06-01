# quaid-scanner Report: /Users/karstenwade/Projects/AINative-Studio/src/northbound-agency

**Score:** 🔴 0.9/10 — CRITICAL risk
**Maturity:** sandbox | **Depth:** standard | **Duration:** 0.2s
**Scanned:** 2026-06-01T21:44:12.320Z

## Pillar Scores

| Pillar | Score | Weight | Findings |
|--------|-------|--------|----------|
| Security | 0.0 | 25% | 0C 73W 1I |
| Governance | 0.0 | 20% | 2C 3W 11I |
| Community | 0.0 | 15% | 0C 4W 9I |
| AI Readiness | 2.5 | 15% | 0C 5W 0I |
| Inclusive Language | 0.0 | 15% | 0C 5W 18I |
| Technical Rigor | 5.0 | 10% | 0C 2W 4I |

## Critical Findings

### license-detection-scanner:missing
**Pillar:** Governance | **Category:** license

No license detected. Without a license, the project is under exclusive copyright by default.

_(source: local file check)_

**Suggestion:** Add a LICENSE file to the repository root. Visit https://choosealicense.com/ for guidance.

**Reference:** https://choosealicense.com/

### vendor-neutrality-critical-concentration
**Pillar:** Governance | **Category:** vendor-neutrality

Project is dominated by ainative.studio (100% of commits)

_(source: computed heuristic)_

**Suggestion:** Diversify contributors across multiple organizations to reduce single-vendor risk

**Reference:** https://chaoss.community/metric-project-sponsorship/

## Warnings

- **[TIMEOUT-binary-artifacts]** Scanner "binary-artifacts" timed out after undefinedms *(Increase scannerTimeout in configuration or check network connectivity)*
- **[TIMEOUT-dep-pinning-docker]** Scanner "dep-pinning-docker" timed out after undefinedms *(Increase scannerTimeout in configuration or check network connectivity)*
- **[dep-pinning-packages-1]** Loosely pinned dependency "@hookform/resolvers": "^3.9.0" uses ^ prefix in dependencies *(Consider pinning "@hookform/resolvers" to an exact version for reproducible builds)*
- **[dep-pinning-packages-2]** Loosely pinned dependency "@netlify/plugin-nextjs": "^5.15.1" uses ^ prefix in dependencies *(Consider pinning "@netlify/plugin-nextjs" to an exact version for reproducible builds)*
- **[dep-pinning-packages-3]** Loosely pinned dependency "@radix-ui/react-accordion": "^1.2.0" uses ^ prefix in dependencies *(Consider pinning "@radix-ui/react-accordion" to an exact version for reproducible builds)*
- **[dep-pinning-packages-4]** Loosely pinned dependency "@radix-ui/react-alert-dialog": "^1.1.1" uses ^ prefix in dependencies *(Consider pinning "@radix-ui/react-alert-dialog" to an exact version for reproducible builds)*
- **[dep-pinning-packages-5]** Loosely pinned dependency "@radix-ui/react-aspect-ratio": "^1.1.0" uses ^ prefix in dependencies *(Consider pinning "@radix-ui/react-aspect-ratio" to an exact version for reproducible builds)*
- **[dep-pinning-packages-6]** Loosely pinned dependency "@radix-ui/react-avatar": "^1.1.0" uses ^ prefix in dependencies *(Consider pinning "@radix-ui/react-avatar" to an exact version for reproducible builds)*
- **[dep-pinning-packages-7]** Loosely pinned dependency "@radix-ui/react-checkbox": "^1.1.1" uses ^ prefix in dependencies *(Consider pinning "@radix-ui/react-checkbox" to an exact version for reproducible builds)*
- **[dep-pinning-packages-8]** Loosely pinned dependency "@radix-ui/react-collapsible": "^1.1.0" uses ^ prefix in dependencies *(Consider pinning "@radix-ui/react-collapsible" to an exact version for reproducible builds)*
- **[dep-pinning-packages-9]** Loosely pinned dependency "@radix-ui/react-context-menu": "^2.2.1" uses ^ prefix in dependencies *(Consider pinning "@radix-ui/react-context-menu" to an exact version for reproducible builds)*
- **[dep-pinning-packages-10]** Loosely pinned dependency "@radix-ui/react-dialog": "^1.1.1" uses ^ prefix in dependencies *(Consider pinning "@radix-ui/react-dialog" to an exact version for reproducible builds)*
- **[dep-pinning-packages-11]** Loosely pinned dependency "@radix-ui/react-dropdown-menu": "^2.1.1" uses ^ prefix in dependencies *(Consider pinning "@radix-ui/react-dropdown-menu" to an exact version for reproducible builds)*
- **[dep-pinning-packages-12]** Loosely pinned dependency "@radix-ui/react-hover-card": "^1.1.1" uses ^ prefix in dependencies *(Consider pinning "@radix-ui/react-hover-card" to an exact version for reproducible builds)*
- **[dep-pinning-packages-13]** Loosely pinned dependency "@radix-ui/react-label": "^2.1.0" uses ^ prefix in dependencies *(Consider pinning "@radix-ui/react-label" to an exact version for reproducible builds)*
- **[dep-pinning-packages-14]** Loosely pinned dependency "@radix-ui/react-menubar": "^1.1.1" uses ^ prefix in dependencies *(Consider pinning "@radix-ui/react-menubar" to an exact version for reproducible builds)*
- **[dep-pinning-packages-15]** Loosely pinned dependency "@radix-ui/react-navigation-menu": "^1.2.0" uses ^ prefix in dependencies *(Consider pinning "@radix-ui/react-navigation-menu" to an exact version for reproducible builds)*
- **[dep-pinning-packages-16]** Loosely pinned dependency "@radix-ui/react-popover": "^1.1.1" uses ^ prefix in dependencies *(Consider pinning "@radix-ui/react-popover" to an exact version for reproducible builds)*
- **[dep-pinning-packages-17]** Loosely pinned dependency "@radix-ui/react-progress": "^1.1.0" uses ^ prefix in dependencies *(Consider pinning "@radix-ui/react-progress" to an exact version for reproducible builds)*
- **[dep-pinning-packages-18]** Loosely pinned dependency "@radix-ui/react-radio-group": "^1.2.0" uses ^ prefix in dependencies *(Consider pinning "@radix-ui/react-radio-group" to an exact version for reproducible builds)*
- **[dep-pinning-packages-19]** Loosely pinned dependency "@radix-ui/react-scroll-area": "^1.1.0" uses ^ prefix in dependencies *(Consider pinning "@radix-ui/react-scroll-area" to an exact version for reproducible builds)*
- **[dep-pinning-packages-20]** Loosely pinned dependency "@radix-ui/react-select": "^2.1.1" uses ^ prefix in dependencies *(Consider pinning "@radix-ui/react-select" to an exact version for reproducible builds)*
- **[dep-pinning-packages-21]** Loosely pinned dependency "@radix-ui/react-separator": "^1.1.0" uses ^ prefix in dependencies *(Consider pinning "@radix-ui/react-separator" to an exact version for reproducible builds)*
- **[dep-pinning-packages-22]** Loosely pinned dependency "@radix-ui/react-slider": "^1.2.0" uses ^ prefix in dependencies *(Consider pinning "@radix-ui/react-slider" to an exact version for reproducible builds)*
- **[dep-pinning-packages-23]** Loosely pinned dependency "@radix-ui/react-slot": "^1.1.0" uses ^ prefix in dependencies *(Consider pinning "@radix-ui/react-slot" to an exact version for reproducible builds)*
- **[dep-pinning-packages-24]** Loosely pinned dependency "@radix-ui/react-switch": "^1.1.0" uses ^ prefix in dependencies *(Consider pinning "@radix-ui/react-switch" to an exact version for reproducible builds)*
- **[dep-pinning-packages-25]** Loosely pinned dependency "@radix-ui/react-tabs": "^1.1.0" uses ^ prefix in dependencies *(Consider pinning "@radix-ui/react-tabs" to an exact version for reproducible builds)*
- **[dep-pinning-packages-26]** Loosely pinned dependency "@radix-ui/react-toast": "^1.2.1" uses ^ prefix in dependencies *(Consider pinning "@radix-ui/react-toast" to an exact version for reproducible builds)*
- **[dep-pinning-packages-27]** Loosely pinned dependency "@radix-ui/react-toggle": "^1.1.0" uses ^ prefix in dependencies *(Consider pinning "@radix-ui/react-toggle" to an exact version for reproducible builds)*
- **[dep-pinning-packages-28]** Loosely pinned dependency "@radix-ui/react-toggle-group": "^1.1.0" uses ^ prefix in dependencies *(Consider pinning "@radix-ui/react-toggle-group" to an exact version for reproducible builds)*
- **[dep-pinning-packages-29]** Loosely pinned dependency "@radix-ui/react-tooltip": "^1.1.2" uses ^ prefix in dependencies *(Consider pinning "@radix-ui/react-tooltip" to an exact version for reproducible builds)*
- **[dep-pinning-packages-30]** Loosely pinned dependency "@react-email/render": "^2.0.4" uses ^ prefix in dependencies *(Consider pinning "@react-email/render" to an exact version for reproducible builds)*
- **[dep-pinning-packages-31]** Loosely pinned dependency "@supabase/supabase-js": "^2.58.0" uses ^ prefix in dependencies *(Consider pinning "@supabase/supabase-js" to an exact version for reproducible builds)*
- **[dep-pinning-packages-32]** Loosely pinned dependency "axios": "^1.6.0" uses ^ prefix in dependencies *(Consider pinning "axios" to an exact version for reproducible builds)*
- **[dep-pinning-packages-33]** Loosely pinned dependency "class-variance-authority": "^0.7.0" uses ^ prefix in dependencies *(Consider pinning "class-variance-authority" to an exact version for reproducible builds)*
- **[dep-pinning-packages-34]** Loosely pinned dependency "clsx": "^2.1.1" uses ^ prefix in dependencies *(Consider pinning "clsx" to an exact version for reproducible builds)*
- **[dep-pinning-packages-35]** Loosely pinned dependency "cmdk": "^1.0.0" uses ^ prefix in dependencies *(Consider pinning "cmdk" to an exact version for reproducible builds)*
- **[dep-pinning-packages-36]** Loosely pinned dependency "date-fns": "^3.6.0" uses ^ prefix in dependencies *(Consider pinning "date-fns" to an exact version for reproducible builds)*
- **[dep-pinning-packages-37]** Loosely pinned dependency "dotenv": "^17.3.1" uses ^ prefix in dependencies *(Consider pinning "dotenv" to an exact version for reproducible builds)*
- **[dep-pinning-packages-38]** Loosely pinned dependency "embla-carousel-react": "^8.3.0" uses ^ prefix in dependencies *(Consider pinning "embla-carousel-react" to an exact version for reproducible builds)*
- **[dep-pinning-packages-39]** Loosely pinned dependency "input-otp": "^1.2.4" uses ^ prefix in dependencies *(Consider pinning "input-otp" to an exact version for reproducible builds)*
- **[dep-pinning-packages-40]** Loosely pinned dependency "lucide-react": "^0.446.0" uses ^ prefix in dependencies *(Consider pinning "lucide-react" to an exact version for reproducible builds)*
- **[dep-pinning-packages-41]** Loosely pinned dependency "next-themes": "^0.3.0" uses ^ prefix in dependencies *(Consider pinning "next-themes" to an exact version for reproducible builds)*
- **[dep-pinning-packages-42]** Loosely pinned dependency "react-day-picker": "^8.10.1" uses ^ prefix in dependencies *(Consider pinning "react-day-picker" to an exact version for reproducible builds)*
- **[dep-pinning-packages-43]** Loosely pinned dependency "react-hook-form": "^7.53.0" uses ^ prefix in dependencies *(Consider pinning "react-hook-form" to an exact version for reproducible builds)*
- **[dep-pinning-packages-44]** Loosely pinned dependency "react-markdown": "^10.1.0" uses ^ prefix in dependencies *(Consider pinning "react-markdown" to an exact version for reproducible builds)*
- **[dep-pinning-packages-45]** Loosely pinned dependency "react-resizable-panels": "^2.1.3" uses ^ prefix in dependencies *(Consider pinning "react-resizable-panels" to an exact version for reproducible builds)*
- **[dep-pinning-packages-46]** Loosely pinned dependency "recharts": "^2.12.7" uses ^ prefix in dependencies *(Consider pinning "recharts" to an exact version for reproducible builds)*
- **[dep-pinning-packages-47]** Loosely pinned dependency "remark-gfm": "^4.0.1" uses ^ prefix in dependencies *(Consider pinning "remark-gfm" to an exact version for reproducible builds)*
- **[dep-pinning-packages-48]** Loosely pinned dependency "resend": "^6.9.2" uses ^ prefix in dependencies *(Consider pinning "resend" to an exact version for reproducible builds)*
- **[dep-pinning-packages-49]** Loosely pinned dependency "sonner": "^1.5.0" uses ^ prefix in dependencies *(Consider pinning "sonner" to an exact version for reproducible builds)*
- **[dep-pinning-packages-50]** Loosely pinned dependency "tailwind-merge": "^2.5.2" uses ^ prefix in dependencies *(Consider pinning "tailwind-merge" to an exact version for reproducible builds)*
- **[dep-pinning-packages-51]** Loosely pinned dependency "tailwindcss-animate": "^1.0.7" uses ^ prefix in dependencies *(Consider pinning "tailwindcss-animate" to an exact version for reproducible builds)*
- **[dep-pinning-packages-52]** Loosely pinned dependency "vaul": "^0.9.9" uses ^ prefix in dependencies *(Consider pinning "vaul" to an exact version for reproducible builds)*
- **[dep-pinning-packages-53]** Loosely pinned dependency "zod": "^3.23.8" uses ^ prefix in dependencies *(Consider pinning "zod" to an exact version for reproducible builds)*
- **[dep-pinning-packages-54]** Loosely pinned dependency "@edge-runtime/ponyfill": "^4.0.0" uses ^ prefix in devDependencies *(Consider pinning "@edge-runtime/ponyfill" to an exact version for reproducible builds)*
- **[dep-pinning-packages-55]** Loosely pinned dependency "@edge-runtime/primitives": "^6.0.0" uses ^ prefix in devDependencies *(Consider pinning "@edge-runtime/primitives" to an exact version for reproducible builds)*
- **[dep-pinning-packages-56]** Loosely pinned dependency "@testing-library/jest-dom": "^6.9.1" uses ^ prefix in devDependencies *(Consider pinning "@testing-library/jest-dom" to an exact version for reproducible builds)*
- **[dep-pinning-packages-57]** Loosely pinned dependency "@testing-library/react": "^16.3.2" uses ^ prefix in devDependencies *(Consider pinning "@testing-library/react" to an exact version for reproducible builds)*
- **[dep-pinning-packages-58]** Loosely pinned dependency "@testing-library/user-event": "^14.6.1" uses ^ prefix in devDependencies *(Consider pinning "@testing-library/user-event" to an exact version for reproducible builds)*
- **[dep-pinning-packages-59]** Loosely pinned dependency "@types/jest": "^30.0.0" uses ^ prefix in devDependencies *(Consider pinning "@types/jest" to an exact version for reproducible builds)*
- **[dep-pinning-packages-60]** Loosely pinned dependency "jest": "^30.2.0" uses ^ prefix in devDependencies *(Consider pinning "jest" to an exact version for reproducible builds)*
- **[dep-pinning-packages-61]** Loosely pinned dependency "jest-environment-jsdom": "^30.2.0" uses ^ prefix in devDependencies *(Consider pinning "jest-environment-jsdom" to an exact version for reproducible builds)*
- **[dep-pinning-packages-62]** Loosely pinned dependency "node-mocks-http": "^1.17.2" uses ^ prefix in devDependencies *(Consider pinning "node-mocks-http" to an exact version for reproducible builds)*
- **[dep-pinning-packages-63]** Loosely pinned dependency "sharp": "^0.34.5" uses ^ prefix in devDependencies *(Consider pinning "sharp" to an exact version for reproducible builds)*
- **[dep-pinning-packages-64]** Loosely pinned dependency "to-ico": "^1.1.5" uses ^ prefix in devDependencies *(Consider pinning "to-ico" to an exact version for reproducible builds)*
- **[dep-pinning-packages-65]** Loosely pinned dependency "ts-jest": "^29.4.6" uses ^ prefix in devDependencies *(Consider pinning "ts-jest" to an exact version for reproducible builds)*
- **[dep-pinning-packages-66]** Loosely pinned dependency "ts-node": "^10.9.2" uses ^ prefix in devDependencies *(Consider pinning "ts-node" to an exact version for reproducible builds)*
- **[dep-pinning-packages-67]** Loosely pinned dependency "tsx": "^4.21.0" uses ^ prefix in devDependencies *(Consider pinning "tsx" to an exact version for reproducible builds)*
- **[dep-pinning-packages-68]** Loosely pinned dependency "undici": "^7.22.0" uses ^ prefix in devDependencies *(Consider pinning "undici" to an exact version for reproducible builds)*
- **[dep-pinning-packages-69]** Loosely pinned dependency "whatwg-fetch": "^3.6.20" uses ^ prefix in devDependencies *(Consider pinning "whatwg-fetch" to an exact version for reproducible builds)*
- **[TIMEOUT-openssf-local-checks]** Scanner "openssf-local-checks" timed out after undefinedms *(Increase scannerTimeout in configuration or check network connectivity)*
- **[TIMEOUT-openssf-scorecard]** Scanner "openssf-scorecard" timed out after undefinedms *(Increase scannerTimeout in configuration or check network connectivity)*
- **[TIMEOUT-clearly-defined]** Scanner "clearly-defined" timed out after undefinedms *(Increase scannerTimeout in configuration or check network connectivity)*
- **[license-content-validation-1]** No LICENSE file found in repository root *(Add a LICENSE file with a recognized open source license)*
- **[TIMEOUT-license-header-scanner]** Scanner "license-header-scanner" timed out after undefinedms *(Increase scannerTimeout in configuration or check network connectivity)*
- **[contributor-data-1]** 1 unique contributor with 39 commits in the last 12 months *(Single contributor detected — consider recruiting additional maintainers)*
- **[contributor-funnel-2]** Conversion rates: casual→regular 0%, regular→core 0% *(Low casual-to-regular conversion suggests contributor onboarding friction)*
- **[psych-safety-1]** No Code of Conduct found *(Add a CODE_OF_CONDUCT.md — see https://www.contributor-covenant.org/)*
- **[support-channels-1]** No SUPPORT.md or .github/SUPPORT.md found *(Add a SUPPORT.md documenting how users can get help)*
- **[agentic-rules-2]** CLAUDE.md lacks recognized structural sections *(Add sections like "Critical Rules", "Project Structure", "Common Tasks" to improve agent guidance.)*
- **[TIMEOUT-ai-repo-detection]** Scanner "ai-repo-detection" timed out after undefinedms *(Increase scannerTimeout in configuration or check network connectivity)*
- **[TIMEOUT-dataset-provenance]** Scanner "dataset-provenance" timed out after undefinedms *(Increase scannerTimeout in configuration or check network connectivity)*
- **[TIMEOUT-model-card-detection]** Scanner "model-card-detection" timed out after undefinedms *(Increase scannerTimeout in configuration or check network connectivity)*
- **[TIMEOUT-model-card-scoring]** Scanner "model-card-scoring" timed out after undefinedms *(Increase scannerTimeout in configuration or check network connectivity)*
- **[AK-PREREQ-MISSING-README.md]** README.md contains tool commands but no Prerequisites or Requirements section *(Consider adding a Prerequisites section listing required tools and versions)*
- **[TIMEOUT-diminishing-language-scanner]** Scanner "diminishing-language-scanner" timed out after undefinedms *(Increase scannerTimeout in configuration or check network connectivity)*
- **[TIMEOUT-inclusive-code-scanner]** Scanner "inclusive-code-scanner" failed: Cannot read properties of undefined (reading 'termListUrl') *(Check scanner implementation for errors)*
- **[TIMEOUT-inclusive-doc-scanner]** Scanner "inclusive-doc-scanner" failed: Cannot read properties of undefined (reading 'termListUrl') *(Check scanner implementation for errors)*
- **[TIMEOUT-inclusive-naming-scanner]** Scanner "inclusive-naming-scanner" failed: Cannot read properties of undefined (reading 'termListUrl') *(Check scanner implementation for errors)*
- **[interaction-templates-1]** No issue templates configured *(Add .github/ISSUE_TEMPLATE/ with bug report and feature request templates)*
- **[test-coverage-2]** Coverage threshold configured at 70% (in jest.config.js) *(Coverage threshold of 70% is below the recommended 80% — consider raising it)*

## Info

- **[branch-protection-1]** GitHub token not provided. Cannot check branch protection settings.
- **[asset-protection-1]** No trademark policy found (optional)
- **[asset-protection-2]** No export control documentation found (optional)
- **[asset-protection-3]** No CLA or DCO requirement detected
- **[asset-protection-4]** Contributor friction level: Low
- **[bus-factor-1]** Bus factor: 1, Elephant factor: 100% (1 contributors, 39 commits in last 12 months)
- **[dep-license-scanning-1]** package.json found but node_modules not installed — cannot scan dependency licenses
- **[governance-classification-1]** No governance model detected — governance files exist but no recognizable model pattern found
- **[governance-detection-1]** No governance documentation found
- **[license-compatibility-1]** Cannot check license compatibility — no LICENSE file found
- **[vendor-neutrality-domain-count]** Found 1 unique email domain(s) across 39 commits
- **[vendor-neutrality-no-succession]** No succession planning documentation found
- **[burnout-detection-1]** Burnout detection requires a GitHub token
- **[contributor-data-2]** Contributor emails span 1 domain
- **[contributor-funnel-1]** Contributor funnel: 0 core, 1 regular, 0 casual (1 total)
- **[funding-1]** No funding infrastructure detected
- **[issue-closure-1]** Issue closure analysis requires a GitHub token
- **[response-classification-1]** Response classification requires a GitHub token
- **[response-time-1]** Response time analysis requires a GitHub token
- **[stale-bot-1]** No stale bot configured
- **[support-channels-2]** README contains a support/help section
- **[AK-TOOL-NPM-README.md:9]** Assumed knowledge: "npm" command used without Node.js listed as prerequisite
- **[AK-TOOL-NPM-README.md:12]** Assumed knowledge: "npm" command used without Node.js listed as prerequisite
- **[AK-ACRONYM-RAG-README.md:3]** Undefined acronym "RAG" may confuse newcomers
- **[AK-ACRONYM-MCP-README.md:68]** Undefined acronym "MCP" may confuse newcomers
- **[AK-ACRONYM-RULES-README.md:101]** Undefined acronym "RULES" may confuse newcomers
- **[AK-ACRONYM-QUICK-README.md:139]** Undefined acronym "QUICK" may confuse newcomers
- **[AK-ACRONYM-START-README.md:139]** Undefined acronym "START" may confuse newcomers
- **[AK-ACRONYM-ACH-README.md:196]** Undefined acronym "ACH" may confuse newcomers
- **[AK-ACRONYM-POST-README.md:203]** Undefined acronym "POST" may confuse newcomers
- **[AK-ACRONYM-BGE-README.md:209]** Undefined acronym "BGE" may confuse newcomers
- **[AK-ACRONYM-TTS-README.md:215]** Undefined acronym "TTS" may confuse newcomers
- **[AK-ACRONYM-JWT-README.md:223]** Undefined acronym "JWT" may confuse newcomers
- **[AK-ACRONYM-GET-README.md:235]** Undefined acronym "GET" may confuse newcomers
- **[AK-ACRONYM-LLM-README.md:287]** Undefined acronym "LLM" may confuse newcomers
- **[AK-ACRONYM-PUT-README.md:318]** Undefined acronym "PUT" may confuse newcomers
- **[AK-ACRONYM-DELETE-README.md:319]** Undefined acronym "DELETE" may confuse newcomers
- **[AK-ACRONYM-CSV-README.md:342]** Undefined acronym "CSV" may confuse newcomers
- **[AK-ACRONYM-KYC-README.md:346]** Undefined acronym "KYC" may confuse newcomers
- **[linter-config-2]** Linter config found but no lint step detected in CI workflows
- **[release-cadence-1]** No releases or version tags found
- **[test-coverage-3]** No coverage badge found in README
- **[semver-validation-1]** No git tags found — cannot validate SemVer

## Recommendations

- **[HIGH impact / medium effort]** Add a LICENSE file to the repository root. Visit https://choosealicense.com/ for guidance.
  - https://choosealicense.com/
- **[HIGH impact / medium effort]** Diversify contributors across multiple organizations to reduce single-vendor risk
  - https://chaoss.community/metric-project-sponsorship/
- **[MEDIUM impact / low effort]** Increase scannerTimeout in configuration or check network connectivity
- **[MEDIUM impact / low effort]** Consider pinning "@hookform/resolvers" to an exact version for reproducible builds
- **[MEDIUM impact / low effort]** Increase scannerTimeout in configuration or check network connectivity
- **[MEDIUM impact / low effort]** Add a LICENSE file with a recognized open source license
- **[MEDIUM impact / low effort]** Single contributor detected — consider recruiting additional maintainers
- **[MEDIUM impact / low effort]** Low casual-to-regular conversion suggests contributor onboarding friction
- **[MEDIUM impact / low effort]** Add a CODE_OF_CONDUCT.md — see https://www.contributor-covenant.org/
- **[MEDIUM impact / low effort]** Add a SUPPORT.md documenting how users can get help
- **[MEDIUM impact / low effort]** Add sections like "Critical Rules", "Project Structure", "Common Tasks" to improve agent guidance.
- **[MEDIUM impact / low effort]** Increase scannerTimeout in configuration or check network connectivity
- **[MEDIUM impact / low effort]** Consider adding a Prerequisites section listing required tools and versions
- **[MEDIUM impact / low effort]** Increase scannerTimeout in configuration or check network connectivity
- **[MEDIUM impact / low effort]** Check scanner implementation for errors
- **[MEDIUM impact / low effort]** Add .github/ISSUE_TEMPLATE/ with bug report and feature request templates
- **[MEDIUM impact / low effort]** Coverage threshold of 70% is below the recommended 80% — consider raising it

## Score Rationale

Overall score is a weighted sum of six pillar scores (each scored 0–10).

| Pillar | Weight | Raw Score | Contribution |
|--------|--------|-----------|-------------|
| Security | 25% | 0.0 | 0.00 |
| Governance | 20% | 0.0 | 0.00 |
| Community | 15% | 0.0 | 0.00 |
| AI Readiness | 15% | 2.5 | 0.38 |
| Inclusive Language | 15% | 0.0 | 0.00 |
| Technical Rigor | 10% | 5.0 | 0.50 |
| **Overall** | **100%** | | **0.90** |

---
*quaid-scanner v0.1.2 | 2026-06-01T21:44:12.320Z*
*Commit: 4c5dd34eb45826fc9dfdce005f114bac5b880ccc*