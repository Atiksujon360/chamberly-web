# Chamberly Feature Roadmap

**Purpose:** Prioritized backlog of future modules and features for Chamberly.
**Last Updated:** 2025-01-10
**Current Status:** Dashboard, Appointments, and Chambers pages implemented as prototypes

---

## Implemented Features

### 1. Chambers Management
**Status:** Prototype Implemented
**Date:** 2025-01-10
**Route:** `/chambers`

**User Problem:** Doctors need to understand and organize their chamber locations, schedules, and fees.

**Target User:** Independent doctors with 1-3 chambers

**Evidence:**
- All Bangladesh competitors (ChamberBD, Samm Care, Prescriply) emphasize multi-chamber support
- ChamberBD includes chamber-wise fee structures and schedules
- Prescriply includes chamber settlement automation (FULL/SPLIT/RENT)

**Dependencies:** None (synthetic data used)

**Proposed Minimum Scope:**
- Display list of chambers with name, location, operating days, hours, fees, status
- Search and filter chambers
- View chamber details
- Empty state when no chambers

**Validation Required:**
- Customer interviews to confirm multi-chamber prevalence
- Validation of required chamber fields (what information do doctors actually need?)

**Acceptance Criteria:**
- ✓ Chambers list displays with key information
- ✓ Search filters by name or location
- ✓ Status filter (active/inactive)
- ✓ Chamber details view
- ✓ Empty state when no results
- ✓ Demo data notice

**Current Status:** Implemented as prototype

**Next Steps:**
- Customer validation of chamber data requirements
- Backend integration for chamber CRUD operations
- Chamber-specific appointment filtering in appointments page

---

### 2. Appointment and Queue Operations
**Status:** Prototype Implemented
**Date:** 2025-01-10
**Route:** `/appointments`

**User Problem:** Doctors need to manage daily appointments, track patient queues, and handle check-ins.

**Target User:** Doctors and receptionists

**Evidence:**
- ChamberBD: Auto conflict-checking, check-in workflow, live waiting-room display
- Samm Care: Real-time patient token queue, TV display with voice callouts
- Prescriply: Serial allocation, queue on any device, T-24h SMS reminders
- Practo Ray: Check-in → Engage → Check out workflow

**Dependencies:**
- Backend API for appointment CRUD
- Backend for queue management
- Backend for conflict detection
- SMS gateway for reminders (optional)

**Proposed Minimum Scope:**
- Date navigation (previous/next/today)
- Chamber filter
- Status filter (upcoming, checked-in, completed, cancelled)
- Search by patient name
- Appointment list with time, patient, type, chamber, status
- Queue view with serial numbers
- Status transitions (upcoming → checked-in → completed)
- Empty state when no appointments
- Demo data notice

**Validation Required:**
- Customer interviews to validate appointment workflow
- Validation of required appointment fields
- Validation of check-in workflow requirements

**Acceptance Criteria:**
- ✓ Date navigation works
- ✓ Chamber filter works
- ✓ Status filter works
- ✓ Search filters by patient name
- ✓ Appointment list displays correctly
- ✓ Queue view shows upcoming and checked-in patients
- ✓ Status transitions work (upcoming → checked-in → completed)
- ✓ Empty state when no results
- ✓ Demo data notice

**Current Status:** Implemented as prototype

**Next Steps:**
- Customer validation of appointment workflow
- Backend integration for appointment CRUD
- Check-in workflow implementation
- Conflict detection implementation
- Queue management system

---

### 3. Account/Workspace Context
**Status:** Prototype Implemented
**Date:** 2025-01-10
**Location:** Sidebar (active chamber selector), Header (demo mode indicator)

**User Problem:** Doctors need to understand which account/workspace they're working in and which chamber is currently active across the application.

**Target User:** Independent doctors with multiple chambers

