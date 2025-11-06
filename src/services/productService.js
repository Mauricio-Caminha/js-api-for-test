// Simulação de banco de dados em memória
let products = [
  { id: '1', name: 'Notebook', description: 'Notebook Dell Inspiron', price: 3500, stock: 10, category: 'Electronics' },
  { id: '2', name: 'Mouse', description: 'Mouse Logitech Wireless', price: 150, stock: 50, category: 'Electronics' },
  { id: '3', name: 'Teclado', description: 'Teclado Mecânico RGB', price: 450, stock: 25, category: 'Electronics' }
];

const getAllProducts = async () => {
  return products;
};

const getProductById = async (id) => {
  return products.find(product => product.id === id);
};

const createProduct = async (productData) => {
  const newProduct = {
    id: String(products.length + 1),
    name: productData.name,
    description: productData.description,
    price: productData.price,
    stock: productData.stock,
    category: productData.category
  };
  
  products.push(newProduct);
  return newProduct;
};

const updateProduct = async (id, productData) => {
  const productIndex = products.findIndex(product => product.id === id);
  
  if (productIndex === -1) {
    return null;
  }
  
  products[productIndex] = {
    ...products[productIndex],
    ...productData,
    id: products[productIndex].id // Preserva o ID
  };
  
  return products[productIndex];
};

const deleteProduct = async (id) => {
  const productIndex = products.findIndex(product => product.id === id);
  
  if (productIndex === -1) {
    return false;
  }
  
  products.splice(productIndex, 1);
  return true;
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
};

