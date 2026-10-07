# MKANY ERP - Comprehensive Project Summary

## 🎯 **Project Overview**

**MKANY ERP** is an Enterprise Operating System for the MKANY Group—a real Egyptian business conglomerate operating in **three fundamentally different sectors**:
1. **Smart Agriculture** (hydroponics, greenhouse production, fresh produce supply chain)
2. **Real Estate** (brokerage, property sales, installment plans, multi-party commissions)
3. **Legal Services** (case management, hearings, deadlines, client trust accounts)

The system unifies these diverse businesses under **one accounting system**, with **shared employees** and **one owner** who needs a complete financial picture.

---

## 🏗️ **Core Architecture**

### Technology Stack
| Layer | Technology |
|-------|------------|
| Backend | .NET WEb API |
| Frontend | React 19, TypeScript |
| Styling | Pure css or tailwind 
| Database | PostgreSQL (with RLS support) |

### Architectural Layers
```
Presentation → Http → Application → Domain → Infrastructure
```
- **Controllers**: Thin, no business logic
- **Domain**: Business rules, Enums, Value Objects
- **Application**: Use cases, services, read queries (CQRS)
- **Infrastructure**: Repositories, service providers

---

## 📋 **Guiding Principles (INVARIABLES)**

These are **non-negotiable** rules that every line of code must follow:

### IN-01: Financial Integrity First
- **Debit must equal Credit** before any journal entry is committed
- **Posted entries can NEVER be edited or deleted**—only reversed with a counter-entry
- All financial writes must be inside `DB::transaction()` with audit logging
- **Never use float/double** for monetary values anywhere (DB, PHP, JavaScript)

### IN-02: Internal IDs vs Official Numbers
- Internal IDs (UUIDs) are never shown to users
- Official numbers (invoice numbers, journal numbers) are generated **at posting time** only
- Official numbers are **never reused**, even if a document is canceled
- Generated via database sequence—**never MAX+1 in PHP** (causes race conditions)

### IN-03: Company Isolation (CRITICAL)
- **Zero tolerance**: No record can leak between companies
- Every business table MUST have `company_id` (non-nullable)
- **Global Scope** automatically filters by current user's company
- Foreign keys must verify matching company—an invoice from Company A cannot link to a customer from Company B
- Permission checks ALWAYS include company context

### IN-04: Server-Side Authorization
- Hiding a button is **NOT** authorization—server-side checks are mandatory
- Every route protected by middleware + Policy
- API endpoints follow the **exact same rules** as web routes

### IN-05: No Data Loss
- **No hard deletes** for financial, legal, or contractual entities—only archiving
- All foreign keys are `restrictOnDelete`—never `cascadeOnDelete`
- Audit logs store values (not references) so they remain understandable even after entities are archived

### IN-06: Every Sensitive Action is Logged
- **Who**, **what**, **when**, **where** (IP), **before/after values**
- Audit log is **append-only**—nobody can edit or delete (not even admin)
- Mandatory logging for: logins, security events, approvals, financial actions, users, permissions, integrations

### IN-07: Arabic First
- All text passes through language files—no hardcoded strings
- RTL design **first**, LTR derived from it
- Every feature delivered with **both languages** together

### IN-08: No Dummy Data in Production
- No demo data, test accounts, or dummy customers in production
- Demo data generation is separate, with **mandatory purging** in release pipeline

### IN-09: Single Source of Truth
- Navigation, company scope, permissions, user identity—each concept has **ONE** source of truth
- No duplicated business logic across different screens

### IN-10: No Secrets in Repository
- No API keys, passwords, production credentials, or private keys in code
- Sensitive operational data (supplier costs, margins) go in database, not config files

---

## 🧩 **Domain Structure (Bounded Contexts)**

```
MKANY ERP
├── Accounting (General Ledger - Source of Truth)
├── Real Estate
├── Legal
├── Agriculture
├── CRM / Sales
├── Inventory
├── Marketing
├── HR / Assets
└── Governance (Approvals, Audit)
```

**Critical Rule**: Domains communicate via **services/events only**—never direct table access. The Real Estate domain never writes to `journal_entries`—it calls an accounting service.

---

## 📊 **Domain Deep Dives**

### 1. Accounting (The Financial Core)

**Purpose**: Single source of financial truth. All other domains eventually flow here.

