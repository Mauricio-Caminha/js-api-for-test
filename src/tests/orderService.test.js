import { getAllOrders, getOrderById, createOrder, updateOrder, deleteOrder } from '../services/orderService';

describe('Order Service', () => {
  beforeEach(() => {
    // Reset orders before each test
    orders = [
      { id: '1', userId: '1', items: [{ productId: '1', quantity: 2, price: 3500 }], total: 7000, status: 'pending', createdAt: new Date().toISOString() },
      { id: '2', userId: '2', items: [{ productId: '2', quantity: 1, price: 150 }], total: 150, status: 'completed', createdAt: new Date().toISOString() },
      { id: '3', userId: '1', items: [{ productId: '3', quantity: 1, price: 450 }], total: 450, status: 'processing', createdAt: new Date().toISOString() }
    ];
  });

  it('should return all orders', async () => {
    const orders = await getAllOrders();
    expect(orders).toHaveLength(3);
  });

  it('should return order by id', async () => {
    const order = await getOrderById('1');
    expect(order).toEqual(expect.objectContaining({ id: '1' }));
  });

  it('should create a new order', async () => {
    const newOrderData = { userId: '3', items: [{ productId: '4', quantity: 1, price: 100 }], total: 100 };
    const newOrder = await createOrder(newOrderData);
    expect(newOrder).toHaveProperty('id', '4');
    expect(newOrder).toHaveProperty('userId', '3');
  });

  it('should update an existing order', async () => {
    const updatedData = { status: 'completed' };
    const updatedOrder = await updateOrder('1', updatedData);
    expect(updatedOrder).toHaveProperty('status', 'completed');
  });

  it('should return null when updating a non-existing order', async () => {
    const updatedOrder = await updateOrder('999', { status: 'completed' });
    expect(updatedOrder).toBeNull();
  });

  it('should delete an existing order', async () => {
    const result = await deleteOrder('1');
    expect(result).toBe(true);
    const order = await getOrderById('1');
    expect(order).toBeUndefined();
  });

  it('should return false when deleting a non-existing order', async () => {
    const result = await deleteOrder('999');
    expect(result).toBe(false);
  });
});