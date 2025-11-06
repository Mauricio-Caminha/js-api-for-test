const { getAllCars, getCarById, createCar, updateCar, deleteCar } = require("../../services/carService");

describe("CarService", () => {
  beforeEach(() => {
    // Clear the cars array before each test
    cars = [
      { id: '1', brand: 'Toyota', model: 'Corolla', year: 2020, color: 'White', price: 85000 },
      { id: '2', brand: 'Honda', model: 'Civic', year: 2021, color: 'Black', price: 92000 },
      { id: '3', brand: 'Ford', model: 'Focus', year: 2019, color: 'Red', price: 75000 }
    ];
  });

  describe("getAllCars", () => {
    it("should return all cars", async () => {
      const result = await getAllCars();
      expect(result).toEqual(cars);
    });
  });

  describe("getCarById", () => {
    it("should return car when id exists", async () => {
      const result = await getCarById('1');
      expect(result).toEqual(cars[0]);
    });

    it("should return undefined when id does not exist", async () => {
      const result = await getCarById('999');
      expect(result).toBeUndefined();
    });
  });

  describe("createCar", () => {
    it("should create a new car", async () => {
      const newCarData = { brand: 'Chevrolet', model: 'Malibu', year: 2022, color: 'Blue', price: 95000 };
      const result = await createCar(newCarData);
      expect(result).toHaveProperty('id');
      expect(result).toMatchObject(newCarData);
    });

    it("should increment the car count", async () => {
      const initialCount = cars.length;
      await createCar({ brand: 'Nissan', model: 'Altima', year: 2022, color: 'Gray', price: 88000 });
      const result = await getAllCars();
      expect(result.length).toBe(initialCount + 1);
    });
  });

  describe("updateCar", () => {
    it("should update car details when id exists", async () => {
      const updatedData = { brand: 'Toyota', model: 'Camry', year: 2021, color: 'White', price: 90000 };
      const result = await updateCar('1', updatedData);
      expect(result).toMatchObject({ ...cars[0], ...updatedData });
    });

    it("should return null when id does not exist", async () => {
      const result = await updateCar('999', { brand: 'Toyota' });
      expect(result).toBeNull();
    });
  });

  describe("deleteCar", () => {
    it("should delete car when id exists", async () => {
      const result = await deleteCar('1');
      expect(result).toBe(true);
      expect(await getCarById('1')).toBeUndefined();
    });

    it("should return false when id does not exist", async () => {
      const result = await deleteCar('999');
      expect(result).toBe(false);
    });
  });
});