**Key Entities**:
- **Chart of Accounts**: Hierarchical with `is_header` (aggregate, no posting), `is_postable`, `allow_manual_entry`, `control_rules`
- **Journal Entries**: Lifecycle: `draft` → `pending_approval` → `approved` → `posted` → `reversed`
- **Fiscal Periods**: `open` → `locked` → `closed` (permanent)
- **Cost Centers**: Unified profitability analysis across all business domains
- **Currencies**: Exchange rates are **historical**—base value stored, never calculated on-the-fly

**Critical Rules**:
1. **Balanced entry required** before commit (debits = credits)
2. **Posted entries cannot be modified or deleted**—only reversed
3. **Reversal creates a new entry** with opposite signs, referencing original
4. **Official number generated at posting** via database sequence—never reused
5. **Fiscal period must be open** for posting
6. **All accounts must be `is_postable`** and belong to same company

**Missing/Needed**:
- Debit/Credit notes for correcting posted invoices
- Explicit advance payments
- Check management (due dates, banks, status)
- Partner statement (full movement with running balance)
- Credit limit enforcement
- Payment reminder system

---

### 2. Real Estate (Property Sales)

**Purpose**: Manage property inventory with no double-selling, from viewing to handover, with long-term installment plans and multi-party commissions.

**Key Entities**:
- **Project → Phase → Building → Unit** (hierarchy)
- **Unit**: Code, type (apartment/villa/commercial/land), area, price, direction, status
- **Unit Status**: `available` → `reserved` → `contracted` → `sold` → `blocked`
- **Viewings**: Scheduled appointments with sales reps
- **Reservations**: Time-limited (with auto-expiry)
- **Contracts**: Official number, installment schedule, accounting entries
- **Installments**: Monthly/quarterly/half-yearly with overdue tracking
- **Commissions**: Multi-party (company, sales rep, external broker, team manager)

**Critical Business Rules**:
- **Double-booking impossible**—test with concurrent requests
- **Reservation has TTL**—auto-expires with notification
- **Installments sum must equal contract value** (rounding to last installment)
- **Partial payments supported**, applied to oldest outstanding installment
- **Commission calculation** based on configurable rules (fixed amount, percentage, tiers)
- **Cancellation reverses** accounting entries and commissions

**Missing/Needed**:
- Full Unit entity (currently just text in lead)
- "Lost reason" tracking
- Source attribution persistence through entire pipeline

---

### 3. Legal (Case Management)

**Purpose**: Manage client files, cases, hearings, deadlines, and fees with high confidentiality and **zero-missed-deadline guarantee**.

**Key Entities**:
- **Client (Partner)**: With running account balance
- **Case/Matter**: Type, court, assigned lawyer, status, documents
- **Hearing**: Date/time, court, type, attending lawyer, required actions, result
- **Deadline**: Type (appeal, cassation, memo submission, fee payment), due date, critical indicator, responsible person
- **Fees**: Legal fees vs client expenses (separated)
- **Power of Attorney**: Type, scope, validity, expiry

**Critical Business Rules**:
- **Hearing entities must exist**—not just text in notes (current critical gap)
- **Multi-level notifications**: 7 days, 3 days, 1 day, morning of
- **Notifications go to BOTH lawyer and office manager**—never single point of failure
- **Deadlines require completion evidence**—auditable proof
- **Critical deadlines** (peremptory) cannot be postponed without written reason, auto-escalate to manager
- **Postponed hearings must set next date**—mandatory field to prevent missed follow-ups

**Missing/Needed**:
- Hearing entity (critical gap—currently no way to guarantee notifications)
- Deadline enforcement engine
- Proper confidentiality tiers (currently all CRM data visible)

---

### 4. Agriculture (Smart Farming)

**Purpose**: Track crop production from planting to sale, with real profitability analysis and greenhouse monitoring.

**Key Entities**:
- **Farm → Greenhouse/Zone**
- **Crop Cycle**: Crop type, location, start/end dates, all costs and harvests
- **Inputs**: Materials from inventory at actual cost
- **Labor**: Hours or allocation
- **Utilities**: Water, electricity (meter readings or allocation)
- **Harvest**: Quantity by grade, creates inventory lots
- **Waste/Shrinkage**: Recorded and costed to the cycle
- **Sales**: From harvest batches

