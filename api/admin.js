import basicAuth from 'basic-auth';

let dataStore = []; // Temporary in-memory storage shared across endpoints

export default function handler(req, res) {
  const user = basicAuth(req);

  const ADMIN_USERNAME = 'admin';
  const ADMIN_PASSWORD = 'password';

  if (
    !user ||
    user.name !== ADMIN_USERNAME ||
    user.pass !== ADMIN_PASSWORD
  ) {
    res.setHeader('WWW-Authenticate', 'Basic realm="Admin Area"');
    return res.status(401).end('Access denied');
  }

  res.status(200).json(dataStore);
}
