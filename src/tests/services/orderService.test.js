const { getAllOrders, getOrderById, createOrder, updateOrder, deleteOrder } = require("../../services/orderService");

describe("OrderService", () => {
  beforeEach(() => {
    // Reset orders to initial state before each test
    orders = [
      { 
        id: '1', 
        userId: '1', 
        items: [{ productId: '1', quantity: 2, price: 3500 }], 
        total: 7000, 
        status: 'pending',
        createdAt: new Date().toISOString()
      },
      { 
        id: '2', 
        userId: '2', 
        items: [{ productId: '2', quantity: 1, price: 150 }], 
        total: 150, 
        status: 'completed',
        createdAt: new Date().toISOString()
      },
      { 
        id: '3', 
        userId: '1', 
        items: [{ productId: '3', quantity: 1, price: 450 }], 
        total: 450, 
        status: 'processing',
        createdAt: new Date().toISOString()
      }
    ];
  });

  describe("getAllOrders", () => {
    it("should return all orders", async () => {
      const result = await getAllOrders();
      expect(result).toHaveLength(3);
    });
  });

  describe("getOrderById", () => {
    it("should return order when id exists", async () => {
      const result = await getOrderById("1");
      expect(result).toEqual(orders[0]);
    });

    it("should return null when id does not exist", async () => {
      const result = await getOrderById("999");
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
      expect(result).toHaveProperty("id", "4");
      expect(result.userId).toBe(newOrderData.userId);
      expect(orders).toHaveLength(4);
    });
  });

  describe("updateOrder", () => {
    it("should update an existing order", async () => {
      const updatedData = { status: 'completed' };
      const result = await updateOrder("1", updatedData);
      expect(result).toHaveProperty("status", "completed");
    });

    it("should return null when order does not exist", async () => {
      const result = await updateOrder("999", { status: 'completed' });
      expect(result).toBeNull();
    });
  });

  describe("deleteOrder", () => {
    it("should delete an existing order", async () => {
      const result = await deleteOrder("1");
      expect(result).toBe(true);
      expect(orders).toHaveLength(2);
    });

    it("should return false when order does not exist", async () => {
      const result = await deleteOrder("999");
      expect(result).toBe(false);
    });
  });
});