// Simulação de banco de dados em memória
let orders = [
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

const getAllOrders = async () => {
  return orders;
};

const getOrderById = async (id) => {
  return orders.find(order => order.id === id);
};

const createOrder = async (orderData) => {
  const newOrder = {
    id: String(orders.length + 1),
    userId: orderData.userId,
    items: orderData.items || [],
    total: orderData.total || 0,
    status: orderData.status || 'pending',
    createdAt: new Date().toISOString()
  };
  
  orders.push(newOrder);
  return newOrder;
};

const updateOrder = async (id, orderData) => {
  const orderIndex = orders.findIndex(order => order.id === id);
  
  if (orderIndex === -1) {
    return null;
  }
  
  orders[orderIndex] = {
    ...orders[orderIndex],
    ...orderData,
    id: orders[orderIndex].id, // Preserva o ID
    createdAt: orders[orderIndex].createdAt // Preserva a data de criação
  };
  
  return orders[orderIndex];
};

const deleteOrder = async (id) => {
  const orderIndex = orders.findIndex(order => order.id === id);
  
  if (orderIndex === -1) {
    return false;
  }
  
  orders.splice(orderIndex, 1);
  return true;
};

module.exports = {
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder
};

