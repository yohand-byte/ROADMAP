# User Flows & Process Diagrams

## Installer Workflow (Complete)

```
┌─────────────────────────────────────────────────────────────────┐
│                    INSTALLER JOURNEY                            │
└─────────────────────────────────────────────────────────────────┘

START: Login
  │
  ▼
Dashboard
  ├─ View Active Projects (5)
  ├─ View Pending Tasks (3)
  ├─ Quick Stats
  │  ├─ Total Projects: 142
  │  ├─ In Progress: 8
  │  ├─ Completed This Month: 12
  │  └─ Revenue: €45,000
  └─ Recent Activity Timeline
  │
  ▼
Create New Project
  │
  ├─ Project Info Form
  │  ├─ Project Title ✓
  │  ├─ Client Name ✓
  │  ├─ Client Email ✓
  │  ├─ Client Phone ✓
  │  ├─ Address ✓
  │  ├─ Power Output (kWc) ✓
  │  ├─ Installation Type ✓
  │  ├─ Budget ✓
  │  └─ Notes
  │
  ├─ Validation Check
  │  ├─ All required fields? ✓
  │  ├─ Valid email format? ✓
  │  ├─ Power output > 0? ✓
  │  └─ Address format OK? ✓
  │
  ▼
Project Created (Status: DRAFT)
  │
  ├─ Upload Documents
  │  ├─ Technical Plans (PDF)
  │  ├─ Electrical Diagram (PDF)
  │  ├─ Quotes (PDF)
  │  ├─ Site Photos (JPEG/PNG)
  │  └─ Client Signed Agreement (PDF)
  │
  ▼
Documents Stored in Cloud
  │
  ├─ Auto-categorization
  │  ├─ technical_plans
  │  ├─ electrical_diagram
  │  ├─ quotes
  │  └─ site_photos
  │
  ▼
Initiate DP (Déclaration Préalable)
  │
  ├─ System Auto-fills from:
  │  ├─ Project data (address, client info)
  │  ├─ Installer profile (SIRET, RCS)
  │  └─ Previous DP templates
  │
  ├─ Review DP Form
  │  ├─ Verify auto-filled data
  │  ├─ Complete manual fields if needed
  │  └─ Select municipality template
  │
  ├─ Generate PDF
  │  └─ Professional DP document created
  │
  ├─ E-Sign Document
  │  └─ Digital signature applied
  │
  ▼
DP Status: READY_FOR_SUBMISSION
  │
  ├─ Download PDF
  │  └─ Ready to send to mairie
  │
  ├─ Auto-Submit (if enabled)
  │  ├─ Send to municipality
  │  └─ Automatic confirmation tracking
  │
  ▼
Initiate Consuel
  │
  ├─ Technical Info Form
  │  ├─ Inverter Model
  │  ├─ Panel Type
  │  ├─ Installation Date
  │  └─ Certification Info
  │
  ├─ Auto-validation
  │  ├─ Check electrical compliance
  │  ├─ Verify installer credentials
  │  └─ Validate technical specs
  │
  ├─ Generate Certificate
  │  └─ Consuel bordereau created
  │
  ▼
Consuel Status: CERTIFICATE_READY
  │
  ├─ Auto-send to Consuel
  │  └─ Tracking number assigned
  │
  ├─ Track Status
  │  └─ Poll Consuel API for updates
  │
  ▼
Notify Client
  │
  ├─ Send Email
  │  ├─ Project status updated
  │  ├─ Link to client portal
  │  └─ Documents available for download
  │
  ├─ Share Documents
  │  ├─ DP document (read-only)
  │  ├─ Consuel certificate (read-only)
  │  └─ Technical documentation
  │
  ▼
Track & Monitor
  │
  ├─ Dashboard Updates
  │  ├─ Real-time status changes
  │  ├─ DP approval status from mairie
  │  ├─ Consuel response
  │  └─ Enedis connection status
  │
  ├─ Notifications
  │  ├─ Email on status change
  │  ├─ In-app notifications
  │  └─ SMS for critical updates
  │
  ▼
Project Complete
  │
  ├─ Mark as Completed
  │  ├─ Set completion date
  │  ├─ Add final notes
  │  └─ Archive all documents
  │
  ├─ Create Invoice
  │  ├─ Auto-populate from project budget
  │  ├─ Add line items
  │  └─ Send to client
  │
  ▼
Project Archived
  │
  └─ Ready for new project
```

