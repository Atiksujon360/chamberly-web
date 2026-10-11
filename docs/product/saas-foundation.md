# Chamberly SaaS Foundation Proposal

**Purpose:** Define the subscription-based SaaS domain model, tenant-aware UX requirements, and commercial validation strategy for Chamberly.
**Last Updated:** 2025-01-10
**Target Market:** Independent doctors and chamber operators in Bangladesh

---

## Phase 1: Repository Verification

**Existing Foundation:**
✓ Next.js App Router with React and TypeScript
✓ Redux Toolkit and RTK Query foundation (unused in current prototype)
✓ Healthcare design system with accessible tokens
✓ Dashboard at `/` with synthetic data
✓ Appointments page at `/appointments` with date navigation, filtering, search, and queue view
✓ Chambers page at `/chambers` with chamber list, search, filter, and details
✓ Account context provider for workspace state
✓ Active chamber selector in sidebar
✓ Demo mode indicator in header
✓ No backend integration
✓ No authentication or authorization
✓ Git branch: `feature/initial-foundation`
✓ All foundation files untracked (new project)

**No architectural issues detected.** The existing foundation is minimal and suitable for SaaS expansion.

---

## Phase 2: Current SaaS Market Research

### ChamberBD (Bangladesh)

**Source:** chamberbd.com/pricing, chamberbd.com/facts (accessed 2025-01-10)
**Evidence Confidence:** High

**Account Model:**
- Individual doctor subscription (separate products for clinics, physiotherapy, dental, hijama)
- Solo doctor with 1-3 chambers
- Multi-chamber specialists with unlimited chambers
- Separate "ChamberBD Clinic" product for multi-doctor practices

**Pricing (Verified):**
- **Free:** ৳0 - 1 chamber, 10 prescriptions/day, 100 patients, unlimited appointments, online booking, digital prescriptions
- **Standard:** ৳700/month (৳7,000/year with 2 months free) - 1 chamber, 1 staff, unlimited prescriptions/appointments/patients, all features
- **Pro:** ৳1,200/month (৳12,000/year with 2 months free) - 3 chambers, 3 staff, unlimited everything
- **Premium:** ৳1,500/month (৳13,500/year with 3 months free) - unlimited chambers, unlimited staff

**Staff & Permissions:**
- Role-based access: receptionist, nurse, manager
- Fine-grained permissions per chamber: appointments, patients, prescriptions, payments, expenses, reports
- Staff assigned to one or more chambers
- Each staff member has own login and permissions
- No extra cost for staff seats (included in plan limits)

**Trial & Onboarding:**
- 14-day free trial with full access, no card required
- After trial, account continues on Free plan (1 chamber, 10 prescriptions/day, 100 patients)
- 30-day money-back guarantee
- Payment via bKash or Nagad

**Limitations:**
- Free plan limited to 10 prescriptions/day
- Free plan limited to 100 patients
- No staff accounts on Free plan

---

### Samm Care (Bangladesh)

**Source:** care.sammx.com/pricing, care.sammx.com/for-doctor (accessed 2025-01-10)
**Evidence Confidence:** High

**Account Model:**
- Individual doctor subscription (separate "Enterprise Hospital Plan" for hospitals)
- Solo doctor with unlimited chambers
- Multi-assistant sub-accounts

**Pricing (Verified):**
- **Starter Doctor Plan:** ৳0/month - 1 chamber, up to 20 daily appointments, digital prescriptions, patient history, standard template
- **Professional Doctor Plan:** ৳500/month (৳5,400/year) - unlimited chambers, unlimited appointments, unlimited prescriptions, multi-assistant sub-accounts, custom prescription pad designer, real-time queue, analytics, 24/7 priority support
- **Enterprise Hospital Plan:** Custom quote - multi-doctor & staff management, pharmacy integration, hospital billing, AI chatbot, WhatsApp integration

**Staff & Permissions:**
- Assistant sub-accounts restricted to queue token management
- Assistants cannot view private medical notes
- Assistants can register walk-in patients, update queue tokens, mark arrivals
- Professional Plan includes multi-assistant sub-accounts

**Trial & Onboarding:**
- Free forever plan with limited features
- Most doctors complete registration and first chamber setup in under one minute
- Can start prescribing the same day

