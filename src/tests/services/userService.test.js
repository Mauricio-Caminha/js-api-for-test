const { describe, it, expect, beforeEach } = require('@jest/globals');
const { getAllUsers, getUserById, createUser, updateUser, deleteUser } = require('../../services/userService');

describe('UserService', () => {
  let users;

  beforeEach(() => {
    users = [
      { id: '1', name: 'João Silva', email: 'joao@example.com', age: 30 },
      { id: '2', name: 'Maria Santos', email: 'maria@example.com', age: 25 },
      { id: '3', name: 'Pedro Oliveira', email: 'pedro@example.com', age: 35 }
    ];
  });

  describe('getAllUsers', () => {
    it('should return all users', async () => {
      const result = await getAllUsers();
      expect(result).toEqual(users);
    });
  });

  describe('getUserById', () => {
    it('should return user when id exists', async () => {
      const result = await getUserById('1');
      expect(result).toEqual(users[0]);
    });

    it('should return undefined when user does not exist', async () => {
      const result = await getUserById('999');
      expect(result).toBeUndefined();
    });
  });

  describe('createUser', () => {
    it('should create a new user', async () => {
      const newUserData = { name: 'Ana Costa', email: 'ana@example.com', age: 28 };
      const result = await createUser(newUserData);
      expect(result).toEqual({ id: '4', ...newUserData });
    });
  });

  describe('updateUser', () => {
    it('should update user when id exists', async () => {
      const updatedData = { name: 'João Updated', age: 31 };
      const result = await updateUser('1', updatedData);
      expect(result).toEqual({ id: '1', name: 'João Updated', email: 'joao@example.com', age: 31 });
    });

    it('should return null when user does not exist', async () => {
      const result = await updateUser('999', { name: 'Nonexistent' });
      expect(result).toBeNull();
    });
  });

  describe('deleteUser', () => {
    it('should delete user when id exists', async () => {
      const result = await deleteUser('1');
      expect(result).toBe(true);
    });

    it('should return false when user does not exist', async () => {
      const result = await deleteUser('999');
      expect(result).toBe(false);
    });
  });
});