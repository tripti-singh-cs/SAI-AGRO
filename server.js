// Standalone Express + Next.js Server Integration
const express = require('express');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const port = process.env.PORT || 3000;

app.prepare().then(() => {
  const server = express();

  // Note: Do NOT use express.json() globally here as it consumes the request stream
  // which prevents Next.js App Router API routes from reading req.json() / req.formData()

  // Handle all requests with Next.js App Router
  server.all('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> SAI AGRO INDUSTRIES Server ready on http://localhost:${port}`);
  });
}).catch((ex) => {
  console.error(ex.stack);
  process.exit(1);
});
