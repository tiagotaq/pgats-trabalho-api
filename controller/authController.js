const authService = require('../service/authService');

function registerUser(req, res) {
  const { username, password } = req.body;
  const result = authService.register(username, password);
  if (result.error) {
    return res.status(400).json({ error: result.error });
  }
  res.status(201).json({ message: result.message });
}

function loginUser(req, res) {
  const { username, password } = req.body;
  const result = authService.login(username, password);
  if (result.error) {
    return res.status(400).json({ error: result.error });
  }
  res.json({ token: result.token });
}

function getProfile(req, res) {
  const result = authService.getUserProfile(req.user.username);
  if (result.error) {
    return res.status(404).json({ error: result.error });
  }
  res.json({ message: `Welcome, ${result.username}!` });
}

module.exports = { registerUser, loginUser, getProfile };
