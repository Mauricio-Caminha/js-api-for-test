const { describe, it, expect, beforeEach } = require("@jest/globals");
const { getAllCars, getCarById, createCar, updateCar, deleteCar } = require("../services/carService");

describe("Car Service", () => {
  beforeEach(() => {
    // Reset the in-memory database before each test
    cars = [
      { id: '1', brand: 'Toyota', model: 'Corolla', year: 2020, color: 'White', price: 85000 },
      { id: '2', brand: 'Honda', model: 'Civic', year: 2021, color: 'Black', price: 92000 },
      { id: '3', brand: 'Ford', model: 'Focus', year: 2019, color: 'Red', price: 75000 }
    ];
  });

  describe("getAllCars", () => {
    it("should return all cars", async () => {
      const cars = await getAllCars();
      expect(cars).toHaveLength(3);
    });
  });

  describe("getCarById", () => {
    it("should return a car by id", async () => {
      const car = await getCarById('1');
      expect(car).toEqual({ id: '1', brand: 'Toyota', model: 'Corolla', year: 2020, color: 'White', price: 85000 });
    });

    it("should return null for a non-existing car", async () => {
      const car = await getCarById('999');
      expect(car).toBeUndefined();
    });
  });

  describe("createCar", () => {
    it("should create a new car", async () => {
      const newCar = await createCar({ brand: 'Nissan', model: 'Altima', year: 2022, color: 'Blue', price: 95000 });
      expect(newCar).toHaveProperty('id');
      expect(newCar.brand).toBe('Nissan');
      expect(newCar).toHaveProperty('model', 'Altima');
      expect(newCar).toHaveProperty('year', 2022);
      expect(newCar).toHaveProperty('color', 'Blue');
      expect(newCar).toHaveProperty('price', 95000);
    });
  });

  describe("updateCar", () => {
    it("should update an existing car", async () => {
      const updatedCar = await updateCar('1', { color: 'Blue' });
      expect(updatedCar).toEqual({ id: '1', brand: 'Toyota', model: 'Corolla', year: 2020, color: 'Blue', price: 85000 });
    });

    it("should return null for a non-existing car", async () => {
      const updatedCar = await updateCar('999', { color: 'Blue' });
      expect(updatedCar).toBeNull();
    });
  });

  describe("deleteCar", () => {
    it("should delete an existing car", async () => {
      const result = await deleteCar('1');
      expect(result).toBe(true);
      const car = await getCarById('1');
      expect(car).toBeUndefined();
    });

    it("should return false for a non-existing car", async () => {
      const result = await deleteCar('999');
      expect(result).toBe(false);
    });
  });
});