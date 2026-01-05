const { getAllOrders, getOrderById, createOrder, updateOrder, deleteOrder } = require("../src/services/orderService");

describe("Order Service", () => {
  beforeEach(() => {
    // Reset the in-memory database before each test
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
      items: [{ productId: '4', quantity: 1, price: 200 }],
      total: 200,
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
    expect(result).toEqual({
      id: '1',
      userId: '1',
      items: [{ productId: '1', quantity: 2, price: 3500 }],
      total: 7000,
      status: 'completed',
      createdAt: "2025-11-07T18:18:08.792Z"
    });
  });

  it("should return null when updating a non-existing order", async () => {
    const result = await updateOrder('999', { status: 'completed' });
    expect(result).toBeNull();
  });

  it("should delete an existing order", async () => {
    const result = await deleteOrder('1');
    expect(result).toBe(true);
    expect(await getOrderById('1')).toBeUndefined();
  });

  it("should return false when deleting a non-existing order", async () => {
    const result = await deleteOrder('999');
    expect(result).toBe(false);
  });
});