const { describe, it, expect, beforeEach } = require("@jest/globals");
const { getAllCars, getCarById, createCar, updateCar, deleteCar } = require("../src/services/carService");

describe("Car Service", () => {
  let cars;

  beforeEach(() => {
    cars = [
      { id: '1', brand: 'Toyota', model: 'Corolla', year: 2020, color: 'White', price: 85000 },
      { id: '2', brand: 'Honda', model: 'Civic', year: 2021, color: 'Black', price: 92000 },
      { id: '3', brand: 'Ford', model: 'Focus', year: 2019, color: 'Red', price: 75000 }
    ];
  });

  it("should return all cars", async () => {
    const result = await getAllCars();
    expect(result).toEqual(cars);
  });

  it("should return a car by id", async () => {
    const result = await getCarById('1');
    expect(result).toEqual(cars[0]);
  });

  it("should create a new car", async () => {
    const newCarData = { brand: 'Chevrolet', model: 'Onix', year: 2022, color: 'Blue', price: 78000 };
    const result = await createCar(newCarData);
    expect(result).toEqual({
      id: '4',
      ...newCarData
    });
  });

  it("should update an existing car", async () => {
    const updatedData = { color: 'Green', price: 90000 };
    const result = await updateCar('1', updatedData);
    expect(result).toEqual({
      id: '1',
      brand: 'Toyota',
      model: 'Corolla',
      year: 2020,
      color: 'Green',
      price: 90000
    });
  });

  it("should return null when updating a non-existent car", async () => {
    const result = await updateCar('999', { color: 'Blue' });
    expect(result).toBeNull();
  });

  it("should delete a car", async () => {
    const result = await deleteCar('1');
    expect(result).toBe(true);
    const allCars = await getAllCars();
    expect(allCars).toHaveLength(2);
  });

  it("should return false when deleting a non-existent car", async () => {
    const result = await deleteCar('999');
    expect(result).toBe(false);
  });
});