const { describe, it, expect, beforeEach } = require('@jest/globals');
const { getAllCars, getCarById, createCar, updateCar, deleteCar } = require('../../services/carService');

describe('CarService', () => {
  beforeEach(() => {
    // Reset the cars array before each test
    cars = [
      { id: '1', brand: 'Toyota', model: 'Corolla', year: 2020, color: 'White', price: 85000 },
      { id: '2', brand: 'Honda', model: 'Civic', year: 2021, color: 'Black', price: 92000 },
      { id: '3', brand: 'Ford', model: 'Focus', year: 2019, color: 'Red', price: 75000 }
    ];
  });

  describe('getAllCars', () => {
    it('should return all cars', async () => {
      const result = await getAllCars();
      expect(result).toEqual(cars);
    });
  });

  describe('getCarById', () => {
    it('should return car when id exists', async () => {
      const result = await getCarById('1');
      expect(result).toEqual(cars[0]);
    });

    it('should return null when id does not exist', async () => {
      const result = await getCarById('999');
      expect(result).toBeUndefined();
    });
  });

  describe('createCar', () => {
    it('should create a new car and return it', async () => {
      const newCarData = { brand: 'Chevrolet', model: 'Malibu', year: 2022, color: 'Blue', price: 95000 };
      const result = await createCar(newCarData);
      expect(result).toEqual(expect.objectContaining(newCarData));
      expect(result.id).toBe('4');
    });
  });

  describe('updateCar', () => {
    it('should update car when id exists', async () => {
      const updatedData = { color: 'Green', price: 80000 };
      const result = await updateCar('1', updatedData);
      expect(result).toEqual(expect.objectContaining(updatedData));
      expect(result.id).toBe('1');
    });

    it('should return null when id does not exist', async () => {
      const result = await updateCar('999', { color: 'Yellow' });
      expect(result).toBeNull();
    });
  });

  describe('deleteCar', () => {
    it('should return true when car is deleted', async () => {
      const result = await deleteCar('1');
      expect(result).toBe(true);
    });

    it('should return false when car does not exist', async () => {
      const result = await deleteCar('999');
      expect(result).toBe(false);
    });
  });
});