## Client Portal Journey

```
┌─────────────────────────────────────────────────────────────────┐
│                     CLIENT JOURNEY                              │
└─────────────────────────────────────────────────────────────────┘

Email Link from Installer
  │
  ├─ "Your solar project is ready"
  └─ Click: View Project Portal
  │
  ▼
First Login / Create Account
  │
  ├─ Email (pre-filled)
  ├─ Password (create)
  └─ Accept Terms
  │
  ▼
Dashboard
  │
  ├─ Project Overview Card
  │  ├─ Project Title
  │  ├─ Installation Address
  │  ├─ Status Badge (IN PROGRESS)
  │  ├─ Progress Bar (75%)
  │  └─ Estimated Completion: Dec 15, 2025
  │
  ├─ Timeline View
  │  ├─ ✅ Project Approved (Dec 1)
  │  ├─ ✅ Materials Ordered (Dec 3)
  │  ├─ ✅ Installation Started (Dec 5)
  │  ├─ 🔄 DP Approval (Pending)
  │  └─ ⏳ Consuel Certification (Pending)
  │
  ├─ Key Metrics
  │  ├─ System Size: 6 kWc
  │  ├─ Panels: 15 x 400W
  │  ├─ Inverter: SMA 6000
  │  └─ Estimated Annual Production: 7,200 kWh
  │
  ▼
Browse Documents
  │
  ├─ Technical Documentation
  │  ├─ Installation Plans (PDF)
  │  ├─ Electrical Diagram (PDF)
  │  ├─ Inverter Manual (PDF)
  │  └─ Warranty Certificate (PDF)
  │
  ├─ Administrative Files
  │  ├─ DP Document (PDF)
  │  ├─ Consuel Certificate (when ready)
  │  ├─ Installation Quote (PDF)
  │  └─ Invoice (PDF)
  │
  ├─ Download Document
  │  └─ Secure download with timestamp
  │
  ▼
Check Project Status
  │
  ├─ Real-time Updates
  │  ├─ DP Approved by Municipality ✅ (Dec 8)
  │  ├─ System Installed & Tested ✅ (Dec 10)
  │  ├─ Awaiting Consuel Approval 🔄
  │  └─ Enedis Connection Pending
  │
  ├─ Status Explanation
  │  └─ What's next? Consuel will validate in 2-5 days
  │
  ├─ Contact Installer
  │  ├─ Direct Message
  │  ├─ Phone Number
  │  └─ Email Support
  │
  ▼
Message Installer
  │
  ├─ Chat Interface
  │  ├─ Message history (thread)
  │  ├─ Timestamp for each message
  │  ├─ Read receipts
  │  └─ File attachments
  │
  ├─ Message Examples
  │  ├─ "When will Consuel approve?"
  │  ├─ "Can I see the electrical diagram?"
  │  └─ "What's the next step?"
  │
  ├─ Notifications
  │  └─ Email when installer replies
  │
  ▼
View Invoice & Pay
  │
  ├─ Invoice Details
  │  ├─ Invoice Number: SF-2025-0001
  │  ├─ Date: Dec 1, 2025
  │  ├─ Due Date: Dec 31, 2025
  │  ├─ Amount: €15,000
  │  └─ Items breakdown
  │
  ├─ Payment Method
  │  ├─ Credit/Debit Card
  │  ├─ Bank Transfer
  │  ├─ PayPal
  │  └─ Financing Option (if available)
  │
  ├─ Pay Online
  │  ├─ Secure payment gateway
  │  ├─ Receipt generated
  │  └─ Email confirmation sent
  │
  ▼
Receive Notifications
  │
  ├─ Status Updates
  │  ├─ "Your DP has been approved"
  │  ├─ "Consuel certification received"
  │  └─ "Installation completed"
  │
  ├─ Notification Methods
  │  ├─ In-app notification
  │  ├─ Email notification
  │  └─ SMS (optional)
  │
  ▼
Project Complete
  │
  ├─ Final Status: COMPLETED ✅
  ├─ System Active & Connected to Grid
  ├─ All Documents Available for Download
  ├─ Performance Monitoring (if integrated)
  └─ Support Contact for Future Needs
```

