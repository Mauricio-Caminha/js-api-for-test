const { describe, it, expect, beforeEach } = require("@jest/globals");
const { getAllUsers, getUserById, createUser, updateUser, deleteUser } = require("../src/services/userService");

describe("User Service", () => {
  let users;

  beforeEach(() => {
    users = [
      { id: '1', name: 'João Silva', email: 'joao@example.com', age: 30 },
      { id: '2', name: 'Maria Santos', email: 'maria@example.com', age: 25 },
      { id: '3', name: 'Pedro Oliveira', email: 'pedro@example.com', age: 35 }
    ];
  });

  it("should get all users", async () => {
    const result = await getAllUsers();
    expect(result).toEqual(users);
  });

  it("should get user by id", async () => {
    const result = await getUserById('1');
    expect(result).toEqual(users[0]);
  });

  it("should return undefined for non-existing user", async () => {
    const result = await getUserById('999');
    expect(result).toBeUndefined();
  });

  it("should create a new user", async () => {
    const newUser = { name: 'Ana Costa', email: 'ana@example.com', age: 28 };
    const result = await createUser(newUser);
    expect(result).toEqual({ id: '4', ...newUser });
    const allUsers = await getAllUsers();
    expect(allUsers).toHaveLength(4);
  });

  it("should update an existing user", async () => {
    const updatedData = { name: 'João Silva Updated', age: 31 };
    const result = await updateUser('1', updatedData);
    expect(result).toEqual({ id: '1', name: 'João Silva Updated', email: 'joao@example.com', age: 31 });
  });

  it("should return null when updating a non-existing user", async () => {
    const result = await updateUser('999', { name: 'Non-existing User' });
    expect(result).toBeNull();
  });

  it("should delete an existing user", async () => {
    const result = await deleteUser('1');
    expect(result).toBe(true);
    const allUsers = await getAllUsers();
    expect(allUsers).toHaveLength(2);
  });

  it("should return false when deleting a non-existing user", async () => {
    const result = await deleteUser('999');
    expect(result).toBe(false);
  });
});