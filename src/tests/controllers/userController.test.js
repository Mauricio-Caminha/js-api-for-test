const { describe, it, expect, beforeEach } = require('@jest/globals');
const userService = require('../../services/userService');
const { getAllUsers, getUserById, createUser, updateUser, deleteUser } = require('../../controllers/userController');

jest.mock('../../services/userService');

describe('UserController', () => {
  let req, res, next;

  beforeEach(() => {
    req = {
      params: {},
      body: {},
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
  });

  describe('getAllUsers', () => {
    it('should return all users', async () => {
      const mockUsers = [{ id: '1', name: 'John Doe' }];
      userService.getAllUsers.mockResolvedValue(mockUsers);

      await getAllUsers(req, res, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockUsers);
    });

    it('should call next with error on failure', async () => {
      const mockError = new Error('Service error');
      userService.getAllUsers.mockRejectedValue(mockError);

      await getAllUsers(req, res, next);

      expect(next).toHaveBeenCalledWith(mockError);
    });
  });

  describe('getUserById', () => {
    it('should return user when id exists', async () => {
      req.params.id = '1';
      const mockUser = { id: '1', name: 'John Doe' };
      userService.getUserById.mockResolvedValue(mockUser);

      await getUserById(req, res, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockUser);
    });

    it('should return 404 when user not found', async () => {
      req.params.id = '999';
      userService.getUserById.mockResolvedValue(null);

      await getUserById(req, res, next);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'User not found' });
    });

    it('should call next with error on failure', async () => {
      req.params.id = '1';
      const mockError = new Error('Service error');
      userService.getUserById.mockRejectedValue(mockError);

      await getUserById(req, res, next);

      expect(next).toHaveBeenCalledWith(mockError);
    });
  });

  describe('createUser', () => {
    it('should create a new user', async () => {
      req.body = { name: 'Jane Doe' };
      const mockNewUser = { id: '2', name: 'Jane Doe' };
      userService.createUser.mockResolvedValue(mockNewUser);

      await createUser(req, res, next);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(mockNewUser);
    });

    it('should call next with error on failure', async () => {
      req.body = { name: 'Jane Doe' };
      const mockError = new Error('Service error');
      userService.createUser.mockRejectedValue(mockError);

      await createUser(req, res, next);

      expect(next).toHaveBeenCalledWith(mockError);
    });
  });

  describe('updateUser', () => {
    it('should update user when id exists', async () => {
      req.params.id = '1';
      req.body = { name: 'John Updated' };
      const mockUpdatedUser = { id: '1', name: 'John Updated' };
      userService.updateUser.mockResolvedValue(mockUpdatedUser);

      await updateUser(req, res, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockUpdatedUser);
    });

    it('should return 404 when user not found', async () => {
      req.params.id = '999';
      req.body = { name: 'John Updated' };
      userService.updateUser.mockResolvedValue(null);

      await updateUser(req, res, next);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'User not found' });
    });

    it('should call next with error on failure', async () => {
      req.params.id = '1';
      req.body = { name: 'John Updated' };
      const mockError = new Error('Service error');
      userService.updateUser.mockRejectedValue(mockError);

      await updateUser(req, res, next);

      expect(next).toHaveBeenCalledWith(mockError);
    });
  });

  describe('deleteUser', () => {
    it('should delete user when id exists', async () => {
      req.params.id = '1';
      userService.deleteUser.mockResolvedValue(true);

      await deleteUser(req, res, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: 'User deleted successfully' });
    });

    it('should return 404 when user not found', async () => {
      req.params.id = '999';
      userService.deleteUser.mockResolvedValue(false);

      await deleteUser(req, res, next);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'User not found' });
    });

    it('should call next with error on failure', async () => {
      req.params.id = '1';
      const mockError = new Error('Service error');
      userService.deleteUser.mockRejectedValue(mockError);

      await deleteUser(req, res, next);

      expect(next).toHaveBeenCalledWith(mockError);
    });
  });
});