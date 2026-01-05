const { describe, it, expect, beforeEach } = require("@jest/globals");
const { getAllCars, getCarById, createCar, updateCar, deleteCar } = require("../src/services/carService");

describe("Car Service", () => {
  let initialCars;

  beforeEach(() => {
    initialCars = [
      { id: '1', brand: 'Toyota', model: 'Corolla', year: 2020, color: 'White', price: 85000 },
      { id: '2', brand: 'Honda', model: 'Civic', year: 2021, color: 'Black', price: 92000 },
      { id: '3', brand: 'Ford', model: 'Focus', year: 2019, color: 'Red', price: 75000 }
    ];
  });

  it("should return all cars", async () => {
    const cars = await getAllCars();
    expect(cars).toEqual(initialCars);
  });

  it("should return a car by id", async () => {
    const car = await getCarById('1');
    expect(car).toEqual(initialCars[0]);
  });

  it("should create a new car", async () => {
    const newCarData = { brand: 'Chevrolet', model: 'Onix', year: 2022, color: 'Blue', price: 78000 };
    const newCar = await createCar(newCarData);
    expect(newCar).toHaveProperty('id');
    expect(newCar).toMatchObject(newCarData);

    const cars = await getAllCars();
    expect(cars).toHaveLength(initialCars.length + 1);
  });

  it("should update an existing car", async () => {
    const updatedData = { color: 'Green', price: 80000 };
    const updatedCar = await updateCar('1', updatedData);
    expect(updatedCar).toEqual({ ...initialCars[0], ...updatedData });

    const cars = await getAllCars();
    expect(cars[0].color).toBe('Green');
  });

  it("should return null when updating a non-existing car", async () => {
    const updatedCar = await updateCar('999', { color: 'Blue' });
    expect(updatedCar).toBeNull();
  });

  it("should delete a car", async () => {
    const result = await deleteCar('1');
    expect(result).toBe(true);

    const cars = await getAllCars();
    expect(cars).toHaveLength(initialCars.length - 1);
  });

  it("should return false when deleting a non-existing car", async () => {
    const result = await deleteCar('999');
    expect(result).toBe(false);
  });
});