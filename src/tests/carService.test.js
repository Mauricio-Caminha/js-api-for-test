const { describe, it, expect } = require("@jest/globals");
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
      expect(cars).toEqual(expect.arrayContaining([
        expect.objectContaining({ brand: 'Toyota' }),
        expect.objectContaining({ brand: 'Honda' }),
        expect.objectContaining({ brand: 'Ford' }),
      ]));
    });
  });

  describe("getCarById", () => {
    it("should return the car with the given id", async () => {
      const car = await getCarById('1');
      expect(car).toEqual(expect.objectContaining({ id: '1', brand: 'Toyota' }));
    });

    it("should return undefined for a non-existing car", async () => {
      const car = await getCarById('999');
      expect(car).toBeUndefined();
    });
  });

  describe("createCar", () => {
    it("should create a new car and return it", async () => {
      const newCarData = { brand: 'Nissan', model: 'Altima', year: 2022, color: 'Blue', price: 95000 };
      const newCar = await createCar(newCarData);
      expect(newCar).toEqual(expect.objectContaining({ id: '4', ...newCarData }));
      expect(await getAllCars()).toHaveLength(4);
    });
  });

  describe("updateCar", () => {
    it("should update the car with the given id", async () => {
      const updatedData = { color: 'Green', price: 80000 };
      const updatedCar = await updateCar('1', updatedData);
      expect(updatedCar).toEqual(expect.objectContaining({ id: '1', color: 'Green', price: 80000 }));
    });

    it("should return null for a non-existing car", async () => {
      const updatedCar = await updateCar('999', { color: 'Blue' });
      expect(updatedCar).toBeNull();
    });
  });

  describe("deleteCar", () => {
    it("should delete the car with the given id", async () => {
      const result = await deleteCar('1');
      expect(result).toBe(true);
      expect(await getAllCars()).toHaveLength(2);
    });

    it("should return false for a non-existing car", async () => {
      const result = await deleteCar('999');
      expect(result).toBe(false);
    });
  });
});