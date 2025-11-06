const { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct } = require('../services/productService');

describe('Product Service', () => {
  beforeEach(() => {
    // Reset the products array before each test
    products = [
      { id: '1', name: 'Notebook', description: 'Notebook Dell Inspiron', price: 3500, stock: 10, category: 'Electronics' },
      { id: '2', name: 'Mouse', description: 'Mouse Logitech Wireless', price: 150, stock: 50, category: 'Electronics' },
      { id: '3', name: 'Teclado', description: 'Teclado Mecânico RGB', price: 450, stock: 25, category: 'Electronics' }
    ];
  });

  it('should return all products', async () => {
    const products = await getAllProducts();
    expect(products).toHaveLength(3);
  });

  it('should return a product by id', async () => {
    const product = await getProductById('1');
    expect(product).toEqual({ id: '1', name: 'Notebook', description: 'Notebook Dell Inspiron', price: 3500, stock: 10, category: 'Electronics' });
  });

  it('should create a new product', async () => {
    const newProductData = { name: 'Headphones', description: 'Headphones Sony', price: 300, stock: 20, category: 'Electronics' };
    const newProduct = await createProduct(newProductData);
    expect(newProduct).toHaveProperty('id');
    expect(newProduct.name).toBe('Headphones');
    expect(newProduct).toHaveProperty('description', 'Headphones Sony');
  });

  it('should update an existing product', async () => {
    const updatedData = { name: 'Updated Mouse', price: 200 };
    const updatedProduct = await updateProduct('2', updatedData);
    expect(updatedProduct).toEqual(expect.objectContaining(updatedData));
  });

  it('should return null when updating a non-existent product', async () => {
    const updatedProduct = await updateProduct('999', { name: 'Non-existent Product' });
    expect(updatedProduct).toBeNull();
  });

  it('should delete an existing product', async () => {
    const result = await deleteProduct('1');
    expect(result).toBe(true);
    const products = await getAllProducts();
    expect(products).toHaveLength(2);
  });

  it('should return false when deleting a non-existent product', async () => {
    const result = await deleteProduct('999');
    expect(result).toBe(false);
  });
});