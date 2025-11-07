const { describe, it, expect, beforeEach } = require('@jest/globals');
const orderController = require('../../controllers/orderController');
const orderService = require('../../services/orderService');

jest.mock('../../services/orderService');

describe('OrderController', () => {
  let req, res, next;

  beforeEach(() => {
    req = { params: {}, body: {} };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
  });

  describe('getAllOrders', () => {
    it('should return all orders', async () => {
      const mockOrders = [{ id: '1', item: 'Product A' }];
      orderService.getAllOrders.mockResolvedValue(mockOrders);

      await orderController.getAllOrders(req, res, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockOrders);
    });

    it('should call next with error on failure', async () => {
      const mockError = new Error('Service error');
      orderService.getAllOrders.mockRejectedValue(mockError);

      await orderController.getAllOrders(req, res, next);

      expect(next).toHaveBeenCalledWith(mockError);
    });
  });

  describe('getOrderById', () => {
    it('should return order by id', async () => {
      req.params.id = '1';
      const mockOrder = { id: '1', item: 'Product A' };
      orderService.getOrderById.mockResolvedValue(mockOrder);

      await orderController.getOrderById(req, res, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockOrder);
    });

    it('should return 404 if order not found', async () => {
      req.params.id = '999';
      orderService.getOrderById.mockResolvedValue(null);

      await orderController.getOrderById(req, res, next);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'Order not found' });
    });

    it('should call next with error on failure', async () => {
      req.params.id = '1';
      const mockError = new Error('Service error');
      orderService.getOrderById.mockRejectedValue(mockError);

      await orderController.getOrderById(req, res, next);

      expect(next).toHaveBeenCalledWith(mockError);
    });
  });

  describe('createOrder', () => {
    it('should create a new order', async () => {
      const orderData = { item: 'Product A' };
      req.body = orderData;
      const mockNewOrder = { id: '1', ...orderData };
      orderService.createOrder.mockResolvedValue(mockNewOrder);

      await orderController.createOrder(req, res, next);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(mockNewOrder);
    });

    it('should call next with error on failure', async () => {
      const mockError = new Error('Service error');
      req.body = { item: 'Product A' };
      orderService.createOrder.mockRejectedValue(mockError);

      await orderController.createOrder(req, res, next);

      expect(next).toHaveBeenCalledWith(mockError);
    });
  });

  describe('updateOrder', () => {
    it('should update an existing order', async () => {
      req.params.id = '1';
      req.body = { item: 'Updated Product A' };
      const mockUpdatedOrder = { id: '1', item: 'Updated Product A' };
      orderService.updateOrder.mockResolvedValue(mockUpdatedOrder);

      await orderController.updateOrder(req, res, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockUpdatedOrder);
    });

    it('should return 404 if order not found', async () => {
      req.params.id = '999';
      req.body = { item: 'Updated Product A' };
      orderService.updateOrder.mockResolvedValue(null);

      await orderController.updateOrder(req, res, next);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'Order not found' });
    });

    it('should call next with error on failure', async () => {
      req.params.id = '1';
      req.body = { item: 'Updated Product A' };
      const mockError = new Error('Service error');
      orderService.updateOrder.mockRejectedValue(mockError);

      await orderController.updateOrder(req, res, next);

      expect(next).toHaveBeenCalledWith(mockError);
    });
  });

  describe('deleteOrder', () => {
    it('should delete an existing order', async () => {
      req.params.id = '1';
      orderService.deleteOrder.mockResolvedValue(true);

      await orderController.deleteOrder(req, res, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: 'Order deleted successfully' });
    });

    it('should return 404 if order not found', async () => {
      req.params.id = '999';
      orderService.deleteOrder.mockResolvedValue(false);

      await orderController.deleteOrder(req, res, next);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'Order not found' });
    });

    it('should call next with error on failure', async () => {
      req.params.id = '1';
      const mockError = new Error('Service error');
      orderService.deleteOrder.mockRejectedValue(mockError);

      await orderController.deleteOrder(req, res, next);

      expect(next).toHaveBeenCalledWith(mockError);
    });
  });
});