**Critical Business Rules**:
- **Profitability analysis via cost centers**—not a parallel system
- **Monitoring vs Control MUST be separated**:
  - **Monitoring**: Sensors (temperature, humidity, EC, pH, light) with alerts
  - **Control**: Physical equipment activation—**NEVER directly from web UI**
  - Control requires: IoT Gateway, command validation, safe state, timeouts, acknowledgments, finite retries, emergency stop, separate permissions

**Missing/Needed**:
- **Lots/Batches** (current: single items only)
- **Quality grades** (fresh produce degrades rapidly)
- **Multi-location storage** (cooler, warehouse, transport vehicle)
- **Physical inventory reconciliation** (compare book vs actual)

---

### 5. CRM & Marketing

**Purpose**: Acquire customers, track source attribution, and measure marketing ROI.

**Key Entities**:
- **Campaign → Ad Set → Ad → Lead → Opportunity → Revenue**
- **Lead Sources**: Website, Facebook/Meta, WhatsApp, Phone, Referral, Exhibition, Portals, Manual
- **Marketing Activities**: Manual posting tracking (platform, link, screenshot, review status)
- **Attribution**: Lead source preserved through entire pipeline to revenue

**Pipeline by Sector**:
- **Agriculture**: Inquiry → Sample/Tasting → Quote → Supply Agreement → Delivery/Harvest → Profit/Loss
- **Real Estate**: Inquiry → Unit Viewing → Reservation & Down Payment → Sales Contract → Unit Handover → Profit/Loss
- **Legal**: Inquiry → Engagement/Fees → Active Case → Invoicing → Profit/Loss

**Critical Business Rules**:
- **Lead source must persist through conversion**—breaks attribution if lost
- **Qualified lead scoring**—transparent rules, not black box
- **Duplicate detection**—same phone number from different channels should merge
- **Lost reasons required**—cannot close as "lost" without reason (critical gap)
- **Marketing activity verification**—manager reviews with screenshots in bulk

**Missing/Needed**:
- Lost reason field (current: just closes without reason)
- Source attribution preservation through entire pipeline
- Duplicate lead detection

---

## 🔐 **Security & Authorization**

### Role Model (Spatie Permission)

**Standard Actions**: view, create, edit, delete_draft, submit, review, approve, reject, post, reverse, cancel, export, print, manage

**Key Roles**:
| Role | Capabilities | Restrictions |
|------|--------------|--------------|
| **CFO** | All financial permissions in their company | - |
| **Accountant** | Create entries/invoices, manage inventory, reconcile bank | Cannot post, approve, or certify |
| **Approver** | Approve/reject, read-only otherwise | Cannot create anything |
| **Sales** | CRM only + dashboards + AI assistant | No financial data |
| **Viewer** | Read everything | Cannot write |

### Separation of Duties (SoD) - Critical

**Conflict Matrix** (prevent fraud):
- **Critical conflicts** (system must block):
  - `inward.create` + `approvals.act` (collect and approve cash)
  - `outward.create` + `approvals.act` (disburse and approve payments)
  - `ar.pay` + `approvals.act` (record and approve receivables)
  - `ap.pay` + `approvals.act` (pay and approve suppliers)
  - `journals.approve` + `journals.post` (approve and post own entries)

- **High conflicts** (warning with justification):
  - `journals.create` + `journals.post` (create and post)
  - `journals.create` + `journals.approve` (create and approve)
  - `audit.view` + `users.manage` (manage users and see audit)

### MFA Requirements
- **2FA mandatory** for: `approvals.act`, `users.manage`, `pay`, `journals.post`
- Session invalidation on: password change, role change, user deactivation

---

## 🎨 **UI/UX Design System: OBSIDIAN GOLD**

### Design Philosophy
- **Mission-driven**, not beautiful-first
- **RTL-first** (Arabic is primary, LTR derived)
- **High-density** where needed (accountants need information density)
- **Fast**—perceived speed is part of design
- **Crystal-clear**—user always knows where they are and what to do

### Colors

**Base Palette**:
| Token | Value | Usage |
|-------|-------|-------|
| navy-900 | #0B1B2B | Dark mode background, titles in light mode |
| navy-800 | #10243A | Sidebar, table headers |
| navy-700 | #1C3D5A | Sub-titles, active borders |
| gold-500 | #E6AC00 | Primary action, highlight, active state |
| gold-600 | #B8860B | Gold text on light backgrounds (accessible contrast) |
| gold-50 | #FBF3DC | Alert/light highlight backgrounds |

