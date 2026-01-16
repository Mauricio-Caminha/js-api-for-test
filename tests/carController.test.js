const { describe, it, expect, beforeEach } = require("@jest/globals");
const carService = require("../services/carService");
const { getAllCars, getCarById, createCar, updateCar, deleteCar } = require("../src/controllers/carController");

jest.mock("../services/carService");

describe("Car Controller", () => {
  let req, res, next;

  beforeEach(() => {
    req = { params: {}, body: {} };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
    jest.clearAllMocks();
  });

  it("should get all cars", async () => {
    const cars = [{ id: 1, model: "Car A" }];
    carService.getAllCars.mockResolvedValue(cars);

    await getAllCars(req, res, next);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(cars);
  });

  it("should get a car by id", async () => {
    req.params.id = "1";
    const car = { id: 1, model: "Car A" };
    carService.getCarById.mockResolvedValue(car);

    await getCarById(req, res, next);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(car);
  });

  it("should return 404 if car not found", async () => {
    req.params.id = "1";
    carService.getCarById.mockResolvedValue(null);

    await getCarById(req, res, next);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: "Car not found" });
  });

  it("should create a new car", async () => {
    const carData = { model: "Car A" };
    req.body = carData;
    const newCar = { id: 1, model: "Car A" };
    carService.createCar.mockResolvedValue(newCar);

    await createCar(req, res, next);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(newCar);
  });

  it("should update a car", async () => {
    req.params.id = "1";
    const carData = { model: "Car A" };
    req.body = carData;
    const updatedCar = { id: 1, model: "Car A" };
    carService.updateCar.mockResolvedValue(updatedCar);

    await updateCar(req, res, next);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(updatedCar);
  });

  it("should return 404 if car not found on update", async () => {
    req.params.id = "1";
    const carData = { model: "Car A" };
    req.body = carData;
    carService.updateCar.mockResolvedValue(null);

    await updateCar(req, res, next);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: "Car not found" });
  });

  it("should delete a car", async () => {
    req.params.id = "1";
    carService.deleteCar.mockResolvedValue(true);

    await deleteCar(req, res, next);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: "Car deleted successfully" });
  });

  it("should return 404 if car not found on delete", async () => {
    req.params.id = "1";
    carService.deleteCar.mockResolvedValue(false);

    await deleteCar(req, res, next);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: "Car not found" });
  });
});