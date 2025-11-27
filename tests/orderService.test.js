const { describe, it, expect, beforeEach, afterEach } = require("@jest/globals");
const { getAllOrders, getOrderById, createOrder, updateOrder, deleteOrder } = require("../services/orderService");

let orders;

beforeEach(() => {
  orders = [
    { 
      id: '1', 
      userId: '1', 
      items: [{ productId: '1', quantity: 2, price: 3500 }], 
      total: 7000, 
      status: 'pending',
      createdAt: "2025-11-07T18:18:08.792Z"
    },
    { 
      id: '2', 
      userId: '2', 
      items: [{ productId: '2', quantity: 1, price: 150 }], 
      total: 150, 
      status: 'completed',
      createdAt: "2025-11-07T18:18:08.792Z"
    },
    { 
      id: '3', 
      userId: '1', 
      items: [{ productId: '3', quantity: 1, price: 450 }], 
      total: 450, 
      status: 'processing',
      createdAt: "2025-11-07T18:18:08.792Z"
    }
  ];
});

afterEach(() => {
  orders = [];
});

describe("Order Service", () => {
  describe("getAllOrders", () => {
    it("should return all orders", async () => {
      const result = await getAllOrders();
      expect(result).toHaveLength(3);
    });
  });

  describe("getOrderById", () => {
    it("should return the order with the given id", async () => {
      const result = await getOrderById('1');
      expect(result).toEqual(orders[0]);
    });

    it("should return null for a non-existing order", async () => {
      const result = await getOrderById('999');
      expect(result).toBeUndefined();
    });
  });

  describe("createOrder", () => {
    it("should create a new order", async () => {
      const newOrderData = {
        userId: '3',
        items: [{ productId: '4', quantity: 1, price: 100 }],
        total: 100,
        status: 'pending'
      };
      const result = await createOrder(newOrderData);
      expect(result).toHaveProperty('id');
      expect(result.userId).toBe('3');
      expect(result.items).toEqual(newOrderData.items);
      expect(result.total).toBe(100);
      expect(result.status).toBe('pending');
    });
  });

  describe("updateOrder", () => {
    it("should update an existing order", async () => {
      const updatedData = { status: 'completed' };
      const result = await updateOrder('1', updatedData);
      expect(result.status).toBe('completed');
    });

    it("should return null for a non-existing order", async () => {
      const result = await updateOrder('999', { status: 'completed' });
      expect(result).toBeNull();
    });
  });

  describe("deleteOrder", () => {
    it("should delete an existing order", async () => {
      const result = await deleteOrder('1');
      expect(result).toBe(true);
      const ordersAfterDelete = await getAllOrders();
      expect(ordersAfterDelete).toHaveLength(2);
    });

    it("should return false for a non-existing order", async () => {
      const result = await deleteOrder('999');
      expect(result).toBe(false);
    });
  });
});