**Neutrals**:
| Token | Value | Usage |
|-------|-------|-------|
| surface | #FFFFFF | Cards, tables |
| bg | #F5F7F9 | Page background |
| bg-alt | #F2F4F6 | Striped table rows |
| border | #D8DEE4 | Borders, dividers |
| text | #1A1A1A | Primary text |
| text-muted | #5A6B7C | Secondary text, labels |

**Status Colors** (semantic, not decorative):
- **Success**: #15694A (approved, complete, available)
- **Warning**: #8A6100 (pending, awaiting approval, approaching due)
- **Danger**: #FBEAE7 (overdue, rejected, failed, exceeded limit)
- **Info**: #1C3D5A (draft, neutral, monitoring)
- **Dimmed**: #5A6B7C (archived, cancelled, inactive)

### Typography
| Weight | Size | Font | Usage |
|--------|------|------|-------|
| 400 | 14px | Cairo (Arabic) / Inter (English) | Body text |
| 600-700 | 28-40px | Syne | Display headings |
| 400 | 13px | JetBrains Mono | Codes, IDs, numbers |
| 600 | 24px | Cairo | Page title |
| 600 | 18px | Cairo | Section title |
| 500 | 13px | Cairo | Field label |
| 400 | 12px | Cairo | Helper text |

**Critical Rules**:
- **All financial numbers in monospace**—numbers align vertically for quick comparison
- **Financial numbers right-aligned** even in RTL
- **Arabic line-height: 1.7** vs Latin: 1.5
- **Minimum text size: 12px**
- **Line length: max 75 characters**

### Tables (Most Important Component)
- **10,000 rows in browser**—no server-side pagination
- **Server-side filtering, sorting, search**
- **Saved views**—user can save "My overdue invoices"
- **Column control**—show/hide/reorder, saved per user
- **Density options**: relaxed, normal, compact
- **Sticky headers** on scroll
- **Row selection** with bulk actions
- **Numbers right-aligned** with monospace font
- **Status as colored badge** in fixed column position
- **Striped rows** for horizontal tracking
- **Hover highlighting** on row
- **Mobile**: Card view instead of scrolling tables

---

## 🛠️ **Required Screens (New Domains)**

### Real Estate (14 screens)
- Project list (cards with photos + availability %)
- Project page (phases, buildings, visual availability map)
- **Unit inventory** (color-coded by status—MOST IMPORTANT)
- Unit page (specs, price, status, history, interested parties)
- Customer-to-unit matching (from lead, automated suggestions)
- Viewing scheduling (calendar + sales rep assignment)
- Create reservation (drawer: unit + customer + down payment + terms)
- Reservations list (TTL visible on each)
- Create contract (drawer + installment preview before confirmation)
- Contract page (terms, installments, collections, documents, timeline)
- Installment schedule (status per installment, overdue highlighted)
- Record collection (quick drawer from contract page)
- Commissions dashboard (accrued, approved, paid)
- Real estate dashboard (availability, speed, collections, overdue)

