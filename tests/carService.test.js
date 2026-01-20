const { getAllCars, getCarById, createCar, updateCar, deleteCar } = require("../src/services/carService");

describe("Car Service", () => {
  beforeEach(() => {
    // Reset the in-memory database before each test
    cars = [
      { id: '1', brand: 'Toyota', model: 'Corolla', year: 2020, color: 'White', price: 85000 },
      { id: '2', brand: 'Honda', model: 'Civic', year: 2021, color: 'Black', price: 92000 },
      { id: '3', brand: 'Ford', model: 'Focus', year: 2019, color: 'Red', price: 75000 }
    ];
  });

  it("should get all cars", async () => {
    const result = await getAllCars();
    expect(result).toEqual(cars);
  });

  it("should get a car by id", async () => {
    const result = await getCarById('1');
    expect(result).toEqual(cars[0]);
  });
});