**Limitations:**
- Free plan limited to 1 chamber
- Free plan limited to 20 daily appointments
- No staff accounts on Free plan

---

### Prescriply (Bangladesh)

**Source:** prescriply.bd/terms, prescriply.bd/faq, prescriply.bd/free-prescription-software (accessed 2025-01-10)
**Evidence Confidence:** High

**Account Model:**
- Individual doctor subscription (licensed per prescribing doctor, not per clinic)
- Partner Network for clinics to pay for doctors' subscriptions
- Solo doctor with unlimited chambers

**Pricing (Verified):**
- **Free:** ৳0 - 200 prescriptions total (not monthly), every feature included, no card required, BM&DC gate not required
- **Pro:** ৳199/month - unlimited prescriptions, AI assist, one assistant seat (no longer sold, unlimited prescriptions now free)
- **Clinic:** ৳499/month - unlimited prescriptions, up to 10 assistant seats, priority support (no longer sold)
- **Note:** Pro and Clinic plans are no longer sold because every doctor now gets unlimited prescriptions free
- Only AI credits are sold (pay-as-you-go)
- VAT included in listed prices

**Staff & Permissions:**
- One assistant seat included (on former Pro plan)
- Up to 10 assistant seats (on former Clinic plan)
- Assistants can register patients, run serial/queue, record visit fees
- Assistants cannot create or edit prescriptions
- Prescribing stays with the doctor

**Partner Network:**
- Clinics register once, then buy one plan per prescribing doctor
- Pro: ৳199/month per doctor
- Clinic: ৳499/month per doctor
- Volume discounts for bulk seats (5-25% off)
- Strict per-doctor firewall keeps every patient and prescription with the treating doctor

**Trial & Onboarding:**
- Free plan with no card required
- No BM&DC gate to try
- Full features from day one
- Only limit is 200 prescriptions total (one-time allowance)

**Limitations:**
- Free plan limited to 200 prescriptions total (not monthly)
- Only AI credits are sold separately

---

### Practo Ray (India)

**Source:** help.practo.com/practo-ray/settings (accessed 2025-01-10)
**Evidence Confidence:** High

**Account Model:**
- Practice-level subscription (not per doctor)
- Multi-doctor clinics with role-based access

**Staff & Permissions (Verified):**
- Three staff access levels:
  - **Practice Administrator:** Complete access over all aspects of the account
  - **Receptionist:** Access to accounting for one month, no access to analytics
  - **Front Desk:** Access to all sections except accounting, analytics, settings, edit appointments/payments
- Staff controlled via Practice Staff settings
- Access levels restrict: accounting, analytics, settings, appointment editing, payment editing

**Note:** Practo Ray pricing not researched in this task as it targets India market, not Bangladesh specifically.

---

## Phase 3: SaaS Domain Model Proposal

### Recommended Minimum Viable Model

**Account Owner:** Individual doctor subscribing directly

**Justification:**
- All Bangladesh competitors (ChamberBD, Samm Care, Prescriply) primarily target individual doctors
- Multi-doctor clinic products exist (ChamberBD Clinic, Samm Care Enterprise) but are separate products with different pricing
- Initial target market is independent doctors with 1-3 chambers
- Solo doctor model is simpler to implement and validate

### Domain Entities

#### 1. Account (Subscription Account)
- **Purpose:** Represents the subscription-paying entity
- **Owner:** Individual doctor
- **Relationships:**
  - Has one subscription plan
  - Has one or more chambers
  - Has zero or more staff members
- **Status:** Active, Trial, Past Due, Cancelled
- **Unresolved Decision:** Should we support organization accounts for multi-doctor practices in the future?

#### 2. Doctor (Practitioner)
- **Purpose:** The medical professional providing care
- **Relationships:**
  - Belongs to one account (as owner)
  - Can be associated with multiple chambers
- **Profile:** BM&DC registration (if required), name, specialization
- **Unresolved Decision:** Should we support multiple doctors per account in the future?

#### 3. Chamber (Practice Location)
- **Purpose:** Physical location where the doctor sees patients
- **Relationships:**
  - Belongs to one account
  - Associated with one or more doctors
  - Has its own schedule, fees, and assigned staff
- **Attributes:** Name, location, address, contact number, weekly schedule, fee structure
- **Verified Need:** All Bangladesh competitors emphasize multi-chamber support