### Legal (11 screens)
- **Client list** (with balance + active cases)
- **Case list** (filters: type, court, lawyer, status)
- **Case workspace** (single page with everything—MOST IMPORTANT)
- Hearing list (calendar + list, upcoming highlighted)
- **Record hearing result** (mandatory next date on postponement)
- Deadlines dashboard (critical with special color, countdown)
- Case documents (tiered by confidentiality level)
- Powers of attorney (type, scope, validity, expiry)
- Fees & expenses (clear separation of firm fees vs client expenses)
- Client account (statement with running balance)
- Legal dashboard (week's hearings, deadlines, stalled files)

### Agriculture (10 screens)
- Farm list (with greenhouse status summary)
- **Greenhouse workspace** (zones, readings, active cycles, alerts)
- Crop cycle list (filters: crop, status, location)
- **Crop cycle page** (timeline, costs, harvest, profitability all in one)
- Record operation (mobile-optimized—user standing in greenhouse)
- Record harvest (quantity, grade, inventory lot)
- Readings dashboard (**trend not value**—direction is more important)
- Alerts (grouped, actionable with resolution)
- Cycle profitability (compare between cycles)
- Agriculture dashboard (greenhouse status, upcoming harvest, alerts, profitability)

### Employee & Marketing (Additional)
- Employee list (organizational view)
- Employee profile (data, assets, tasks, performance)
- Performance dashboard (role-specific KPIs)
- "My Work" dashboard (what's due, overdue, pending, recently completed)
- Asset register (type, status, current user)
- Asset handover (drawer + acknowledgment)
- Asset return (condition + notes)
- Campaign list (cost, leads, cost per lead)
- Campaign page (performance, attribution to revenue)
- Activity logging (mobile-optimized, easy screenshot upload)
- Activity review (bulk review in single view—not one-by-one)

---

## 🚨 **Critical Issues to Fix Before Building New Features**

| ID | Issue | Severity | Fix Required |
|----|-------|----------|--------------|
| FIND-001 | Journal official number no unique constraint | CRITICAL | Add unique index on (company_id, fiscal_year, number) + sequence generator |
| FIND-002 | Cascade delete on financial tables | CRITICAL | Change to `restrictOnDelete`—archive only |
| FIND-009 | .env file accessible via web | CRITICAL | Ensure document root is `public/`, rotate all secrets |
| FIND-006 | `approval_requests` missing `company_id` | HIGH | Add field + global scope + index |
| FIND-003 | Payment allocations lack integrity constraints | HIGH | Unique constraint + transaction-level validation |
| FIND-004 | 2FA disabled by default | HIGH | Enable by default, force for financial roles |
| FIND-011 | No real Domain layer | HIGH | Build proper domain layer with business rules |
| FIND-014 | AI assistant has no permission check | HIGH | Add `api.ai` permission + user context |
| FIND-019 | Real Estate unit not an entity | HIGH | Build Unit entity with state machine |
| FIND-020 | Legal hearing entity missing | HIGH | Build Hearing entity with mandatory next date |

---

## 📅 **Implementation Roadmap**

### Phase 0: Foundation Stabilization
**Goal**: Close all critical/high security vulnerabilities
- [ ] Fix journal number uniqueness
- [ ] Convert cascade deletes to restrict
- [ ] Secure environment files
- [ ] Add company_id to approval_requests
- [ ] Fix payment allocation integrity
- [ ] Enable 2FA for financial roles
- [ ] Add permission check to AI assistant
- [ ] Build company isolation tests
- [ ] Create UAT environment

### Phase 1: Multi-Company & Owner Layer
**Goal**: Multi-company user works safely—no data leaks proven by tests
- [ ] Resolve OPEN-001 (tenant_id + RLS vs company_id)
- [ ] Implement Global Scope on all models
- [ ] Build Company Switcher with session invalidation
- [ ] Owner dashboard with cross-company view
- [ ] Tests: user from Company A cannot access Company B via any route

### Phase 2: Shared Services
**Goal**: Services work across multiple domains
- [ ] Notifications engine
- [ ] Document management
- [ ] Secure search
- [ ] Approval engine extension

### Phase 3: HR & Assets
**Goal**: Employee profiles, org structure, asset tracking, role-based KPIs
- [ ] Employee profile
- [ ] Org structure
- [ ] Asset register and handover
- [ ] Performance indicators

### Phase 4: Real Estate
**Goal**: Double-selling impossible—proven by concurrency tests
- [ ] Project/Phase/Building/Unit hierarchy
- [ ] Unit state machine
- [ ] Reservation with TTL
- [ ] Contract with installments
- [ ] Commission engine
- [ ] Concurrency tests

### Phase 5: Legal
**Goal**: No hearing without notification, no critical deadline without escalation
- [ ] Client and case entities
- [ ] Hearing with mandatory next date
- [ ] Multi-level notifications
- [ ] Deadline enforcement
- [ ] Confidentiality tiers

### Phase 6: Marketing & Attribution
**Goal**: Complete source-to-revenue attribution
- [ ] Campaign management
- [ ] Activity verification
- [ ] Source attribution pipeline
- [ ] ROI dashboards

### Phase 7: Integrations
**Goal**: All integrations idempotent, logged, and retry-capable
- [ ] Website (UTM capture, spam protection)
- [ ] Meta/Facebook (webhooks, periodic sync)
- [ ] WhatsApp Business API (official only—no unofficial solutions)
- [ ] Telephony (descriptive data only, no recording without legal review)

### Phase 8: Agriculture & IoT
**Goal**: Complete crop cycle profitability via cost centers + monitoring alerts
- [ ] Farm/Greenhouse/Crop Cycle entities
- [ ] Monitoring (sensors, alerts, trends)
- [ ] Control (requires explicit decision—never direct from web UI)
- [ ] Cost center integration
- [ ] Harvest and inventory lots

---

## ✅ **Definition of Ready (Before Building Any Feature)**

- [ ] Business purpose: clear and documented
- [ ] Actors identified
- [ ] Permissions defined in config
- [ ] Company scope specified
- [ ] Inputs/outputs defined
- [ ] Flow documented
- [ ] States/state machine defined
- [ ] Validation rules documented
- [ ] Expected errors defined
- [ ] Events identified
- [ ] Interface contract specified
- [ ] Acceptance criteria in Given/When/Then format

## ✅ **Definition of Done (Before Feature Release)**

- [ ] Implementation matches spec
- [ ] All validation on server (not just frontend)
- [ ] Authorization: Policy on entity + permission on route
- [ ] Company isolation: implemented AND tested
- [ ] Sensitive actions logged in audit
- [ ] Arabic: complete AND professional (no text in code)
- [ ] English: complete AND professional
- [ ] RTL/LTR: both work without breaking
- [ ] Accessibility: keyboard navigation, labels, contrast, focus indicators
- [ ] Screen states: loading, empty, no results, no permission, error, success, partial failure
- [ ] Tests: unit + feature + authorization + isolation + browser E2E
- [ ] Documentation: updated if behavior changed
- [ ] UAT: accepted by actual user
- [ ] Release readiness: migration, rollback, release notes

---

## 📝 **Developer Playbook**

### What To Do When Adding a New Feature

1. **Read the domain chapter** in this document
2. **Verify "Definition of Ready" is complete**—don't start without it
3. **Build domain layer** with business rules and state machine
4. **Write database migration** (restrictOnDelete for foreign keys)
5. **Create Policy** for authorization
6. **Write application service** (all writes inside DB::transaction)
7. **Create FormRequest** + thin Controller
8. **Build UI page** with Inertia components (per UI/UX guide)
9. **Add audit logging** for all sensitive actions
10. **Add Arabic & English translations** in language files
11. **Write tests**: unit + feature + isolation + browser
12. **Review "Definition of Done"** item by item before closing

### What NEVER To Do

- **Never** write directly to another domain's tables—use services/events
- **Never** use float/double for monetary values
- **Never** hard-delete financial or legal entities—archive only
- **Never** write text directly in code—use language files
- **Never** rely on UI hiding for security—server checks mandatory
- **Never** hotfix directly on production
- **Never** leave conversation TODOs, vague tasks, temp files, or multiple copies of the same solution
- **Never** add demo data in production

---

## 🔄 **Release Process**

### Required Environments
- **Development**: Local with generated demo data
- **CI**: Ephemeral for automated testing
- **UAT**: Sanitized production copy (currently missing—MUST CREATE)
- **Production**: Real data only

### Release Checklist (Every Release)
- [ ] Version number and tag
- [ ] Database migration plan
- [ ] Rollback plan
- [ ] Release notes
- [ ] Backup before migration
- [ ] **Purge demo data (MANDATORY—not optional)**
- [ ] Smoke test after deployment

**Production Rule**: No direct fixes on production. Emergency fixes follow the same compressed pipeline—not bypassed.

---

## 🎯 **Success Metrics**

The system succeeds when:

1. **Owner sees complete financial picture** with ability to drill down
2. **System raises problems**—owner doesn't search for them
3. **Employee sees "what to do"** not just data
4. **Arabic is native**—not translation layered on English
5. **Double-selling impossible** in real estate (concurrency tested)
6. **No missed legal deadlines**—guaranteed notifications
7. **Marketing attribution** complete from source to revenue
8. **Data leaks impossible** between companies (zero-tolerance)
9. **Financial integrity maintained**—never unbalanced entries
10. **Audit trail** complete and tamper-proof

---

This is a **mission-critical enterprise system** handling real money, real people, and real legal obligations. Every line of code must reflect this responsibility. The document is your constitution—consult it daily, update it when you learn, and never knowingly violate its principles.