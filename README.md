# AngelWingsUAS Website

Official website source for **AngelWingsUAS**, a Southern California drone
services and technology solutions company founded by FAA Part 107 Certified
Remote Pilot Jevita Webster.

## Website

- Live preview: https://skyward-aerial-drone.angelwingsuas.chatgpt.site
- Current business domain: https://www.angelwingsuas.com
- Contact: angelwingsuas@gmail.com

## What this site includes

- Professional drone photography and videography
- Aerial inspections
- Mapping and surveying support
- Construction progress documentation
- Community and city project services
- Promotional media and 360° virtual tours
- Web applications, AI business tools, automation, and technology consulting

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
