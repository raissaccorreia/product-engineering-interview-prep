---
type: project-readiness
schema_version: 1
project_id: product-engineering-interview-prep
project_lifecycle: active
auto_dev_scope: out_of_scope
pilot_priority: excluded
scope_note: "Learning and interview preparation; excluded from auto-dev."
report_language: en-US
snapshot_date: 2026-09-11
base_branch: main
current_branch: main
worktree: dirty_preexisting
remote: configured
staging_local: absent
staging_remote_tracking: absent
staging_remote: unknown_no_api
local_gate: "none"
local_gate_status: needs_definition
github_actions: absent_current_checkout
github_actions_gate: "not_found_in_current_checkout"
github_actions_mirror: not_applicable
branch_protection: absent_user_reported
github_api: unavailable_auth
staging_environment: not_verified
automation_eligibility: blocked
manual_development: allowed
promotion_path: "task-branch -> staging -> human PR -> main"
blocker_codes: []
observed_checks: "typecheck, tests, format check"
audit_mode: read_only_inventory
---

# Project readiness state

Deterministic snapshot produced by the MW-GH-001 read-only diagnosis on 2026-09-11. Frontmatter is the queryable source; prose only explains corrections.

## Política / Policy

This state blocks unattended execution and promotion, not manual development. The default path is `task branch -> staging -> human PR -> main`; this audit created no branches and changed no protection.

## Correções / Corrections

1. Create or confirm `staging` in an explicit per-project task; this diagnosis did not do it.
2. Define a composite local gate from the observed checks before enabling unattended execution.
3. Recheck remote state when `gh` has valid authentication; the reported lack of protection is recorded as user-provided, not as an API result.

## Limite da evidência / Evidence boundary

Local refs do not show `staging`; remote state and rulesets were not queried because `gh` has no valid authentication.
