// Simulação de banco de dados em memória
let cars = [
  { id: '1', brand: 'Toyota', model: 'Corolla', year: 2020, color: 'White', price: 85000 },
  { id: '2', brand: 'Honda', model: 'Civic', year: 2021, color: 'Black', price: 92000 },
  { id: '3', brand: 'Ford', model: 'Focus', year: 2019, color: 'Red', price: 75000 }
];

const getAllCars = async () => {
  return cars;
};

const getCarById = async (id) => {
  return cars.find(car => car.id === id);
};

const createCar = async (carData) => {
  const newCar = {
    id: String(cars.length + 1),
    brand: carData.brand,
    model: carData.model,
    year: carData.year,
    color: carData.color,
    price: carData.price
  };
  
  cars.push(newCar);
  return newCar;
};

const updateCar = async (id, carData) => {
  const carIndex = cars.findIndex(car => car.id === id);
  
  if (carIndex === -1) {
    return null;
  }
  
  cars[carIndex] = {
    ...cars[carIndex],
    ...carData,
    id: cars[carIndex].id // Preserva o ID
  };
  
  return cars[carIndex];
};

const deleteCar = async (id) => {
  const carIndex = cars.findIndex(car => car.id === id);
  
  if (carIndex === -1) {
    return false;
  }
  
  cars.splice(carIndex, 1);
  return true;
};

module.exports = {
  getAllCars,
  getCarById,
  createCar,
  updateCar,
  deleteCar
};

