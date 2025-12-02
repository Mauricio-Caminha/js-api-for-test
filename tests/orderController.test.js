const request = require('supertest');
const express = require('express');
const orderController = require('../../src/controllers/orderController');
const orderService = require('../../src/services/orderService');

const app = express();
app.use(express.json());
app.use('/orders', orderController);

jest.mock('../../src/services/orderService');

describe('Order Controller', () => {
  describe('GET /orders', () => {
    it('should return all orders', async () => {
      const mockOrders = [{ id: 1, item: 'Product 1' }, { id: 2, item: 'Product 2' }];
      orderService.getAllOrders.mockResolvedValue(mockOrders);

      const response = await request(app).get('/orders');
      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockOrders);
    });

    it('should handle errors', async () => {
      orderService.getAllOrders.mockRejectedValue(new Error('Database error'));

      const response = await request(app).get('/orders');
      expect(response.status).toBe(500);
    });
  });

  describe('GET /orders/:id', () => {
    it('should return an order by id', async () => {
      const mockOrder = { id: 1, item: 'Product 1' };
      orderService.getOrderById.mockResolvedValue(mockOrder);

      const response = await request(app).get('/orders/1');
      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockOrder);
    });

    it('should return 404 if order not found', async () => {
      orderService.getOrderById.mockResolvedValue(null);

      const response = await request(app).get('/orders/999');
      expect(response.status).toBe(404);
      expect(response.body).toEqual({ error: 'Order not found' });
    });

    it('should handle errors', async () => {
      orderService.getOrderById.mockRejectedValue(new Error('Database error'));

      const response = await request(app).get('/orders/1');
      expect(response.status).toBe(500);
    });
  });

  describe('POST /orders', () => {
    it('should create a new order', async () => {
      const newOrderData = { item: 'Product 1' };
      const mockNewOrder = { id: 1, ...newOrderData };
      orderService.createOrder.mockResolvedValue(mockNewOrder);

      const response = await request(app).post('/orders').send(newOrderData);
      expect(response.status).toBe(201);
      expect(response.body).toEqual(mockNewOrder);
    });

    it('should handle errors', async () => {
      orderService.createOrder.mockRejectedValue(new Error('Database error'));

      const response = await request(app).post('/orders').send({});
      expect(response.status).toBe(500);
    });
  });

  describe('PUT /orders/:id', () => {
    it('should update an existing order', async () => {
      const updatedOrderData = { item: 'Updated Product' };
      const mockUpdatedOrder = { id: 1, ...updatedOrderData };
      orderService.updateOrder.mockResolvedValue(mockUpdatedOrder);

      const response = await request(app).put('/orders/1').send(updatedOrderData);
      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockUpdatedOrder);
    });

    it('should return 404 if order not found', async () => {
      orderService.updateOrder.mockResolvedValue(null);

      const response = await request(app).put('/orders/999').send({});
      expect(response.status).toBe(404);
      expect(response.body).toEqual({ error: 'Order not found' });
    });

    it('should handle errors', async () => {
      orderService.updateOrder.mockRejectedValue(new Error('Database error'));

      const response = await request(app).put('/orders/1').send({});
      expect(response.status).toBe(500);
    });
  });

  describe('DELETE /orders/:id', () => {
    it('should delete an existing order', async () => {
      orderService.deleteOrder.mockResolvedValue(true);

      const response = await request(app).delete('/orders/1');
      expect(response.status).toBe(200);
      expect(response.body).toEqual({ message: 'Order deleted successfully' });
    });

    it('should return 404 if order not found', async () => {
      orderService.deleteOrder.mockResolvedValue(false);

      const response = await request(app).delete('/orders/999');
      expect(response.status).toBe(404);
      expect(response.body).toEqual({ error: 'Order not found' });
    });

    it('should handle errors', async () => {
      orderService.deleteOrder.mockRejectedValue(new Error('Database error'));

      const response = await request(app).delete('/orders/1');
      expect(response.status).toBe(500);
    });
  });
});