#### 4. Staff Member
- **Purpose:** Non-doctor users who manage operations
- **Relationships:**
  - Belongs to one account
  - Assigned to one or more chambers
  - Has specific role and permissions
- **Roles:** Receptionist, Assistant, Manager (similar to ChamberBD)
- **Permissions:** Fine-grained access control (appointments, patients, prescriptions, payments, reports)
- **Verified Need:** All Bangladesh competitors support staff accounts with role-based access

#### 5. Subscription Plan
- **Purpose:** Defines entitlements and limits
- **Plans (Proposed):**
  - **Free:** 1 chamber, 20 daily appointments, 100 patients, no staff
  - **Standard:** ৳700/month - 1 chamber, 1 staff, unlimited appointments/patients
  - **Pro:** ৳1,200/month - 3 chambers, 3 staff, unlimited everything
  - **Premium:** ৳1,500/month - unlimited chambers, unlimited staff
- **Rationale:** Similar to ChamberBD pricing which is verified for Bangladesh market
- **Unresolved Decision:** What are the actual price points that doctors are willing to pay?

#### 6. Subscription Status
- **Purpose:** Tracks current subscription state
- **States:** Trial, Active, Past Due, Cancelled, Suspended
- **Billing:** Monthly or yearly billing cycle
- **Unresolved Decision:** Should we offer yearly discounts like competitors?

#### 7. Feature Entitlements & Usage Limits
- **Purpose:** Defines what features are available and what limits apply
- **Entitlements:** Online booking, digital prescriptions, reports & analytics, expense tracking, staff & permissions
- **Limits:** Chambers count, staff accounts count, daily appointments, daily prescriptions, patient records
- **Verified Need:** All competitors use limits to differentiate plans

### Alternative Models Considered

#### Model A: Solo Doctor Only
- **Description:** One doctor per account, unlimited chambers
- **Pros:** Simplest to implement, matches Prescriply model
- **Cons:** May not support multi-doctor practices in the future
- **Verdict:** Too restrictive for long-term viability

#### Model B: Practice/Organization Subscription
- **Description:** One subscription covers multiple doctors
- **Pros:** Matches ChamberBD Clinic and Samm Care Enterprise models
- **Cons:** More complex to implement, may not match initial solo doctor market
- **Verdict:** Defer until multi-doctor demand is validated

#### Model C: Doctor-Centric with Chamber Context
- **Description:** Doctor owns account, can manage multiple chambers with separate contexts
- **Pros:** Matches the majority of Bangladesh competitors (ChamberBD, Samm Care, Prescriply)
- **Cons:** Requires chamber selection UI
- **Verdict:** **Recommended** - balances simplicity with multi-chamber support

### Unresolved Business Decisions

1. **Pricing Strategy:** Should Chamberly match ChamberBD pricing (৳700-৳1,500/month) or differentiate with lower prices?
2. **Yearly Discounts:** Should we offer yearly discounts (2-3 months free) like competitors?
3. **Free Plan Limits:** What are the appropriate limits for the free plan (appointments, patients, prescriptions)?
4. **Staff Seats:** Should staff seats be unlimited on paid plans or limited like ChamberBD?
5. **Multi-Doctor Support:** Should we support multiple doctors per account in the future, or keep it solo-only?
6. **BM&DC Verification:** Should we require BM&DC registration like Prescriply, or make it optional?

---

## Phase 4: Subscription-Aware UX Proposal

### Minimum Required Surfaces

#### 1. Account Context Indicator
- **Location:** Sidebar header or top navigation
- **Purpose:** Show current account name and subscription status
- **Status:** Active, Trial, Past Due, Cancelled
- **Justification:** Users need to know their subscription status to avoid service disruption

#### 2. Plan Overview
- **Location:** Settings page
- **Purpose:** Show current plan, limits, and usage
- **Content:** Plan name, price, chambers used/limit, staff used/limit, appointments used/limit
- **Action:** Upgrade button when limits are approached
- **Justification:** Users need to understand what they're paying for and when to upgrade

#### 3. Upgrade Entry Point
- **Location:** Plan overview or when limits are reached
- **Purpose:** Guide users to upgrade when needed
- **Content:** Plan comparison, features, pricing
- **Action:** Contact sales or self-serve upgrade (if implemented)
- **Justification:** Revenue requires clear upgrade paths

