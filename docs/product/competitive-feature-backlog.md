# Chamberly Competitive Feature Backlog

**Purpose:** Track competitive research, feature opportunities, and validation status for Chamberly.
**Last Updated:** 2025-01-10
**Research Sources:** Practo, Cliniko, ChamberBD, Softech BD, Samm Care, Prescriply, eDoctorBD

---

## Implemented Features

### Chambers Management Page
**Status:** Implemented (Prototype)
**Date:** 2025-01-10
**Route:** `/chambers`

**Functionality:**
- Display list of synthetic chambers with name, location, operating days, hours, fees, and status
- Search chambers by name or location
- Filter by status (active/inactive)
- Select chamber to view details in side panel
- Empty state when no chambers match filters
- Demo data notice explaining prototype nature

**Synthetic Data:**
- 3 fictional chambers (Dhanmondi, Uttara, Gulshan)
- Fictional addresses, phone numbers, operating days, hours, fees
- Active/inactive status

**SaaS Assumptions:**
- One account can manage multiple chambers (consistent with proposed domain model)
- Chambers are account-scoped, not separate subscriptions
- Frontend filtering does not provide tenant isolation (backend must enforce)

**Known Limitations:**
- No chamber creation, editing, or deletion
- No backend integration
- No real chamber data
- No chamber-specific appointment filtering (appointments page has chamber filter but chambers page doesn't link to it)

**Files Changed:**
- `src/lib/dashboard-data.ts` - Extended Chamber interface with detailed fields
- `src/app/chambers/page.tsx` - New chambers page with list, search, filter, and details

---

## Feature Opportunities

### 1. SMS Appointment Reminders

**Status:** Hypothesis
**Priority:** Next
**Evidence Confidence:** Medium

**Problem:**
Patients miss appointments or arrive late, causing schedule disruptions and lost revenue for independent doctors.

**Evidence:**
- **Verified Evidence:** Practo Ray includes "Automated appointment SMSes" and "Turn by turn directions using smart SMSes" as core features. (Source: practo.com/providers/clinics/ray, accessed 2025-01-10)
- **Verified Evidence:** ChamberBD advertises "Automated follow-up reminders" as part of SMS & Reports features. (Source: chamberbd.com, accessed 2025-01-10)
- **Verified Evidence:** Softech BD includes "Follow-up reminders — SMS reminds patients when their next visit is due." (Source: softech.com.bd, accessed 2025-01-10)
- **Customer Signal:** Practo positions SMS reminders as reducing no-shows: "Reduce no-shows. Enable easy payments."

**User Problem:**
Doctors lose revenue and time when patients miss appointments. Patients forget scheduled visits.

**Target User:**
Independent doctors in Bangladesh with 1-5 chambers, often relying on receptionists or manual phone calls.

**Differentiation Hypothesis:**
- Local Bangla SMS templates (unlike international competitors)
- Cost-effective for solo/small practices (unlike Practo's bundled pricing)
- Simple opt-in/out respect for patient privacy

**Complexity:** Medium
- Requires SMS gateway integration
- Message template management
- Opt-in/out compliance
- Cost tracking per message

**Dependencies:**
- Backend: SMS API integration (e.g., Twilio, local Bangladeshi providers)
- Backend: Patient contact data storage
- Frontend: Reminder settings UI
- Infrastructure: Cost monitoring and billing

**Validation Plan:**
1. Interview 10-20 independent doctors in Bangladesh about current no-show rates
2. Ask how they currently handle reminders (phone calls, WhatsApp, none)
3. Test willingness to pay for SMS reminders at market rates
4. Prototype simple reminder flow with 3-5 beta users

**Success Metric:**
15% reduction in no-show rate for beta users within 60 days.

**Risks:**
- SMS costs may be prohibitive for low-margin practices
- Bangladesh SMS deliverability issues
- Regulatory requirements for healthcare SMS

---

### 2. Multi-Chamber Schedule Management

**Status:** Hypothesis
**Priority:** Next
**Evidence Confidence:** High

**Problem:**
Doctors work across multiple chambers and struggle to avoid schedule conflicts and track earnings per location.

**Evidence:**
- **Verified Evidence:** ChamberBD includes "Multi-chamber scheduling with auto conflict-checking." (Source: chamberbd.com, accessed 2025-01-10)
- **Verified Evidence:** Samm Care advertises "Multi-Chamber & Schedules" with "Manage multiple clinic locations, custom weekly schedules per day of week." (Source: care.sammx.com, accessed 2025-01-10)
- **Verified Evidence:** Prescriply includes "Chamber settlement — FULL / SPLIT / RENT" for fee allocation across chambers. (Source: prescriply.bd, accessed 2025-01-10)
- **Customer Signal:** Prescriply specifically calls out fee settlement as a pain point: "so a doctor working across several chambers never reconciles income by hand."

**User Problem:**
Doctors manually track schedules across multiple locations, risk double-booking, and struggle to calculate revenue per chamber.

**Target User:**
Doctors with 2+ chamber locations (common in Bangladesh urban areas).

**Differentiation Hypothesis:**
- Simple, mobile-first schedule view (competitors may be desktop-heavy)
- Real-time conflict detection without complex setup
- Transparent per-chamber revenue tracking with simple export

**Complexity:** High
- Complex scheduling logic
- Conflict detection algorithms
- Multi-location data model
- Revenue allocation rules

**Dependencies:**
- Backend: Advanced scheduling engine
- Backend: Revenue allocation system
- Frontend: Multi-location calendar UI
- Frontend: Revenue dashboard

**Validation Plan:**
1. Survey doctors with multiple chambers about current scheduling methods
2. Map out manual conflict-resolution processes
3. Identify most important revenue-split scenarios
4. Validate willingness to pay for automation vs. manual tracking

**Success Metric:**
10 doctors with 2+ chambers adopt within 90 days, reporting 30% time savings on schedule management.

**Risks:**
- Complex requirements may differ significantly by practice type
- Integration with existing chamber management systems may be required
- Revenue allocation rules may be highly custom per chamber

---

### 3. Bangla-First Prescription Templates

**Status:** Hypothesis
**Priority:** Later
**Evidence Confidence:** High

**Problem:**
Handwritten prescriptions are illegible, time-consuming, and difficult to standardize. Existing software often prioritizes English or complex medical terminology.

**Evidence:**
- **Verified Evidence:** ChamberBD advertises "Smart Prescriptions" with "23,429 medicines, one-click templates, shareable Rx via SMS or WhatsApp" and "Bengali-first platform." (Source: chamberbd.com, accessed 2025-01-10)
- **Verified Evidence:** Samm Care advertises "30-Second E-Rx" with "write e-prescriptions in 30 seconds." (Source: care.sammx.com, accessed 2025-01-10)
- **Verified Evidence:** Prescriply offers "Structured English Rx" with "drug-safety alerts" and "Bengali dosing (opt-in)." (Source: prescriply.bd, accessed 2025-01-10)
- **Customer Signal:** ChamberBD positions Bangla support as a differentiator: "Bengali-first platform"

**User Problem:**
Doctors spend excessive time writing prescriptions. Patients and pharmacists struggle with illegible handwriting. Language barriers exist for some patients.

**Target User:**
Doctors writing 20+ prescriptions daily, particularly those treating patients with limited English proficiency.

**Differentiation Hypothesis:**
- Truly Bangla-first interface (not just translation)
- Local medicine catalog with Bangladesh-specific brands and generics
- Simple, fast templates without unnecessary complexity
- Shareable via WhatsApp (widely used in Bangladesh)

**Complexity:** Very High
- Requires medical content validation
- Drug interaction databases
- Local medicine catalog maintenance
- Regulatory compliance for e-prescriptions
- Bangla medical terminology standards

**Dependencies:**
- Backend: Medicine database (23,000+ Bangladesh drugs)
- Backend: Drug interaction checking
- Backend: Template management system
- Frontend: Prescription editor with Bangla support
- Legal: Bangladesh medical software regulations
- Security: Prescription integrity and authentication

**Validation Plan:**
1. Interview doctors about current prescription pain points
2. Assess willingness to use digital templates vs. handwriting
3. Validate Bangla vs. English preference among patients
4. Test prototype with 5-10 doctors for template adoption rate

**Success Metric:**
70% of beta users report faster prescription writing vs. handwriting within 30 days.

**Risks:**
- Regulatory requirements for e-prescriptions in Bangladesh are unclear
- Medical liability for drug interaction errors
- Medicine catalog maintenance is complex and ongoing
- May require medical expert advisory board

---

### 4. Patient Self-Booking Portal

**Status:** Hypothesis
**Priority:** Later
**Evidence Confidence:** High

**Problem:**
Patients must call to book appointments, leading to phone tag, lost opportunities, and administrative burden.

**Evidence:**
- **Verified Evidence:** Practo Prime includes "24x7 Instant Booking" with data showing "patient walk-in rates to the practice are 2.5 times higher for pre-booked appointments." (Source: practo.com/providers/prime, accessed 2025-01-10)
- **Verified Evidence:** ChamberBD allows patients to "Find a specialist and book a serial online without creating an account." (Source: chamberbd.com, accessed 2025-01-10)
- **Verified Evidence:** Samm Care includes "live waiting-room display" and public profiles for booking. (Source: care.sammx.com, accessed 2025-01-10)
- **Customer Signal:** Practo explicitly states: "Patients may not always be able to book appointments during traditional office hours"

**User Problem:**
Patients prefer self-service booking over phone calls. Doctors lose patients when phone lines are busy or after hours.

**Target User:**
Tech-savvy patients in urban Bangladesh, particularly younger demographics.

**Differentiation Hypothesis:**
- Mobile-first booking flow (optimized for Bangladesh smartphone usage)
- No account required for booking (reduces friction)
- Bangla-language interface
- Integration with WhatsApp for confirmation

**Complexity:** Medium
- Public-facing booking UI
- Real-time slot availability
- No-auth booking with phone verification
- Conflict prevention for simultaneous bookings

**Dependencies:**
- Backend: Public API for slot availability
- Backend: Booking engine with conflict detection
- Frontend: Public booking portal
- Frontend: Mobile-responsive design
- Security: Rate limiting, spam prevention

**Validation Plan:**
1. Survey patients about booking preferences (phone vs. online)
2. Test with 5-10 doctors' existing patients
3. Measure adoption rate and no-show reduction
4. Assess if patients prefer no-account or account-based booking

**Success Metric:**
25% of appointments booked online within 90 days for beta practices, with 10% reduction in no-shows.

**Risks:**
- Low patient adoption if internet access is limited
- Spam bookings require mitigation
- May require significant marketing to patient base
- Privacy concerns for public profiles

---

### 5. Chamber Revenue Analytics

**Status:** Hypothesis
**Priority:** Later
**Evidence Confidence:** Medium

**Problem:**
Doctors lack visibility into daily revenue, patient volume trends, and per-chamber performance.

**Evidence:**
- **Verified Evidence:** Samm Care includes "Practice Analytics" with "Real-time analytics tracking daily patient volume, completed consultation rates, and weekly appointment growth trends." (Source: care.sammx.com, accessed 2025-01-10)
- **Verified Evidence:** Practo Ray includes "Basic reports" and "Advanced reports" across pricing tiers. (Source: practo.com/providers/clinics/ray, accessed 2025-01-10)
- **Customer Signal:** Samm Care positions analytics as providing "decision-grade analytics"

**User Problem:**
Doctors make business decisions based on intuition rather than data. Revenue tracking is manual and error-prone.

**Target User:**
Doctors interested in growing their practice or optimizing revenue across chambers.

**Differentiation Hypothesis:**
- Simple, actionable metrics (not overwhelming dashboards)
- Per-chamber revenue breakdown for multi-location doctors
- Export to CSV for accountant integration
- Mobile-friendly daily revenue snapshot

**Complexity:** Medium
- Revenue data aggregation
- Analytics dashboard UI
- Export functionality
- Data visualization

**Dependencies:**
- Backend: Revenue tracking system
- Backend: Analytics aggregation
- Frontend: Dashboard UI
- Frontend: Data visualization library

**Validation Plan:**
1. Interview doctors about current revenue tracking methods
2. Identify most valuable metrics (daily revenue, patient volume, growth trends)
3. Test prototype with 5-10 doctors
4. Measure usage frequency and decision impact

**Success Metric:**
50% of beta users check analytics dashboard at least weekly within 60 days.

**Risks:**
- Doctors may not prioritize analytics over operational features
- Data accuracy depends on consistent data entry
- May be perceived as "nice to have" rather than essential

---

## Competitor Summary

### Practo (India)
- **Products:** Ray (clinic management), Ray Connect (call management), Practo Prime (patient acquisition)
- **Pricing:** Ray starts at ₹999/month for 1-year plan. Prime charges one-time technology fee per patient.
- **Target:** Clinics and hospitals in India and 4 other countries
- **Strengths:** Large user base (50,000+ doctors), comprehensive feature set, integration with Practo.com patient marketplace
- **Pain Points:** Not specifically Bangladesh-focused, pricing may be high for solo practitioners

### Cliniko (International)
- **Product:** Practice management for allied health practitioners
- **Pricing:** $45/month for 1 practitioner, scales to $395/month for 26-200 practitioners
- **Target:** Allied health practitioners globally
- **Strengths:** Transparent pricing, unlimited features, security focus, unlimited storage
- **Pain Points:** Not healthcare-specific (allied health), no local Bangladesh integration, English-only

### ChamberBD (Bangladesh)
- **Product:** Chamber management software
- **Pricing:** Standard plan ৳700/month (approximately $6 USD)
- **Target:** Bangladeshi doctors and practices
- **Strengths:** Bangla-first, local medicine catalog (23,429 drugs), affordable pricing
- **Pain Points:** Limited public information on feature depth, unclear security and compliance posture

### Softech BD (Bangladesh)
- **Product:** Clinic & doctor chamber software
- **Pricing:** "Depends on modules you need" — not publicly listed
- **Target:** Bangladeshi doctors and clinics
- **Strengths:** Local presence, custom setup and training, Bangla/English interface
- **Pain Points:** Pricing not transparent, unclear if web-based or installed software

### Samm Care (Bangladesh)
- **Product:** Doctor chamber management & e-prescription
- **Pricing:** Free starter plan available, professional plan pricing not publicly listed
- **Target:** Bangladeshi doctors
- **Strengths:** 30-second e-prescription, real-time queue, multi-chamber support, doctor-owned data
- **Pain Points:** Unclear pricing tiers, limited public information on feature completeness

### Prescriply (Bangladesh)
- **Product:** Prescription and chamber platform
- **Pricing:** Not publicly listed
- **Target:** Bangladeshi chamber doctors
- **Strengths:** Drug-safety alerts, chamber settlement automation, BM&DC verification, Bengali dosing
- **Pain Points:** Prescription-focused (may lack broader practice management), pricing not transparent

### eDoctorBD (Bangladesh)
- **Product:** Patient management system and doctor websites
- **Pricing:** "Plans that match your scale" — not publicly listed
- **Target:** Bangladeshi healthcare professionals
- **Strengths:** Includes doctor website creation, patient portal, all-in-one dashboard
- **Pain Points:** Pricing not transparent, unclear differentiation from other local competitors

---

## Research Notes

### Bangladesh Market Context
- **Evidence Confidence:** High
- **Verified Evidence:** Multiple local competitors (ChamberBD, Samm Care, Prescriply, eDoctorBD) exist, indicating market demand.
- **Customer Signal:** ChamberBD and Samm Care emphasize Bangla-first design, suggesting language is a key differentiator.
- **Customer Signal:** Several competitors highlight "multi-chamber" support, suggesting this is common among Bangladeshi doctors.
- **Hypothesis:** Affordable pricing (৳700/month ≈ $6 USD) suggests price sensitivity in Bangladesh market.

### Regulatory Considerations
- **Evidence Confidence:** Low
- **Unknown:** Bangladesh-specific requirements for e-prescriptions, patient data storage, and healthcare software compliance.
- **Action Required:** Consult legal expertise before implementing patient data features, e-prescriptions, or SMS health communications.

### Technology Preferences
- **Evidence Confidence:** Medium
- **Verified Evidence:** ChamberBD and Prescriply emphasize WhatsApp integration for sharing prescriptions.
- **Hypothesis:** WhatsApp is the preferred communication channel in Bangladesh, suggesting Chamberly should prioritize WhatsApp over SMS or email where possible.

---

## Decisions Requiring User Input

1. **Regulatory Compliance Path:** What is Chamberly's approach to Bangladesh healthcare software regulations? Should we seek legal consultation before storing patient data or implementing e-prescriptions?

2. **Pricing Strategy:** Given local competitors at ~৳700/month ($6 USD), should Chamberly target similar pricing or differentiate with a different model?

3. **Bangla vs. English Priority:** Should Chamberly be Bangla-first from the start, or English-first with Bangla translation later?

4. **WhatsApp vs. SMS:** Should Chamberly prioritize WhatsApp integration (widely used in Bangladesh) over SMS (more reliable but less preferred)?

5. **E-Prescription Scope:** Is e-prescription a core Chamberly feature or a future differentiator? The complexity and regulatory requirements are significant.

---

## Next Research Priorities

1. **Customer Interviews:** Conduct 10-20 interviews with independent doctors in Bangladesh to validate:
   - Current pain points with appointment management
   - Willingness to pay for software vs. manual methods
   - Multi-chamber prevalence and revenue-split complexity
   - Bangla vs. English preference in daily operations

2. **Regulatory Assessment:** Research Bangladesh Digital Health Security Act and related regulations for healthcare software.

3. **Pricing Survey:** Survey local competitors for exact pricing tiers and feature comparisons.

4. **WhatsApp Integration Feasibility:** Assess technical and business feasibility of WhatsApp Business API integration.

5. **Medicine Catalog Licensing:** Evaluate options for Bangladesh medicine database (23,000+ drugs) — build, license, or integrate with existing provider.

---

## Updated Research - Appointment Workflows (2025-01-10)

### ChamberBD Appointment Workflow
**Source:** chamberbd.com/features, chamberbd.com/guide (accessed 2025-01-10)
**Evidence Confidence:** High

**Verified Capabilities:**
- Multi-chamber scheduling with auto conflict-checking
- Daily, weekly, monthly calendar views with color-coded status
- Online booking + walk-in registration in one queue
- Serial number allocation (no duplicate serials)
- Live waiting-room display with current/upcoming serial
- Check-in workflow (30 sec per patient, updates display instantly)
- "In Progress" status when calling next patient
- Per-chamber schedules, fees, weekly off-days
- Staff role-based access (receptionists can manage serials without seeing prescriptions)
- SMS reminders: confirmation, day-before, and on-day for upcoming serials
- Drag-and-drop rescheduling with conflict re-checking

**Daily Workflow:**
1. Receive bookings (online + reception) → all feed into same calendar
2. Check in patients on arrival → moves to waiting queue on display
3. Call next patient → tap "In Progress", display advances queue
4. Complete consultation → visit type and fee detected automatically

**Pricing:** Standard plan ৳700/month (~$6 USD), 1 chamber included, up to 3 on Pro, unlimited on Premium

---

### Samm Care Appointment Workflow
**Source:** care.sammx.com/for-doctor, care.sammx.com/pricing (accessed 2025-01-10)
**Evidence Confidence:** High

**Verified Capabilities:**
- Real-time patient token queue system
- Multi-chamber & schedules with custom weekly schedules per day
- Daily appointment caps per chamber
- Assistant sub-accounts restricted to queue token management (cannot see medical notes)
- Live clinic queue TV display with voice callouts
- Clinic Live Queue TV Display & Voice Callouts (Professional plan)
- Unlimited daily appointments (Professional plan)
- 30-second e-prescriptions integrated with queue

**Pricing:** Free starter plan (1 chamber, up to 20 daily appointments), Professional plan ৳500/month (unlimited chambers, appointments, assistant accounts, queue display)

---

### Prescriply Appointment Workflow
**Source:** prescriply.bd/appointment-booking, prescriply.bd/features (accessed 2025-01-10)
**Evidence Confidence:** High

**Verified Capabilities:**
- Public self-booking link with scan-to-book QR poster
- Per-chamber serial allocation (no duplicate serials)
- Queue runs on any device (mobile, tablet, desktop)
- Walk-ins register alongside online bookings
- T-24h SMS reminders (per-chamber toggle)
- Booking can be turned on/off per doctor profile
- Scoped assistant accounts (can register patients, run serial/queue, record fees, but cannot create prescriptions)
- Multi-chamber from one dashboard (separate schedules, fees, serials)
- Calendar view with no-show tracking and simple analytics
- Drag-to-reschedule with automatic conflict re-checking

**Unique Feature:** Chamber settlement automation (FULL/SPLIT/RENT models) - each visit's fee splits between doctor and chamber automatically

**Pricing:** Not publicly listed

---

### Practo Ray Appointment Workflow
**Source:** help.practo.com/practo-ray/calendar (accessed 2025-01-10)
**Evidence Confidence:** High

**Verified Capabilities:**
- Calendar is default view with daily, weekly, monthly tabs
- Multi-doctor calendar with color-coded appointments per doctor
- Check-in patients → track patient queue → Engage → Check out workflow
- Add walk-in appointments directly to calendar
- Hover cards show patient details (blood group, etc.) and quick actions
- Cancel appointments via edit button in hover card
- Filter by doctor, date range, and appointment status
- Print schedule with customizable options
- Queue manager integrated with calendar

**Pricing:** Ray starts at ₹999/month (~$12 USD) for 1-year plan

---

### Key Findings for Chamberly Appointments Page

**Common Patterns Across Competitors:**
1. **Multi-chamber support is standard** - All Bangladesh competitors (ChamberBD, Samm Care, Prescriply) emphasize this
2. **Conflict detection is essential** - ChamberBD (auto conflict-checking), Prescriply (no duplicate serials, drag-reschedule re-checks)
3. **Serial/queue management is core** - ChamberBD (serial tokens, live display), Samm Care (token queue), Prescriply (serial allocation)
4. **Staff role separation** - ChamberBD (receptionists manage serials without seeing prescriptions), Samm Care (assistants restricted to queue tokens), Prescriply (scoped assistant accounts)
5. **Check-in/In Progress workflow** - ChamberBD (check-in → In Progress), Practo (check-in → Engage → Check out)
6. **Date navigation** - Daily, weekly, monthly views (Practo, ChamberBD)
7. **SMS reminders** - Confirmation, day-before, on-day (ChamberBD, Prescriply)
8. **Online booking integration** - Public booking links or QR posters (ChamberBD, Prescriply, Samm Care)

**Relevant to Independent Doctors in Bangladesh:**
- Multi-chamber scheduling is a verified common pattern
- Serial/queue management is the dominant workflow (not calendar-first)
- Staff role separation is important (receptionists vs. doctors)
- SMS reminders are widely used to reduce no-shows
- Online booking is becoming expected (24/7, no phone calls)
- Live waiting-room displays are standard (TV monitors for patients)

**Defer for This Prototype:**
- Live waiting-room TV display (requires external display/integration)
- SMS reminders (requires SMS gateway and costs)
- Online booking for patients (requires public-facing portal and security)
- Staff role-based access (requires authentication and authorization)
- Drag-and-drop rescheduling (complex UI, requires conflict detection backend)
- Multi-chamber revenue settlement (requires complex business logic)
- Video consultation (requires WebRTC/integration)

**Focus for Appointments Page Prototype:**
- Date navigation (previous/next day)
- Chamber filter (fictional chamber names)
- Status filter (upcoming, checked-in, completed, cancelled)
- Search by patient name
- Clear appointment list with time, patient, type, status
- Empty state when no appointments
- Responsive layout for mobile/desktop
- Clear indication that data is demonstration-only
