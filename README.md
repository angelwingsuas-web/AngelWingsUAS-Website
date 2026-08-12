# AngelWingsUAS Website

Portfolio website for **AngelWingsUAS**, featuring drone photography, aerial
video, CloudPano 360° tours, and on-location visual documentation by FAA Part
107 Certified Remote Pilot Jevita Webster.

## Website

- Live preview: https://skyward-aerial-drone.angelwingsuas.chatgpt.site
- Portfolio: https://angelwingsuas-website.angelwingsuas.workers.dev/
- Main business website: https://www.angelwingsuas.com
- Contact: support@angelwingsuas.com

## What this site includes

- Full-screen drone photography gallery
- A video showcase ready for YouTube flight footage
- Embedded CloudPano 360° virtual tours
- On-location and behind-the-scenes storytelling
- Direct links to the main AngelWingsUAS website for project requests

## Local development

This project uses Node.js 22 or newer.

```bash
npm install
npm run dev
```

Open the local address shown in the terminal.

## Production check

Run this before publishing changes:

```bash
npm run build
```

## Main editing areas

- `app/page.tsx` — website wording and page sections
- `app/globals.css` — colors, typography, layout, and responsive design
- `app/layout.tsx` — page title, description, icons, and social sharing metadata
- `public/` — AngelWingsUAS logos and social-sharing artwork

## Publishing

The public GitHub repository is the editable source copy. The currently hosted
site is managed through OpenAI Sites. Updating GitHub alone does not
automatically change the live website; publish a new Sites version after
validating changes.
