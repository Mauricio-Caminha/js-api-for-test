const { describe, it, expect } = require("@jest/globals");
const userService = require("../services/userService");

describe("UserService", () => {
  describe("getAllUsers", () => {
    it("should return all users", async () => {
      const users = await userService.getAllUsers();
      expect(users).toHaveLength(3);
      expect(users).toEqual(expect.arrayContaining([
        expect.objectContaining({ id: '1', name: 'João Silva' }),
        expect.objectContaining({ id: '2', name: 'Maria Santos' }),
        expect.objectContaining({ id: '3', name: 'Pedro Oliveira' }),
      ]));
    });
  });

  describe("getUserById", () => {
    it("should return a user by id", async () => {
      const user = await userService.getUserById('1');
      expect(user).toEqual(expect.objectContaining({ id: '1', name: 'João Silva' }));
    });

    it("should return null for a non-existing user", async () => {
      const user = await userService.getUserById('999');
      expect(user).toBeUndefined();
    });
  });

  describe("createUser", () => {
    it("should create a new user", async () => {
      const newUser = { name: 'Ana Costa', email: 'ana@example.com', age: 28 };
      const createdUser = await userService.createUser(newUser);
      expect(createdUser).toEqual(expect.objectContaining({ id: '4', name: 'Ana Costa' }));
    });
  });

  describe("updateUser", () => {
    it("should update an existing user", async () => {
      const updatedUser = await userService.updateUser('1', { age: 31 });
      expect(updatedUser).toEqual(expect.objectContaining({ id: '1', age: 31 }));
    });

    it("should return null for a non-existing user", async () => {
      const updatedUser = await userService.updateUser('999', { age: 31 });
      expect(updatedUser).toBeNull();
    });
  });

  describe("deleteUser", () => {
    it("should delete an existing user", async () => {
      const result = await userService.deleteUser('1');
      expect(result).toBe(true);
      const user = await userService.getUserById('1');
      expect(user).toBeUndefined();
    });

    it("should return false for a non-existing user", async () => {
      const result = await userService.deleteUser('999');
      expect(result).toBe(false);
    });
  });
});