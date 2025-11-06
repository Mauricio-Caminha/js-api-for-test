// Simulação de banco de dados em memória
let users = [
  { id: '1', name: 'João Silva', email: 'joao@example.com', age: 30 },
  { id: '2', name: 'Maria Santos', email: 'maria@example.com', age: 25 },
  { id: '3', name: 'Pedro Oliveira', email: 'pedro@example.com', age: 35 }
];

const getAllUsers = async () => {
  return users;
};

const getUserById = async (id) => {
  return users.find(user => user.id === id);
};

const createUser = async (userData) => {
  const newUser = {
    id: String(users.length + 1),
    name: userData.name,
    email: userData.email,
    age: userData.age
  };
  
  users.push(newUser);
  return newUser;
};

const updateUser = async (id, userData) => {
  const userIndex = users.findIndex(user => user.id === id);
  
  if (userIndex === -1) {
    return null;
  }
  
  users[userIndex] = {
    ...users[userIndex],
    ...userData,
    id: users[userIndex].id // Preserva o ID
  };
  
  return users[userIndex];
};

const deleteUser = async (id) => {
  const userIndex = users.findIndex(user => user.id === id);
  
  if (userIndex === -1) {
    return false;
  }
  
  users.splice(userIndex, 1);
  return true;
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
};

