# React URL Shortener App

This is a client-side React URL Shortener Web Application built as part of the **Campus Hiring Evaluation** by **Afford Medical Technologies Pvt. Ltd.**

It allows users to shorten up to 5 URLs at once, apply optional custom shortcodes and expiry periods, and view analytics like click stats and expiry times — all within a clean, Material UI-based interface.

---

## Features

- Shorten up to 5 URLs at once
- Custom shortcodes (optional, alphanumeric, unique)
- Expiry time for each shortened URL (defaults to 30 minutes)
- Redirect from short to original URL using client-side routing
- Statistics page with:
  - Total clicks
  - Timestamps
  - Source and location (mocked)
- Custom logging using AffordMed-provided API (no `console.log` used)
- Session storage via `localStorage`

---

## Tech Stack

- **React** with **Vite**
- **Material UI** (MUI)
- **React Router**
- **localStorage** for session-based data
- **AffordMed Logging Middleware API**

