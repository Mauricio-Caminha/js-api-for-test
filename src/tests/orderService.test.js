import { getAllOrders, getOrderById, createOrder, updateOrder, deleteOrder } from '../services/orderService';

describe('Order Service', () => {
  beforeEach(() => {
    // Reset orders before each test
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

  it('should retrieve all orders', async () => {
    const orders = await getAllOrders();
    expect(orders.length).toBe(3);
  });

  it('should retrieve an order by ID', async () => {
    const order = await getOrderById('1');
    expect(order).toEqual(expect.objectContaining({ id: '1' }));
  });

  it('should create a new order', async () => {
    const newOrderData = {
      userId: '3',
      items: [{ productId: '4', quantity: 1, price: 200 }],
      total: 200,
      status: 'pending'
    };
    const newOrder = await createOrder(newOrderData);
    expect(newOrder).toEqual(expect.objectContaining({ userId: '3', total: 200 }));
    expect(orders.length).toBe(4);
  });

  it('should update an existing order', async () => {
    const updatedData = { status: 'completed' };
    const updatedOrder = await updateOrder('1', updatedData);
    expect(updatedOrder).toEqual(expect.objectContaining({ id: '1', status: 'completed' }));
  });

  it('should return null when updating a non-existing order', async () => {
    const updatedOrder = await updateOrder('999', { status: 'completed' });
    expect(updatedOrder).toBeNull();
  });

  it('should delete an existing order', async () => {
    const result = await deleteOrder('1');
    expect(result).toBe(true);
    expect(orders.length).toBe(2);
  });

  it('should return false when deleting a non-existing order', async () => {
    const result = await deleteOrder('999');
    expect(result).toBe(false);
  });
});