## Admin Management Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                 ADMIN DASHBOARD FLOW                            │
└─────────────────────────────────────────────────────────────────┘

Login
  │
  ▼
Admin Dashboard
  │
  ├─ Overall Stats
  │  ├─ Total Users: 145
  │  ├─ Active Projects: 23
  │  ├─ Revenue (Month): €125,000
  │  └─ System Health: 99.9% uptime
  │
  ├─ User Management
  │  │
  │  ├─ View All Users
  │  │  ├─ Filter by role (admin/installer/client)
  │  │  ├─ Filter by status (active/inactive)
  │  │  ├─ Search by name/email
  │  │  └─ Sort by join date
  │  │
  │  ├─ Create New User
  │  │  ├─ Email
  │  │  ├─ Name
  │  │  ├─ Role assignment
  │  │  ├─ Company (if installer)
  │  │  └─ Send invitation email
  │  │
  │  ├─ Edit User
  │  │  ├─ Update profile info
  │  │  ├─ Change role
  │  │  ├─ Enable/disable account
  │  │  └─ Reset password
  │  │
  │  └─ Delete User
  │     └─ Soft delete with archive
  │
  ├─ System Configuration
  │  │
  │  ├─ DP Templates
  │  │  ├─ Create custom template
  │  │  ├─ Upload template PDF
  │  │  ├─ Map data fields
  │  │  └─ Test template
  │  │
  │  ├─ Consuel Settings
  │  │  ├─ API credentials
  │  │  ├─ Auto-submission rules
  │  │  └─ Email notification settings
  │  │
  │  ├─ Company Settings
  │  │  ├─ Logo & branding
  │  │  ├─ Contact info
  │  │  ├─ Support email
  │  │  └─ Terms & conditions
  │  │
  │  └─ Integration Settings
  │     ├─ Stripe API keys
  │     ├─ Email service config
  │     └─ Third-party webhooks
  │
  ├─ Analytics & Reporting
  │  │
  │  ├─ Project Analytics
  │  │  ├─ Total projects: 456
  │  │  ├─ Completed: 389 (85%)
  │  │  ├─ In progress: 54
  │  │  ├─ Avg completion time: 28 days
  │  │  └─ Chart: Projects by installer
  │  │
  │  ├─ Revenue Analytics
  │  │  ├─ Total revenue: €1.2M
  │  │  ├─ Monthly trend (chart)
  │  │  ├─ Revenue by installer
  │  │  └─ Outstanding invoices: €45K
  │  │
  │  ├─ User Analytics
  │  │  ├─ Total users: 145
  │  │  ├─ New users this month: 12
  │  │  ├─ Active users: 89
  │  │  └─ Usage heatmap
  │  │
  │  ├─ Custom Reports
  │  │  ├─ Report builder
  │  │  ├─ Select metrics
  │  │  ├─ Date range
  │  │  ├─ Generate
  │  │  └─ Export (CSV/PDF/Excel)
  │  │
  │  └─ Real-time Dashboard
  │     ├─ Live user count
  │     ├─ Current workflows running
  │     ├─ System performance
  │     └─ Error rate
  │
  ├─ Audit Logs
  │  │
  │  ├─ All Actions Logged
  │  │  ├─ User action (create/update/delete)
  │  │  ├─ Timestamp
  │  │  ├─ User who made change
  │  │  ├─ Data changed
  │  │  └─ IP address & location
  │  │
  │  ├─ Filter & Search
  │  │  ├─ By action type
  │  │  ├─ By user
  │  │  ├─ By entity type
  │  │  ├─ By date range
  │  │  └─ Export log
  │  │
  │  └─ Compliance Reports
  │     ├─ GDPR audit trail
  │     └─ Data access report
  │
  └─ Support & Monitoring
     ├─ System Health
     │  ├─ Database status
     │  ├─ API availability
     │  ├─ Storage usage
     │  └─ Performance metrics
     │
     ├─ Error Tracking
     │  ├─ Recent errors
     │  ├─ Error frequency
     │  ├─ Stack traces
     │  └─ User affected
     │
     └─ Support Tickets
        ├─ User reported issues
        ├─ Priority level
        ├─ Status tracking
        └─ Resolution history
