const orderService = require('../services/orderService');

const getAllOrders = async (req, res, next) => {
  try {
    const orders = await orderService.getAllOrders();
    res.status(200).json(orders);
  } catch (error) {
    next(error);
  }
};

const getOrderById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const order = await orderService.getOrderById(id);
    
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    
    res.status(200).json(order);
  } catch (error) {
    next(error);
  }
};

const createOrder = async (req, res, next) => {
  try {
    const orderData = req.body;
    const newOrder = await orderService.createOrder(orderData);
    res.status(201).json(newOrder);
  } catch (error) {
    next(error);
  }
};

const updateOrder = async (req, res, next) => {
  try {
    const { id } = req.params;
    const orderData = req.body;
    const updatedOrder = await orderService.updateOrder(id, orderData);
    
    if (!updatedOrder) {
      return res.status(404).json({ error: 'Order not found' });
    }
    
    res.status(200).json(updatedOrder);
  } catch (error) {
    next(error);
  }
};

const deleteOrder = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleted = await orderService.deleteOrder(id);
    
    if (!deleted) {
      return res.status(404).json({ error: 'Order not found' });
    }
    
    res.status(200).json({ message: 'Order deleted successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder
};

