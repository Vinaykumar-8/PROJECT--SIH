# PROJECT--SIH
About building an mobile based application for Toursits Safety and Security.


🔹 Technical Approach
1. Frontend Layer
a. Tourist Mobile App (React Native)

Framework: React Native (cross-platform iOS + Android).

Features:

Login & 2FA (via OTP/Authenticator).

Digital ID Display (QR code + Blockchain-verified).

SOS Button (triggers backend alert).

Real-time GPS Tracking (background service).

Push Notifications (Firebase Cloud Messaging).

Emergency Contacts & Offline Mesh Network Support.

Profile & Trip Details Management.

b. Police Web Dashboard (React.js)

Framework: React.js + Tailwind (UI styling).

Features:

Secure Login (2FA) with role-based access.

Real-time Map showing tourist locations (via Google Maps/Leaflet).

SOS & Alert Management (list + details + map marker).

Tourist Verification (scan/check QR ID).

Case Management System (E-FIRs, reports).

Analytics Dashboard (charts using Recharts/D3.js).

Broadcast Alerts (push notifications to tourists).

2. Backend Layer (Node.js)
a. Core Framework

Node.js with Express.js (or NestJS)

REST + GraphQL APIs.

Middleware for authentication, logging, error handling.

b. Authentication & Security

OAuth2 + JWT for secure sessions.

2FA support for both tourists & police.

Encryption → HTTPS/TLS for transport, AES for sensitive data.

Blockchain Integration for tamper-proof IDs + logs.

c. Database

PostgreSQL (SQL) → user profiles, cases, officer data.

MongoDB (NoSQL) → real-time location updates, alerts history.

d. AI/ML Engine (Optional Service)

Built in Python microservice (but callable via Node.js API).

Detects anomalies (route deviation, inactivity, dead zones).

e. Communication Layer

Push Notifications: Firebase Cloud Messaging.

Offline Support: MQTT broker + mesh networking.

Emergency Routing: auto-assign SOS to nearest officer.

f. Monitoring & Logging

Winston / Morgan for backend logs.

Prometheus + Grafana for server monitoring.

Blockchain audit logs for evidence.

3. Hosting & Deployment

Cloud: AWS / GCP / Azure.

Containerization: Docker + Kubernetes.

CI/CD: GitHub Actions / GitLab CI.
