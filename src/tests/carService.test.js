import { getAllCars, getCarById, createCar, updateCar, deleteCar } from '../services/carService';

describe('Car Service', () => {
  beforeEach(() => {
    // Reset the cars array before each test
    cars = [
      { id: '1', brand: 'Toyota', model: 'Corolla', year: 2020, color: 'White', price: 85000 },
      { id: '2', brand: 'Honda', model: 'Civic', year: 2021, color: 'Black', price: 92000 },
      { id: '3', brand: 'Ford', model: 'Focus', year: 2019, color: 'Red', price: 75000 }
    ];
  });

  test('should return all cars', async () => {
    const result = await getAllCars();
    expect(result).toEqual(cars);
  });

  test('should return a car by ID', async () => {
    const result = await getCarById('1');
    expect(result).toEqual(cars[0]);
  });

  test('should return null when car not found by ID', async () => {
    const result = await getCarById('999');
    expect(result).toBeUndefined();
  });

  test('should create a new car', async () => {
    const newCarData = { brand: 'Nissan', model: 'Altima', year: 2022, color: 'Blue', price: 95000 };
    const result = await createCar(newCarData);
    expect(result).toHaveProperty('id');
    expect(result.brand).toBe(newCarData.brand);
    expect(cars).toHaveLength(4);
  });

  test('should update an existing car', async () => {
    const updatedData = { color: 'Green', price: 80000 };
    const result = await updateCar('1', updatedData);
    expect(result).toEqual({ id: '1', brand: 'Toyota', model: 'Corolla', year: 2020, color: 'Green', price: 80000 });
  });

  test('should return null when updating a non-existing car', async () => {
    const result = await updateCar('999', { color: 'Green' });
    expect(result).toBeNull();
  });

  test('should delete an existing car', async () => {
    const result = await deleteCar('1');
    expect(result).toBe(true);
    expect(cars).toHaveLength(2);
  });

  test('should return false when deleting a non-existing car', async () => {
    const result = await deleteCar('999');
    expect(result).toBe(false);
  });
});