**Evidence:**
- ChamberBD: Per-chamber schedules, chamber-wise revenue tracking
- Samm Care: Multi-chamber with custom weekly schedules
- Prescriply: Chamber settlement automation with per-chamber context

**Dependencies:** None (synthetic data used)

**Proposed Minimum Scope:**
- Account context provider for workspace state
- Active chamber selector in sidebar
- Doctor profile display in sidebar
- Demo mode indicator in header
- Chamber filter syncs with global active chamber
- Empty state when no chamber selected

**Validation Required:**
- Customer interviews to validate multi-chamber workflow
- Validation of active chamber selector placement
- Validation of account/workspace naming conventions

**Acceptance Criteria:**
- ✓ Account context provider implemented
- ✓ Active chamber selector in sidebar
- ✓ Doctor profile displays in sidebar
- ✓ Demo mode indicator in header
- ✓ Chamber filter in appointments syncs with global active chamber
- ✓ Clear distinction between account, doctor, and chamber

**Current Status:** Implemented as prototype

**Next Steps:**
- Customer validation of multi-chamber workflow
- Backend integration for account/workspace context
- Authentication and authorization
- Real subscription status display

---

## Prioritized Feature Backlog

### 1. Chambers Management
**Status:** Prototype Implemented
**Priority:** N/A (Complete)
**Route:** `/chambers`

**User Problem:** Doctors need to understand and organize their chamber locations, schedules, and fees.

**Target User:** Independent doctors with 1-3 chambers

**Evidence:**
- All Bangladesh competitors (ChamberBD, Samm Care, Prescriply) emphasize multi-chamber support
- ChamberBD includes chamber-wise fee structures and schedules
- Prescriply includes chamber settlement automation (FULL/SPLIT/RENT)

**Dependencies:** None (synthetic data used)

**Proposed Minimum Scope:**
- Display list of chambers with name, location, operating days, hours, fees, status
- Search and filter chambers
- View chamber details
- Empty state when no chambers

**Validation Required:**
- Customer interviews to confirm multi-chamber prevalence
- Validation of required chamber fields (what information do doctors actually need?)

**Acceptance Criteria:**
- ✓ Chambers list displays with key information
- ✓ Search filters by name or location
- ✓ Status filter (active/inactive)
- ✓ Chamber details view
- ✓ Empty state when no results
- ✓ Demo data notice

**Current Status:** Implemented as prototype

**Next Steps:**
- Customer validation of chamber data requirements
- Backend integration for chamber CRUD operations
- Chamber-specific appointment filtering in appointments page

---

### 2. Appointment and Queue Operations
**Status:** Prototype Implemented
**Priority:** High
**Route:** `/appointments`

**User Problem:** Doctors need to manage daily appointments, track patient queues, and handle check-ins.

**Target User:** Doctors and receptionists

**Evidence:**
- ChamberBD: Auto conflict-checking, check-in workflow, live waiting-room display
- Samm Care: Real-time patient token queue, TV display with voice callouts
- Prescriply: Serial allocation, queue on any device, T-24h SMS reminders
- Practo Ray: Check-in → Engage → Check out workflow

**Dependencies:**
- Backend API for appointment CRUD
- Backend for queue management
- Backend for conflict detection
- SMS gateway for reminders (optional)

**Proposed Minimum Scope:**
- Date navigation (previous/next/today)
- Chamber filter
- Status filter (upcoming, checked-in, completed, cancelled)
- Search by patient name
- Appointment list with time, patient, type, chamber, status
- Empty state when no appointments
- Demo data notice

**Validation Required:**
- Customer interviews to validate appointment workflow
- Validation of required appointment fields
- Validation of check-in workflow requirements

**Acceptance Criteria:**
- ✓ Date navigation works
- ✓ Chamber filter works
- ✓ Status filter works
- ✓ Search filters by patient name
- ✓ Appointment list displays correctly
- ✓ Empty state when no results
- ✓ Demo data notice

**Current Status:** Implemented as prototype

