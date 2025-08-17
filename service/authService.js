const jwt = require('jsonwebtoken');
const { findUserByUsername, addUser } = require('../model/userModel');
const SECRET = 'supersecretkey';

function register(username, password) {
  if (!username || !password) {
    return { error: 'Username and password are required.' };
  }
  if (findUserByUsername(username)) {
    return { error: 'User already exists.' };
  }
  addUser({ username, password });
  return { message: 'User registered successfully.' };
}

function login(username, password) {
  if (!username || !password) {
    return { error: 'Username and password are required.' };
  }
  const user = findUserByUsername(username);
  if (!user || user.password !== password) {
    return { error: 'Invalid username or password.' };
  }
  const token = jwt.sign({ username }, SECRET, { expiresIn: '1h' });
  return { token };
}

function getUserProfile(username) {
  const user = findUserByUsername(username);
  if (!user) {
    return { error: 'User not found.' };
  }
  // Retorne apenas dados públicos
  return { username: user.username };
}

module.exports = { register, login, getUserProfile };
