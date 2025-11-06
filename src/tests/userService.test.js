import { getAllUsers, getUserById, createUser, updateUser, deleteUser } from '../services/userService';

describe('UserService', () => {
  beforeEach(() => {
    // Reset users array before each test
    users = [
      { id: '1', name: 'João Silva', email: 'joao@example.com', age: 30 },
      { id: '2', name: 'Maria Santos', email: 'maria@example.com', age: 25 },
      { id: '3', name: 'Pedro Oliveira', email: 'pedro@example.com', age: 35 }
    ];
  });

  it('should return all users', async () => {
    const result = await getAllUsers();
    expect(result).toHaveLength(3);
    expect(result).toEqual(users);
  });

  it('should return user by id', async () => {
    const result = await getUserById('1');
    expect(result).toEqual(users[0]);
  });

  it('should create a new user', async () => {
    const newUserData = { name: 'Ana Costa', email: 'ana@example.com', age: 28 };
    const result = await createUser(newUserData);
    expect(result).toMatchObject(newUserData);
    expect(result.id).toBe('4');
  });

  it('should update an existing user', async () => {
    const updatedData = { name: 'João Silva Updated', age: 31 };
    const result = await updateUser('1', updatedData);
    expect(result).toMatchObject({ ...users[0], ...updatedData });
  });

  it('should return null when updating a non-existing user', async () => {
    const result = await updateUser('999', { name: 'Non-existent User' });
    expect(result).toBeNull();
  });

  it('should delete an existing user', async () => {
    const result = await deleteUser('1');
    expect(result).toBe(true);
    expect(await getUserById('1')).toBeUndefined();
  });

  it('should return false when deleting a non-existing user', async () => {
    const result = await deleteUser('999');
    expect(result).toBe(false);
  });
});