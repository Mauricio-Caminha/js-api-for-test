const request = require('supertest');
const express = require('express');
const carController = require('../../src/controllers/carController');
const carService = require('../../src/services/carService');

const app = express();
app.use(express.json());
app.use('/cars', carController);

jest.mock('../../src/services/carService');

describe('Car Controller', () => {
  describe('GET /cars', () => {
    it('should return all cars', async () => {
      const mockCars = [{ id: 1, model: 'Toyota' }, { id: 2, model: 'Honda' }];
      carService.getAllCars.mockResolvedValue(mockCars);

      const response = await request(app).get('/cars');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockCars);
    });

    it('should handle errors', async () => {
      carService.getAllCars.mockRejectedValue(new Error('Error fetching cars'));

      const response = await request(app).get('/cars');

      expect(response.status).toBe(500);
    });
  });

  describe('GET /cars/:id', () => {
    it('should return a car by id', async () => {
      const mockCar = { id: 1, model: 'Toyota' };
      carService.getCarById.mockResolvedValue(mockCar);

      const response = await request(app).get('/cars/1');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockCar);
    });

    it('should return 404 if car not found', async () => {
      carService.getCarById.mockResolvedValue(null);

      const response = await request(app).get('/cars/999');

      expect(response.status).toBe(404);
      expect(response.body).toEqual({ error: 'Car not found' });
    });

    it('should handle errors', async () => {
      carService.getCarById.mockRejectedValue(new Error('Error fetching car'));

      const response = await request(app).get('/cars/1');

      expect(response.status).toBe(500);
    });
  });

  describe('POST /cars', () => {
    it('should create a new car', async () => {
      const newCarData = { model: 'Toyota' };
      const mockNewCar = { id: 1, ...newCarData };
      carService.createCar.mockResolvedValue(mockNewCar);

      const response = await request(app).post('/cars').send(newCarData);

      expect(response.status).toBe(201);
      expect(response.body).toEqual(mockNewCar);
    });

    it('should handle errors', async () => {
      carService.createCar.mockRejectedValue(new Error('Error creating car'));

      const response = await request(app).post('/cars').send({ model: 'Toyota' });

      expect(response.status).toBe(500);
    });
  });

  describe('PUT /cars/:id', () => {
    it('should update a car', async () => {
      const updatedCarData = { model: 'Honda' };
      const mockUpdatedCar = { id: 1, ...updatedCarData };
      carService.updateCar.mockResolvedValue(mockUpdatedCar);

      const response = await request(app).put('/cars/1').send(updatedCarData);

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockUpdatedCar);
    });

    it('should return 404 if car not found', async () => {
      carService.updateCar.mockResolvedValue(null);

      const response = await request(app).put('/cars/999').send({ model: 'Honda' });

      expect(response.status).toBe(404);
      expect(response.body).toEqual({ error: 'Car not found' });
    });

    it('should handle errors', async () => {
      carService.updateCar.mockRejectedValue(new Error('Error updating car'));

      const response = await request(app).put('/cars/1').send({ model: 'Honda' });

      expect(response.status).toBe(500);
    });
  });

  describe('DELETE /cars/:id', () => {
    it('should delete a car', async () => {
      carService.deleteCar.mockResolvedValue(true);

      const response = await request(app).delete('/cars/1');

      expect(response.status).toBe(200);
      expect(response.body).toEqual({ message: 'Car deleted successfully' });
    });

    it('should return 404 if car not found', async () => {
      carService.deleteCar.mockResolvedValue(false);

      const response = await request(app).delete('/cars/999');

      expect(response.status).toBe(404);
      expect(response.body).toEqual({ error: 'Car not found' });
    });

    it('should handle errors', async () => {
      carService.deleteCar.mockRejectedValue(new Error('Error deleting car'));

      const response = await request(app).delete('/cars/1');

      expect(response.status).toBe(500);
    });
  });
});