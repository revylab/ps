let dataStore = []; // Temporary in-memory storage

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Missing email or password' });
    }
    dataStore.push({ email, password });
    return res.status(200).json({ message: 'Data saved successfully' });
  }
  return res.status(405).json({ error: 'Method not allowed' });
}
