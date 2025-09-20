# PROJECT--SIH
About building an mobile based application for Toursits Safety and Security.

Perfect ✅ I’ll clean, structure, and format all of this into a **professional repo-ready document**.
Here’s the polished version you can copy directly:

---

# Technical Approach — Tourist Safety Application

The Tourist Safety System operates across three main components:

1. **Mobile Application (React Native)**
2. **Web Application (Admin & Public)**
3. **Backend Services (Core Features & Mapping)**

---

## 1. 📱 Mobile Application (React Native)

**Primary responsibilities:**

* Tourist-facing UX
* On-device sensing & ML
* Local queues for offline support
* Real-time location & SOS handling

### Features

**Login**

* OTP / Email + Password + Refresh Tokens
* Device binding and optional MFA

**User Profile**

* Personal details (encrypted)
* Add dependents (family members, relationships, emergency contacts)

**Create Tour**

* Generate Tour ID (ULID / KSUID — human-friendly, time-sortable)
* Add tour members (invite by phone/email, accept/decline flow)

**Active Tour**

* Interactive map (React Native Maps + OSM / Mapbox tiles)
* SOS alert (manual button + automated triggers)
* Chatbox with interactive ML assistant (local NLP model or server-backed)
* Local emergency contact numbers (stored + quick-call option)

**Past Tours**

* History of tours
* Incident logs
* Shared route playback

### On-Device Capabilities

* On-device ML (TensorFlow Lite / PyTorch Mobile) for fall detection and shake detection
* Shake-to-SOS with configurable sensitivity and cancel window
* Local queue (SQLite / Realm) for offline buffering (locations, SOS, event batches)
* Battery-aware location sampling (adaptive frequency based on battery/accuracy)

---

## 2. 💻 Web Application (Admin & Public)

### Public Pages

* **Description / Landing Page**: Purpose, features, download links, privacy policy
* **User Registration Page**: Tourist registration and verification (phone/email)
* **Admin Login / Registration Page**: Secure admin registration with role assignment (monitor/responder), 2FA, and invitation workflows

### Admin Dashboard (OSM Integration)

**Core Panels**

* **Live Map (OSM)**

  * Tourist clusters / markers
  * Dead zone indicators
  * Restricted areas overlay
  * Heatmap & cluster toggles, multiple tile layers
* **EFIR (Electronic First Incident Report)**: Create & view incident forms
* **Incident Alerts**: SOS feed with details, quick-assign, and escalation
* **Pending Cases**: Ongoing incidents awaiting resolution
* **Closed Cases**: Resolved incidents with full audit trail

**Interactions**

* Click marker → Open incident details, GPS history, route replay, contact user
* Filter incidents by tour, time, severity, or region

---

## 3. ⚙️ Backend Services (Core Features)

**Core Feature Set (12 Items)**

1. **Geo-fencing** (entry/exit detection around safe/restricted zones)
2. **SOS alert** (manual & auto triggers)
3. **Automatic fall detection** (on-device ML detection, server logging)
4. **Network monitoring** (connectivity status & failover)
5. **Location sharing** (real-time and historical tracking)
6. **On-device ML model lifecycle** (deploy, update, telemetry collection)
7. **Unique ID generation** (ULID / UUIDv4 / KSUID for traceability)
8. **Landmark navigation** (routing & POIs for tourist guidance)
9. **Blockchain integration** (hash anchoring; no PII on-chain)
10. **Dead-zone tackling** (local buffering, sync when online, alert generation)
11. **Encrypted database** (field-level + disk encryption for sensitive data)
12. **Shake-to-SOS** (on-device detection → backend event pipeline)

---

This document is structured for **direct use in your repo** (e.g., as `TECHNICAL_APPROACH.md`).

👉 Do you also want me to create a **repo tree structure** (folders & files for `mobile/`, `web/`, `backend/`) so it aligns with this technical approach?
