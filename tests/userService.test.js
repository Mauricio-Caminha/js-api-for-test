const { describe, it, expect, beforeEach, jest } = require("@jest/globals");
const userService = require("../../src/services/userService");

describe("User Service", () => {
  let users;

  beforeEach(() => {
    jest.clearAllMocks();
    users = [
      { id: '1', name: 'João Silva', email: 'joao@example.com', age: 30 },
      { id: '2', name: 'Maria Santos', email: 'maria@example.com', age: 25 },
      { id: '3', name: 'Pedro Oliveira', email: 'pedro@example.com', age: 35 }
    ];
  });

  it("should get all users", async () => {
    const result = await userService.getAllUsers();
    expect(result).toEqual(users);
  });

  it("should get user by id", async () => {
    const result = await userService.getUserById('1');
    expect(result).toEqual(users[0]);
  });

  it("should return null for non-existing user", async () => {
    const result = await userService.getUserById('999');
    expect(result).toBeNull();
  });

  it("should create a new user", async () => {
    const newUserData = { name: 'Ana Costa', email: 'ana@example.com', age: 28 };
    const result = await userService.createUser(newUserData);
    expect(result).toEqual({
      id: '4',
      name: 'Ana Costa',
      email: 'ana@example.com',
      age: 28
    });
  });

  it("should update an existing user", async () => {
    const updatedUserData = { name: 'João Silva Updated', age: 31 };
    const result = await userService.updateUser('1', updatedUserData);
    expect(result).toEqual({
      id: '1',
      name: 'João Silva Updated',
      email: 'joao@example.com',
      age: 31
    });
  });

  it("should return null when updating non-existing user", async () => {
    const result = await userService.updateUser('999', { name: 'Non-existing' });
    expect(result).toBeNull();
  });

  it("should delete an existing user", async () => {
    const result = await userService.deleteUser('1');
    expect(result).toBe(true);
    const usersAfterDelete = await userService.getAllUsers();
    expect(usersAfterDelete).toHaveLength(2);
  });

  it("should return false when deleting non-existing user", async () => {
    const result = await userService.deleteUser('999');
    expect(result).toBe(false);
  });
});