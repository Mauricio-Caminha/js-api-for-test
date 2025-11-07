const { getAllCars, getCarById, createCar, updateCar, deleteCar } = require('../../services/carService');

describe('Car Service', () => {
  beforeEach(() => {
    // Reset the cars array before each test
    cars = [
      { id: '1', brand: 'Toyota', model: 'Corolla', year: 2020, color: 'White', price: 85000 },
      { id: '2', brand: 'Honda', model: 'Civic', year: 2021, color: 'Black', price: 92000 },
      { id: '3', brand: 'Ford', model: 'Focus', year: 2019, color: 'Red', price: 75000 }
    ];
  });

  test('getAllCars should return all cars', async () => {
    const result = await getAllCars();
    expect(result).toEqual(cars);
  });

  test('getCarById should return a car by id', async () => {
    const result = await getCarById('1');
    expect(result).toEqual(cars[0]);
  });

  test('getCarById should return null for non-existent car', async () => {
    const result = await getCarById('999');
    expect(result).toBeUndefined();
  });

  test('createCar should add a new car', async () => {
    const newCarData = { brand: 'Chevrolet', model: 'Malibu', year: 2022, color: 'Blue', price: 95000 };
    const result = await createCar(newCarData);
    expect(result).toHaveProperty('id');
    expect(result).toMatchObject(newCarData);
    expect(await getAllCars()).toHaveLength(4);
  });

  test('updateCar should update an existing car', async () => {
    const updatedData = { brand: 'Toyota', model: 'Camry', year: 2021, color: 'White', price: 90000 };
    const result = await updateCar('1', updatedData);
    expect(result).toMatchObject({ id: '1', ...updatedData });
  });

  test('updateCar should return null for non-existent car', async () => {
    const result = await updateCar('999', { brand: 'Toyota' });
    expect(result).toBeNull();
  });

  test('deleteCar should remove an existing car', async () => {
    const result = await deleteCar('1');
    expect(result).toBe(true);
    expect(await getAllCars()).toHaveLength(2);
  });

  test('deleteCar should return false for non-existent car', async () => {
    const result = await deleteCar('999');
    expect(result).toBe(false);
  });
});