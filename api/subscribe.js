export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email } = req.body;

  if (!email || !email.includes('@')) {
    return res.status(400).json({ error: 'Email invalide' });
  }

  try {
    const response = await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'content-type': 'application/json',
        'api-key': process.env.BREVO_API_KEY,
      },
      body: JSON.stringify({
        email: email,
        listIds: [parseInt(process.env.BREVO_LIST_ID)],
        updateEnabled: true,
      }),
    });

    const data = await response.json();

    if (response.ok || (data.message && data.message.includes('already'))) {
      return res.status(200).json({ success: true });
    } else {
      console.error('Brevo error:', data);
      return res.status(500).json({ error: 'Erreur serveur' });
    }
  } catch (error) {
    console.error('API error:', error);
    return res.status(500).json({ error: 'Erreur serveur' });
  }
}
