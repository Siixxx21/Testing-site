# Clothery — Modern Black & White Prototype

This is a minimal static prototype for a clothes shop with a modern black & white design and subtle gold accents.

How to run:
1. Save the files (index.html, styles.css, script.js, products.json, README.md) in a folder.
2. Open `index.html` in the browser. If images fail due to CORS on some browsers, serve via a local static server:
   - Python: `python -m http.server 8000` and open http://localhost:8000
3. Interact with the cart (stored in localStorage). The Checkout button is a placeholder.

Design notes:
- Typography: Playfair Display for the brand, Inter for UI.
- Palette: Black & white with a warm gold accent for primary actions.
- Images are shown in grayscale for the monochrome look and reveal color on hover.

Next steps you might want:
- Add product detail pages and size/color variants.
- Integrate Stripe Checkout (I can provide client + server code).
- Add a simple admin via CSV upload or connect a headless CMS (Sanity, Contentful).
- Deploy to Vercel / Netlify.
