const { describe, it, expect, beforeEach } = require("@jest/globals");
const userService = require("../../src/services/userService");

describe("UserService", () => {
  let users;

  beforeEach(() => {
    // Reset the in-memory database before each test
    users = [
      { id: '1', name: 'João Silva', email: 'joao@example.com', age: 30 },
      { id: '2', name: 'Maria Santos', email: 'maria@example.com', age: 25 },
      { id: '3', name: 'Pedro Oliveira', email: 'pedro@example.com', age: 35 }
    ];
  });

  describe("getAllUsers", () => {
    it("should return all users", async () => {
      const result = await userService.getAllUsers();
      expect(result).toEqual(users);
    });
  });

  describe("getUserById", () => {
    it("should return a user by id", async () => {
      const result = await userService.getUserById('1');
      expect(result).toEqual(users[0]);
    });

    it("should return undefined for a non-existing user", async () => {
      const result = await userService.getUserById('999');
      expect(result).toBeUndefined();
    });
  });

  describe("createUser", () => {
    it("should create a new user", async () => {
      const newUser = { name: 'Ana Costa', email: 'ana@example.com', age: 28 };
      const result = await userService.createUser(newUser);
      expect(result).toHaveProperty('id');
      expect(result.name).toBe(newUser.name);
      expect(result.email).toBe(newUser.email);
      expect(result.age).toBe(newUser.age);
    });
  });

  describe("updateUser", () => {
    it("should update an existing user", async () => {
      const updatedUser = { name: 'João Silva Updated', age: 31 };
      const result = await userService.updateUser('1', updatedUser);
      expect(result.name).toBe(updatedUser.name);
      expect(result.age).toBe(updatedUser.age);
    });

    it("should return null for a non-existing user", async () => {
      const result = await userService.updateUser('999', { name: 'Non Existent' });
      expect(result).toBeNull();
    });
  });

  describe("deleteUser", () => {
    it("should delete an existing user", async () => {
      const result = await userService.deleteUser('1');
      expect(result).toBe(true);
      const usersAfterDelete = await userService.getAllUsers();
      expect(usersAfterDelete).toHaveLength(2);
    });

    it("should return false for a non-existing user", async () => {
      const result = await userService.deleteUser('999');
      expect(result).toBe(false);
    });
  });
});