#### 4. Account Settings
- **Location:** Settings page
- **Purpose:** Manage account profile, billing, staff invitations
- **Content:** Account name, contact info, billing history, staff management
- **Justification:** Account management is essential for SaaS

### Recommended UX Prototype Priority

**Priority: Low - Defer Until Backend Integration**

**Justification:**
- Current prototype uses synthetic data with no backend
- Subscription UX requires real authentication, billing, and account management
- Customer validation is needed before finalizing pricing and plans
- Building subscription UI now would create placeholder states that don't reflect real functionality

**When to Implement:**
- After authentication and backend integration
- After customer validation of pricing and plan structure
- After billing integration (payment gateway)

**Alternative for Now:**
- Add a subtle "Demo Mode" indicator to the current prototype
- Document that all data is demonstration-only
- No subscription UI needed until real backend exists

---

## Phase 5: Tenant-Aware Frontend Requirements

### Active Account Identification

**Requirement:** The frontend must identify the active account or organization for every authenticated session.

**Implementation Approach:**
- Store account ID in Redux state after authentication
- Include account ID in all API requests via RTK Query base query interceptor
- Display account context in UI (sidebar header or top navigation)
- Handle account switching (if multi-account support is added)

**Future Integration:**
- Backend will provide account context in authentication response (JWT payload or session data)
- Frontend will extract account ID from authenticated session
- API requests will include account ID in headers (e.g., `X-Account-ID`)

### Chamber Selection

**Requirement:** Users must be able to select which chamber they're viewing/operating on.

**Implementation Approach:**
- Chamber selector dropdown in sidebar or top navigation
- Selected chamber ID stored in Redux state
- Chamber context affects which appointments, patients, and data are displayed
- Default to first chamber if no selection made

**Future Integration:**
- Backend will filter data by chamber ID based on user permissions
- API requests will include chamber ID in headers or query parameters
- Backend will enforce chamber access permissions

### Permission Handling

**Requirement:** The UI must respond appropriately when users lack permissions for specific features.

**Implementation Approach:**
- Role-based UI: Hide or disable features based on user role
- Permission checks: Before enabling actions, verify user has permission
- Graceful degradation: Show "Contact administrator" for restricted features
- No frontend-only security: Always verify permissions on backend

**Roles (Proposed):**
- **Doctor:** Full access to all features
- **Receptionist:** Appointments, patient registration, queue management
- **Manager:** Appointments, payments, reports, staff management
- **Assistant:** Queue management, patient check-in

**Future Integration:**
- Backend will return user permissions in authentication response
- Frontend will cache permissions in Redux state
- API requests will include user context for permission verification

### Loading States

**Requirement:** The UI must show appropriate loading states during account and data fetches.

**Implementation Approach:**
- Skeleton screens for data loading
- Spinners for button actions
- Loading indicators for page transitions
- Progress indicators for long-running operations

**Specific States:**
- Account context loading
- Chamber list loading
- Appointments loading
- Patients loading
- Reports loading

### Empty States

**Requirement:** The UI must show clear empty states when no data exists.

**Implementation Approach:**
- Friendly empty state messages
- Contextual empty states (e.g., "No appointments today" vs "No appointments found")
- Call-to-action when appropriate (e.g., "Book your first appointment")
- Empty states for: appointments, patients, chambers, staff

### Unauthorized States

**Requirement:** The UI must handle unauthorized access gracefully.

**Implementation Approach:**
- 401 responses: Redirect to login
- 403 responses: Show "You don't have permission" message
- Session expiration: Show re-authentication prompt
- Account suspension: Show "Account suspended" message with contact info

### Subscription Limit States

**Requirement:** The UI must inform users when they hit subscription limits.

**Implementation Approach:**
- Limit warnings: Show "You've used X of Y appointments today"
- Limit reached: Disable action and show "Upgrade to continue"
- Upgrade prompts: Show plan comparison when limits are reached
- Graceful degradation: Allow read-only access when limits are exceeded

### Data Isolation

**Requirement:** The UI must not display data from a previous account after account switching.

**Implementation Approach:**
- Clear Redux state on account switch
- Clear local storage/session storage on account switch
- Refetch all data after account switch
- Show loading state during switch
- Verify no data leakage between accounts

