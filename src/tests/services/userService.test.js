const userService = require('../../services/userService');

describe('UserService', () => {
  beforeEach(() => {
    // Reset the users array before each test
    users = [
      { id: '1', name: 'João Silva', email: 'joao@example.com', age: 30 },
      { id: '2', name: 'Maria Santos', email: 'maria@example.com', age: 25 },
      { id: '3', name: 'Pedro Oliveira', email: 'pedro@example.com', age: 35 }
    ];
  });

  describe('getAllUsers', () => {
    it('should return all users', async () => {
      const result = await userService.getAllUsers();
      expect(result).toEqual(users);
    });
  });

  describe('getUserById', () => {
    it('should return user when id exists', async () => {
      const result = await userService.getUserById('1');
      expect(result).toEqual(users[0]);
    });

    it('should return null when user id does not exist', async () => {
      const result = await userService.getUserById('999');
      expect(result).toBeUndefined();
    });
  });

  describe('createUser', () => {
    it('should create a new user', async () => {
      const newUser = { name: 'Ana Costa', email: 'ana@example.com', age: 28 };
      const result = await userService.createUser(newUser);
      expect(result).toEqual({
        id: '4',
        name: 'Ana Costa',
        email: 'ana@example.com',
        age: 28
      });
    });
  });

  describe('updateUser', () => {
    it('should update user when id exists', async () => {
      const updatedUser = { name: 'João Silva Updated', age: 31 };
      const result = await userService.updateUser('1', updatedUser);
      expect(result).toEqual({
        id: '1',
        name: 'João Silva Updated',
        email: 'joao@example.com',
        age: 31
      });
    });

    it('should return null when user id does not exist', async () => {
      const result = await userService.updateUser('999', { name: 'Nonexistent' });
      expect(result).toBeNull();
    });
  });

  describe('deleteUser', () => {
    it('should delete user when id exists', async () => {
      const result = await userService.deleteUser('1');
      expect(result).toBe(true);
      expect(await userService.getUserById('1')).toBeUndefined();
    });

    it('should return false when user id does not exist', async () => {
      const result = await userService.deleteUser('999');
      expect(result).toBe(false);
    });
  });
});