const { describe, it, expect, beforeEach } = require("@jest/globals");
const {
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder
} = require("../../../src/services/orderService");

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

describe("Order Service", () => {
  it("should get all orders", async () => {
    const result = await getAllOrders();
    expect(result).toEqual(orders);
  });

  it("should get order by id", async () => {
    const result = await getOrderById('1');
    expect(result).toEqual(orders[0]);
  });

  it("should create a new order", async () => {
    const newOrderData = {
      userId: '3',
      items: [{ productId: '4', quantity: 1, price: 100 }],
      total: 100,
      status: 'pending'
    };
    const result = await createOrder(newOrderData);
    expect(result).toHaveProperty('id');
    expect(result.userId).toBe(newOrderData.userId);
    expect(result.items).toEqual(newOrderData.items);
    expect(result.total).toBe(newOrderData.total);
    expect(result.status).toBe(newOrderData.status);
  });

  it("should update an existing order", async () => {
    const updatedData = { status: 'completed' };
    const result = await updateOrder('1', updatedData);
    expect(result.status).toBe('completed');
    expect(result.id).toBe('1');
  });

  it("should return null when updating a non-existent order", async () => {
    const result = await updateOrder('999', { status: 'completed' });
    expect(result).toBeNull();
  });

  it("should delete an existing order", async () => {
    const result = await deleteOrder('1');
    expect(result).toBe(true);
    const ordersAfterDelete = await getAllOrders();
    expect(ordersAfterDelete).toHaveLength(2);
  });

  it("should return false when deleting a non-existent order", async () => {
    const result = await deleteOrder('999');
    expect(result).toBe(false);
  });
});