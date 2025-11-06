const carService = require('../services/carService');

const getAllCars = async (req, res, next) => {
  try {
    const cars = await carService.getAllCars();
    res.status(200).json(cars);
  } catch (error) {
    next(error);
  }
};

const getCarById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const car = await carService.getCarById(id);
    
    if (!car) {
      return res.status(404).json({ error: 'Car not found' });
    }
    
    res.status(200).json(car);
  } catch (error) {
    next(error);
  }
};

const createCar = async (req, res, next) => {
  try {
    const carData = req.body;
    const newCar = await carService.createCar(carData);
    res.status(201).json(newCar);
  } catch (error) {
    next(error);
  }
};

const updateCar = async (req, res, next) => {
  try {
    const { id } = req.params;
    const carData = req.body;
    const updatedCar = await carService.updateCar(id, carData);
    
    if (!updatedCar) {
      return res.status(404).json({ error: 'Car not found' });
    }
    
    res.status(200).json(updatedCar);
  } catch (error) {
    next(error);
  }
};

const deleteCar = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleted = await carService.deleteCar(id);
    
    if (!deleted) {
      return res.status(404).json({ error: 'Car not found' });
    }
    
    res.status(200).json({ message: 'Car deleted successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllCars,
  getCarById,
  createCar,
  updateCar,
  deleteCar
};

