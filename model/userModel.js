// In-memory user database
const users = [];

function findUserByUsername(username) {
  return users.find(user => user.username === username);
}

function addUser(user) {
  users.push(user);
}

function getUsers() {
  return users;
}

module.exports = { findUserByUsername, addUser, getUsers };
