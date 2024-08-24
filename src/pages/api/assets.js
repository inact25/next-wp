import process from 'next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss';

export default async function handler(req, res) {
  try {
    const { url } = req.query;

    if (!url) {
      return res.status(400).json({ error: 'Image URL is required' });
    }
    const base = process.env.WORDPRESS_ENDPOINT;
    const full = base.toString().concat('/wp-content/').concat(url);
    const response = await fetch(full, {
      cache: 'no-cache',
    });

    if (!response.ok) {
      return res.status(500).json({ error: `Failed to fetch image ` });
    }

    const imageBuffer = await response.arrayBuffer();

    res.setHeader('Content-Type', response.headers.get('Content-Type') || 'image/jpeg');
    res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
    res.status(200).send(Buffer.from(imageBuffer));
  } catch (error) {
    res.status(500).json({ error: 'hilik bangsat' });
  }
}