**Next Steps:**
- Customer validation of appointment workflow
- Backend integration for appointment CRUD
- Check-in workflow implementation
- Conflict detection implementation
- Queue management system

---

### 3. Patient Directory and Patient History
**Status:** Not Started
**Priority:** High (subject to privacy and security requirements)

**User Problem:** Doctors need to maintain patient records, view visit history, and track patient information.

**Target User:** Doctors

**Evidence:**
- ChamberBD: Patient records, patient history
- Samm Care: Patient history records
- Prescriply: Patient records, history tracking
- Practo Ray: Patient database

**Dependencies:**
- Backend API for patient CRUD
- Encryption at rest (PHI)
- Encryption in transit (HTTPS/TLS)
- Access control and authorization
- Audit logging
- Regulatory compliance assessment (Bangladesh Digital Health Security Act)

**Proposed Minimum Scope:**
- Patient list with search
- Patient profile view
- Visit history
- Patient contact information
- Empty state when no patients

**Validation Required:**
- Customer interviews to validate patient data requirements
- Legal consultation on Bangladesh healthcare data regulations
- Security assessment for PHI storage
- Regulatory compliance requirements

**Acceptance Criteria:**
- Patient list displays with key information
- Search filters by name or phone
- Patient profile shows contact info and visit history
- Empty state when no patients
- Security and privacy controls documented

**Current Status:** Not started

**Next Steps:**
- Legal consultation on Bangladesh healthcare data regulations
- Security assessment for PHI storage
- Customer validation of patient data requirements
- Backend security architecture design

---

### 4. Doctor and Staff Accounts with Role-Based Permissions
**Status:** Not Started
**Priority:** High

**User Problem:** Doctors need to grant staff access to specific features without exposing sensitive information.

**Target User:** Doctors (account owners), receptionists, assistants, managers

**Evidence:**
- ChamberBD: Role-based access (receptionist, nurse, manager), fine-grained permissions
- Samm Care: Assistant sub-accounts restricted to queue token management
- Prescriply: Scoped assistant accounts (cannot create prescriptions)
- Practo Ray: Three access levels (Practice Administrator, Receptionist, Front Desk)

**Dependencies:**
- Authentication system
- Authorization system
- Role-based access control (RBAC)
- Backend permission enforcement
- Audit logging

**Proposed Minimum Scope:**
- User authentication
- Role definition (Doctor, Receptionist, Manager, Assistant)
- Permission assignments per role
- Staff invitation flow
- Staff list with roles
- Role-based UI visibility

**Validation Required:**
- Customer interviews to validate staff workflow requirements
- Validation of permission granularity needed
- Validation of staff onboarding process

**Acceptance Criteria:**
- Authentication flow works
- Roles are defined with clear permissions
- Staff can be invited and assigned roles
- UI respects role-based permissions
- Backend enforces permissions on all requests

**Current Status:** Not started

**Next Steps:**
- Customer validation of staff workflow requirements
- Authentication system design
- Authorization system design
- Backend security architecture

---

### 5. Subscription Overview and Plan Limits
**Status:** Not Started
**Priority:** Medium

**User Problem:** Doctors need to understand their subscription status, usage, and when to upgrade.

**Target User:** Doctors (account owners)

**Evidence:**
- ChamberBD: Published pricing, plan limits, upgrade prompts
- Samm Care: Plan comparison, feature lists
- Prescriply: Free plan limits, upgrade prompts

**Dependencies:**
- Billing system
- Payment gateway integration
- Subscription management backend
- Usage tracking backend

**Proposed Minimum Scope:**
- Current plan display
- Usage metrics (chambers used/limit, staff used/limit, appointments used/limit)
- Upgrade prompts when limits approached
- Plan comparison
- Billing history

**Validation Required:**
- Customer validation of pricing model
- Customer validation of plan limits
- Customer validation of upgrade triggers

