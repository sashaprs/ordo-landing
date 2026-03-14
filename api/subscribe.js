const https = require('https');

module.exports = function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const { email } = req.body;

  if (!email || !email.includes('@')) {
    res.status(400).json({ error: 'Email invalide' });
    return;
  }

  const postData = JSON.stringify({
    email: email,
    listIds: [parseInt(process.env.BREVO_LIST_ID)],
    updateEnabled: true
  });

  const options = {
    hostname: 'api.brevo.com',
    port: 443,
    path: '/v3/contacts',
    method: 'POST',
    headers: {
      'accept': 'application/json',
      'content-type': 'application/json',
      'api-key': process.env.BREVO_API_KEY,
      'content-length': Buffer.byteLength(postData)
    }
  };

  const request = https.request(options, (response) => {
    let data = '';
    response.on('data', (chunk) => { data += chunk; });
    response.on('end', () => {
      if (response.statusCode >= 200 && response.statusCode < 300) {
        res.status(200).json({ success: true });
      } else {
        try {
          const parsed = JSON.parse(data);
          if (parsed.message && parsed.message.includes('already')) {
            res.status(200).json({ success: true });
          } else {
            console.error('Brevo error:', data);
            res.status(500).json({ error: 'Erreur serveur' });
          }
        } catch (e) {
          console.error('Parse error:', data);
          res.status(500).json({ error: 'Erreur serveur' });
        }
      }
    });
  });

  request.on('error', (error) => {
    console.error('Request error:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  });

  request.write(postData);
  request.end();
};
