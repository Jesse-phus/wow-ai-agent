export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method Not Allowed' });
  }

  try {
    // In Vercel/Next.js, req.body is often already parsed.
    // This safely handles both parsed objects and raw JSON strings.
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    const { name, phone, email } = body || {};

    if (!name || !phone) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: name and phone'
      });
    }

    const response = await fetch(process.env.N8N_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, phone, email })
    });

    if (!response.ok) {
      const errorText = await response.text();
      return res.status(response.status).json({
        success: false,
        error: 'Failed to trigger n8n webhook',
        details: errorText
      });
    }

    return res.status(200).json({
      success: true,
      message: `Call trigger sent for ${name}`
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: 'Server error',
      details: error.message
    });
  }
}
