const { describe, it, expect, beforeEach, jest } = require("@jest/globals");
const { getAllUsers, getUserById, createUser, updateUser, deleteUser } = require("../../src/services/userService");

describe("User Service", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should get all users", async () => {
    const users = await getAllUsers();
    expect(users).toHaveLength(3);
    expect(users).toEqual(expect.arrayContaining([
      expect.objectContaining({ id: '1', name: 'João Silva' }),
      expect.objectContaining({ id: '2', name: 'Maria Santos' }),
      expect.objectContaining({ id: '3', name: 'Pedro Oliveira' }),
    ]));
  });

  it("should get user by id", async () => {
    const user = await getUserById('1');
    expect(user).toEqual(expect.objectContaining({ id: '1', name: 'João Silva' }));
    
    const nonExistentUser = await getUserById('999');
    expect(nonExistentUser).toBeUndefined();
  });

  it("should create a new user", async () => {
    const newUser = { name: 'Ana Costa', email: 'ana@example.com', age: 28 };
    const createdUser = await createUser(newUser);
    
    expect(createdUser).toEqual(expect.objectContaining({ id: '4', name: 'Ana Costa' }));
    const users = await getAllUsers();
    expect(users).toHaveLength(4);
  });

  it("should update an existing user", async () => {
    const updatedUser = await updateUser('1', { name: 'João Silva Updated' });
    expect(updatedUser).toEqual(expect.objectContaining({ id: '1', name: 'João Silva Updated' }));

    const nonExistentUpdate = await updateUser('999', { name: 'Non Existent' });
    expect(nonExistentUpdate).toBeNull();
  });

  it("should delete an existing user", async () => {
    const deleteResult = await deleteUser('1');
    expect(deleteResult).toBe(true);
    
    const users = await getAllUsers();
    expect(users).toHaveLength(2);

    const nonExistentDelete = await deleteUser('999');
    expect(nonExistentDelete).toBe(false);
  });
});