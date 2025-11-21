const { describe, it, expect, beforeEach } = require("@jest/globals");
const userService = require("../services/userService");

describe("User Service", () => {
  beforeEach(() => {
    // Reset the in-memory database before each test
    userService.users = [
      { id: '1', name: 'João Silva', email: 'joao@example.com', age: 30 },
      { id: '2', name: 'Maria Santos', email: 'maria@example.com', age: 25 },
      { id: '3', name: 'Pedro Oliveira', email: 'pedro@example.com', age: 35 }
    ];
  });

  describe("getAllUsers", () => {
    it("should return all users", async () => {
      const users = await userService.getAllUsers();
      expect(users).toHaveLength(3);
      expect(users).toEqual(expect.arrayContaining([
        expect.objectContaining({ id: '1', name: 'João Silva' }),
        expect.objectContaining({ id: '2', name: 'Maria Santos' }),
        expect.objectContaining({ id: '3', name: 'Pedro Oliveira' })
      ]));
    });
  });

  describe("getUserById", () => {
    it("should return user by id", async () => {
      const user = await userService.getUserById('1');
      expect(user).toEqual(expect.objectContaining({ id: '1', name: 'João Silva' }));
    });

    it("should return null for non-existing user", async () => {
      const user = await userService.getUserById('999');
      expect(user).toBeUndefined();
    });
  });

  describe("createUser", () => {
    it("should create a new user", async () => {
      const newUser = { name: 'Ana Costa', email: 'ana@example.com', age: 28 };
      const createdUser = await userService.createUser(newUser);
      expect(createdUser).toEqual(expect.objectContaining({ id: '4', name: 'Ana Costa' }));
      const users = await userService.getAllUsers();
      expect(users).toHaveLength(4);
    });
  });

  describe("updateUser", () => {
    it("should update an existing user", async () => {
      const updatedUser = { name: 'João Updated', email: 'joao.updated@example.com', age: 31 };
      const user = await userService.updateUser('1', updatedUser);
      expect(user).toEqual(expect.objectContaining({ id: '1', name: 'João Updated' }));
    });

    it("should return null for non-existing user", async () => {
      const user = await userService.updateUser('999', { name: 'Non-existing' });
      expect(user).toBeNull();
    });
  });

  describe("deleteUser", () => {
    it("should delete an existing user", async () => {
      const result = await userService.deleteUser('1');
      expect(result).toBe(true);
      const users = await userService.getAllUsers();
      expect(users).toHaveLength(2);
    });

    it("should return false for non-existing user", async () => {
      const result = await userService.deleteUser('999');
      expect(result).toBe(false);
    });
  });
});