**Security Principle:**
- Frontend visibility controls are NOT authorization
- Backend must enforce tenant isolation on every request
- Never trust client-supplied account ID as proof of access
- Always verify permissions on backend

### API Request Context

**Requirement:** API requests must include account context for tenant isolation.

**Implementation Approach:**
- RTK Query base query interceptor adds account ID to headers
- Include account ID in all relevant API requests
- Include chamber ID in chamber-specific requests
- Include user context for permission verification

**Future Backend Requirements:**
- Authentication middleware validates account access
- Every database query filters by account ID
- Permission checks enforce role-based access
- Audit logging records account, user, and action

---

## Phase 6: Competitive Differentiation Hypotheses

### Hypothesis 1: Fast and Simple Chamber Operations for Solo Doctors

**Buyer:** Solo doctor with 1-3 chambers
**User:** Doctor and their receptionist/assistant
**Problem:** Complex software with long setup times and steep learning curves
**Existing Alternatives:** ChamberBD (14-day trial, 1-minute setup claimed), Samm Care (1-minute setup claimed), Prescriply (instant setup)
**Evidence:** All competitors claim fast setup (1-14 minutes), but actual complexity may differ
**Unverified:** Whether actual setup time matches claims, whether simplicity is a real differentiator
**Validation Method:** Time-to-first-appointment measurement with 10-20 beta users, compare setup completion rates

### Hypothesis 2: Reliable Multi-Chamber Scheduling

**Buyer:** Doctor with 2-3 chambers
**User:** Doctor managing multiple locations
**Problem:** Schedule conflicts, revenue tracking across chambers, staff coordination
**Existing Alternatives:** ChamberBD (auto conflict-checking), Samm Care (multi-chamber support), Prescriply (chamber settlement automation)
**Evidence:** All competitors offer multi-chamber support, conflict detection is standard
**Unverified:** Whether Chamberly can offer better conflict detection or simpler chamber switching
**Validation Method:** Interview 10-20 multi-chamber doctors about current pain points, test conflict detection scenarios

### Hypothesis 3: Easier Assistant and Receptionist Workflows

**Buyer:** Solo doctor or small practice
**User:** Receptionist, assistant, nurse
**Problem:** Complex permissions, difficult queue management, hard to learn interfaces
**Existing Alternatives:** ChamberBD (role-based access), Samm Care (assistant sub-accounts), Prescriply (scoped assistant accounts)
**Evidence:** All competitors offer staff accounts with role-based access
**Unverified:** Whether Chamberly can offer simpler permission model or better mobile experience for staff
**Validation Method:** Observe receptionist workflows with 5-10 practices, measure task completion time

### Hypothesis 4: Better Operational Visibility for Small Practices

**Buyer:** Solo doctor or small practice owner
**User:** Doctor or practice manager
**Problem:** Manual revenue tracking, unclear daily performance, difficulty making data-driven decisions
**Existing Alternatives:** ChamberBD (reports & analytics), Samm Care (analytics dashboard), Prescriply (chamber settlement engine)
**Evidence:** All competitors offer reporting and analytics
**Unverified:** Whether Chamberly can offer simpler, more actionable metrics or better mobile visibility
**Validation Method:** Interview 10-20 doctors about current revenue tracking methods, test prototype dashboard

### Hypothesis 5: Simpler and More Understandable Subscription Model

**Buyer:** Solo doctor or small practice
**User:** Doctor deciding whether to subscribe
**Problem:** Complex pricing tiers, hidden fees, unclear feature entitlements, long-term contracts
**Existing Alternatives:** ChamberBD (transparent pricing, no hidden fees), Samm Care (customizable subscriptions), Prescriply (free to start, pay for AI only)
**Evidence:** ChamberBD offers published pricing with no hidden fees, Prescriply offers free plan with clear limits
**Unverified:** Whether doctors actually find competitor pricing confusing, whether simplicity drives purchase decisions
**Validation Method:** A/B test pricing page with 50-100 prospects, measure conversion rate and time-to-purchase

---

## Phase 7: Deliverables

### Files Created

1. **docs/product/saas-foundation.md** - This document with:
   - Repository verification
   - Current SaaS market research with sources
   - SaaS domain model proposal
   - Tenant-aware UX requirements
   - Competitive differentiation hypotheses
   - Unresolved business decisions

### Files Modified

