const { describe, it, expect, beforeEach } = require('@jest/globals');
const carController = require('../../controllers/carController');
const carService = require('../../services/carService');

jest.mock('../../services/carService');

describe('CarController', () => {
  let req, res, next;

  beforeEach(() => {
    req = { params: {}, body: {} };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
  });

  describe('getAllCars', () => {
    it('should return all cars', async () => {
      const mockCars = [{ id: '1', model: 'Toyota' }, { id: '2', model: 'Honda' }];
      carService.getAllCars.mockResolvedValue(mockCars);

      await carController.getAllCars(req, res, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockCars);
    });

    it('should call next with error on failure', async () => {
      const mockError = new Error('Database error');
      carService.getAllCars.mockRejectedValue(mockError);

      await carController.getAllCars(req, res, next);

      expect(next).toHaveBeenCalledWith(mockError);
    });
  });

  describe('getCarById', () => {
    it('should return car when id exists', async () => {
      req.params.id = '1';
      const mockCar = { id: '1', model: 'Toyota' };
      carService.getCarById.mockResolvedValue(mockCar);

      await carController.getCarById(req, res, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockCar);
    });

    it('should return 404 when car not found', async () => {
      req.params.id = '999';
      carService.getCarById.mockResolvedValue(null);

      await carController.getCarById(req, res, next);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'Car not found' });
    });

    it('should call next with error on failure', async () => {
      req.params.id = '1';
      const mockError = new Error('Database error');
      carService.getCarById.mockRejectedValue(mockError);

      await carController.getCarById(req, res, next);

      expect(next).toHaveBeenCalledWith(mockError);
    });
  });

  describe('createCar', () => {
    it('should create a new car', async () => {
      req.body = { model: 'Toyota' };
      const mockNewCar = { id: '1', model: 'Toyota' };
      carService.createCar.mockResolvedValue(mockNewCar);

      await carController.createCar(req, res, next);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(mockNewCar);
    });

    it('should call next with error on failure', async () => {
      req.body = { model: 'Toyota' };
      const mockError = new Error('Database error');
      carService.createCar.mockRejectedValue(mockError);

      await carController.createCar(req, res, next);

      expect(next).toHaveBeenCalledWith(mockError);
    });
  });

  describe('updateCar', () => {
    it('should update the car when id exists', async () => {
      req.params.id = '1';
      req.body = { model: 'Honda' };
      const mockUpdatedCar = { id: '1', model: 'Honda' };
      carService.updateCar.mockResolvedValue(mockUpdatedCar);

      await carController.updateCar(req, res, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockUpdatedCar);
    });

    it('should return 404 when car not found', async () => {
      req.params.id = '999';
      req.body = { model: 'Honda' };
      carService.updateCar.mockResolvedValue(null);

      await carController.updateCar(req, res, next);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'Car not found' });
    });

    it('should call next with error on failure', async () => {
      req.params.id = '1';
      req.body = { model: 'Honda' };
      const mockError = new Error('Database error');
      carService.updateCar.mockRejectedValue(mockError);

      await carController.updateCar(req, res, next);

      expect(next).toHaveBeenCalledWith(mockError);
    });
  });

  describe('deleteCar', () => {
    it('should delete the car when id exists', async () => {
      req.params.id = '1';
      carService.deleteCar.mockResolvedValue(true);

      await carController.deleteCar(req, res, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: 'Car deleted successfully' });
    });

    it('should return 404 when car not found', async () => {
      req.params.id = '999';
      carService.deleteCar.mockResolvedValue(false);

      await carController.deleteCar(req, res, next);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'Car not found' });
    });

    it('should call next with error on failure', async () => {
      req.params.id = '1';
      const mockError = new Error('Database error');
      carService.deleteCar.mockRejectedValue(mockError);

      await carController.deleteCar(req, res, next);

      expect(next).toHaveBeenCalledWith(mockError);
    });
  });
});