**Acceptance Criteria:**
- Current plan displays correctly
- Usage metrics display accurately
- Upgrade prompts appear at appropriate usage levels
- Plan comparison is clear
- Billing history is accessible

**Current Status:** Not started

**Next Steps:**
- Customer validation of pricing model
- Billing system design
- Payment gateway selection
- Subscription management backend design

---

### 6. Operational Reports
**Status:** Not Started
**Priority:** Medium

**User Problem:** Doctors need visibility into daily revenue, patient volume, and operational metrics.

**Target User:** Doctors, practice managers

**Evidence:**
- ChamberBD: Reports & analytics, expense tracking
- Samm Care: Analytics dashboard, growth reports
- Prescriply: Simple analytics, chamber settlement engine
- Practo Ray: Basic reports, advanced reports

**Dependencies:**
- Backend data aggregation
- Analytics backend
- Data visualization (may require library)

**Proposed Minimum Scope:**
- Daily revenue summary
- Patient volume metrics
- Appointment completion rates
- Per-chamber revenue breakdown
- Export to CSV

**Validation Required:**
- Customer interviews to validate reporting requirements
- Validation of most important metrics
- Validation of export requirements

**Acceptance Criteria:**
- Daily revenue displays accurately
- Patient volume metrics display correctly
- Per-chamber breakdown works
- Export to CSV works
- Responsive design for mobile

**Current Status:** Not started

**Next Steps:**
- Customer validation of reporting requirements
- Backend data aggregation design
- Data visualization approach evaluation

---

### 7. Appointment Reminders and Online Booking
**Status:** Not Started
**Priority:** Low (subject to customer validation)

**User Problem:** Patients miss appointments, doctors lose revenue, phone-based booking is inefficient.

**Target User:** Doctors (account owners), patients

**Evidence:**
- ChamberBD: Automated SMS reminders, online booking with conflict-checking
- Samm Care: SMS reminders, online booking
- Prescriply: T-24h SMS reminders, public self-booking link
- Practo Ray: Automated appointment SMSes, 24/7 instant booking

**Dependencies:**
- SMS gateway integration (local Bangladeshi providers)
- Public-facing booking portal
- Security for public booking (rate limiting, spam prevention)
- Backend scheduling engine with conflict detection

**Proposed Minimum Scope:**
- SMS reminder configuration
- SMS template management
- Opt-in/out compliance
- Cost tracking per message
- Public booking portal (optional)

**Validation Required:**
- Customer interviews to validate SMS reminder demand
- Customer validation of online booking demand
- SMS gateway evaluation (cost, reliability)
- Regulatory requirements for healthcare SMS

**Acceptance Criteria:**
- SMS reminders send correctly
- Opt-in/out compliance works
- Cost tracking is accurate
- Public booking works (if implemented)
- Conflict detection prevents double-booking

**Current Status:** Not started

**Next Steps:**
- Customer validation of SMS reminder demand
- Customer validation of online booking demand
- SMS gateway evaluation
- Regulatory assessment for healthcare SMS

---

## Implementation Order Recommendation

Based on current evidence and dependencies:

1. **Appointment and Queue Operations** (High priority, prototype exists, needs backend)
2. **Doctor and Staff Accounts with Role-Based Permissions** (High priority, foundation for multi-user)
3. **Patient Directory and Patient History** (High priority, requires security assessment first)
4. **Subscription Overview and Plan Limits** (Medium priority, requires billing)
5. **Operational Reports** (Medium priority, requires data aggregation)
6. **Appointment Reminders and Online Booking** (Low priority, requires customer validation)

**Next Task:** Customer interviews with 10-20 independent doctors in Bangladesh to validate:
- Appointment workflow requirements
- Staff workflow requirements
- Patient data requirements
- Pricing and plan structure
- Multi-chamber prevalence
- SMS reminder demand
- Online booking demand

**Without customer validation, we risk building features that don't match market needs.**