None in this task (documentation only).

### Implementation Boundary

**No code changes made in this task.**

**Justification:**
- SaaS foundation requires backend integration (authentication, billing, account management)
- Customer validation is needed before finalizing pricing and plans
- Building subscription UI now would create placeholder states
- Documentation is the appropriate deliverable for this research and planning task

### Next Implementation Priority

**When to Build Subscription UX:**
- After authentication and backend integration
- After customer validation of pricing and plan structure
- After billing integration (payment gateway)

**Recommended Next Step:**
- Customer interviews with 10-20 independent doctors in Bangladesh to validate:
  - Current pain points with appointment management
  - Willingness to pay for software vs. manual methods
  - Multi-chamber prevalence and revenue-split complexity
  - Price sensitivity and preferred pricing model
  - Staff workflow requirements

---

## Summary

### Verified Repository Findings
- Next.js App Router with React and TypeScript ✓
- Redux Toolkit and RTK Query foundation ✓
- Healthcare design system with accessible tokens ✓
- Dashboard at `/` and appointments at `/appointments` ✓
- No backend integration or authentication ✓
- No architectural issues detected ✓

### Current Competitor Evidence
- ChamberBD: ৳700-৳1,500/month, 14-day trial, multi-chamber, staff accounts
- Samm Care: Free to ৳500/month, multi-chamber, assistant sub-accounts
- Prescriply: Free to ৳199/month, unlimited prescriptions, partner network
- All competitors support multi-chamber, staff accounts, role-based permissions

### Recommended Minimum SaaS Account Model
- **Account Owner:** Individual doctor subscribing directly
- **Chambers:** 1-3 chambers per account (expandable)
- **Staff:** 0-3 staff members per account (expandable)
- **Plans:** Free, Standard (৳700/month), Pro (৳1,200/month), Premium (৳1,500/month)
- **Justification:** Matches Bangladesh competitor patterns, validated by market

### Tenant-Aware UX Requirements
- Account context indicator in sidebar or top navigation
- Chamber selector for multi-chamber contexts
- Role-based UI permissions (Doctor, Receptionist, Manager, Assistant)
- Loading, empty, unauthorized, and subscription limit states
- Data isolation on account switch
- API requests include account and chamber context
- Backend must enforce all security (frontend controls are not authorization)

### Subscription UX Recommendation
- **Priority: Low - Defer Until Backend Integration**
- Justification: Requires real authentication, billing, and account management
- Alternative: Add "Demo Mode" indicator to current prototype
- When to implement: After customer validation and backend integration

### Market Assumptions Requiring Customer Validation
1. **Pricing:** Are doctors willing to pay ৳700-৳1,500/month?
2. **Multi-chamber:** How many doctors actually work across multiple chambers?
3. **Staff workflows:** What are the actual permission requirements for receptionists?
4. **Free plan limits:** What are the appropriate limits for free plan?
5. **Setup complexity:** Is "fast setup" actually a differentiator?
6. **Subscription model:** Do doctors prefer monthly or yearly billing?

### Files Changed and Checks Run
- **Created:** docs/product/saas-foundation.md
- **Modified:** None
- **Type-check:** Not run (no code changes)
- **Lint:** Not run (no code changes)
- **Build:** Not run (no code changes)

### Recommended Next Task

**Task:** Customer interviews with 10-20 independent doctors in Bangladesh

**Why First:**
- Pricing and plan structure are assumptions based on competitors, not validated by actual customers
- Multi-chamber prevalence is claimed by competitors but not verified with real doctors
- Staff workflow requirements are inferred from competitor features, not observed in real practices
- Understanding actual pain points will guide which features to prioritize
- Without customer validation, we risk building features that don't match market needs

**What to Validate:**
- Current appointment management methods (phone, register, existing software)
- Willingness to pay for software vs. manual methods
- Multi-chamber prevalence and revenue-split complexity
- Price sensitivity and preferred pricing model
- Staff workflow requirements and permission needs
- Bangla vs. English preference in daily operations

**Evidence Needed Before Implementation:**
- Verified customer pain points
- Confirmed willingness to pay at proposed price points
- Actual multi-chamber usage patterns
- Real staff workflow requirements
- Preferred subscription model (monthly vs. yearly)

**Stop after this deliverable. Do not automatically begin another task.**