```

## Workflow Automation: DP Process

```
┌─────────────────────────────────────────────────────────────────┐
│              DP AUTOMATION WORKFLOW                             │
└─────────────────────────────────────────────────────────────────┘

TRIGGER: Installer clicks "Create DP"
  │
  ▼
STEP 1: Data Collection
  │
  ├─ Auto-fetch from Database:
  │  ├─ Project info (address, client name)
  │  ├─ Installer credentials (SIRET, RCS)
  │  ├─ Technical specs (power output)
  │  └─ Previous DP templates
  │
  ▼
STEP 2: Validation
  │
  ├─ Check all required fields present
  │  └─ If missing: Show form with incomplete fields
  │
  ├─ Validate data format
  │  ├─ Address format valid?
  │  ├─ SIRET valid?
  │  ├─ Power output numeric?
  │  └─ Email format correct?
  │
  ├─ Check municipality rules
  │  ├─ Fetch municipality template
  │  ├─ Apply specific rules
  │  └─ Validate compliance
  │
  └─ If validation fails: Stop, show error
  │
  ▼
STEP 3: Form Generation
  │
  ├─ Load template for municipality
  ├─ Map data fields to template
  ├─ Apply business rules
  ├─ Add calculated fields
  │  ├─ Total surface area
  │  ├─ Installation details
  │  └─ Environmental impact
  │
  ▼
STEP 4: PDF Generation
  │
  ├─ Render template with data
  ├─ Apply formatting & styling
  ├─ Embed signatures & seals
  ├─ Generate PDF file
  │
  ▼
STEP 5: E-Signature
  │
  ├─ Add signature field
  ├─ Apply digital signature
  ├─ Add timestamp
  ├─ Generate certificate
  │
  ▼
STEP 6: Storage
  │
  ├─ Save PDF to Cloud Storage
  ├─ Store reference in Firestore
  ├─ Update workflow status: READY
  │
  ▼
STEP 7: User Review & Action
  │
  ├─ Installer downloads PDF
  ├─ Reviews document
  │
  ├─ Two paths:
  │  │
  │  ├─ Path A: Manual Submit
  │  │  └─ Print & send to municipality
  │  │
  │  └─ Path B: Auto-Submit (if configured)
  │     ├─ Activate auto-submit
  │     ├─ System sends via courier API
  │     └─ Tracking number generated
  │
  ▼
STEP 8: Tracking & Follow-up
  │
  ├─ Monitor status from municipality
  ├─ Poll API for updates (daily)
  ├─ Notify installer of approvals/rejections
  ├─ Notify client of status
  │
  ▼
END: Status Updated
  │
  ├─ Approved: Update project status
  ├─ Rejected: Alert installer with reason
  └─ Pending: Continue monitoring
```
