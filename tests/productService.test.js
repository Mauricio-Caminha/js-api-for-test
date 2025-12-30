const { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct } = require("../src/services/productService");

describe("Product Service", () => {
  beforeEach(() => {
    // Reset the in-memory database before each test
    products = [
      { id: '1', name: 'Notebook', description: 'Notebook Dell Inspiron', price: 3500, stock: 10, category: 'Electronics' },
      { id: '2', name: 'Mouse', description: 'Mouse Logitech Wireless', price: 150, stock: 50, category: 'Electronics' },
      { id: '3', name: 'Teclado', description: 'Teclado Mecânico RGB', price: 450, stock: 25, category: 'Electronics' }
    ];
  });

  it("should get all products", async () => {
    const products = await getAllProducts();
    expect(products).toHaveLength(3);
  });

  it("should get a product by id", async () => {
    const product = await getProductById('1');
    expect(product).toEqual({ id: '1', name: 'Notebook', description: 'Notebook Dell Inspiron', price: 3500, stock: 10, category: 'Electronics' });
  });

  it("should create a new product", async () => {
    const newProductData = { name: 'Monitor', description: 'Monitor 24"', price: 1200, stock: 15, category: 'Electronics' };
    const newProduct = await createProduct(newProductData);
    expect(newProduct).toHaveProperty('id');
    expect(newProduct.name).toBe('Monitor');
    expect(newProduct).toHaveProperty('description', 'Monitor 24"');
  });

  it("should update an existing product", async () => {
    const updatedProductData = { name: 'Notebook Pro', price: 4000 };
    const updatedProduct = await updateProduct('1', updatedProductData);
    expect(updatedProduct).toEqual(expect.objectContaining(updatedProductData));
    expect(updatedProduct).toHaveProperty('id', '1');
  });

  it("should return null when updating a non-existing product", async () => {
    const updatedProduct = await updateProduct('999', { name: 'Non-existing Product' });
    expect(updatedProduct).toBeNull();
  });

  it("should delete a product", async () => {
    const result = await deleteProduct('1');
    expect(result).toBe(true);
    const products = await getAllProducts();
    expect(products).toHaveLength(2);
  });

  it("should return false when deleting a non-existing product", async () => {
    const result = await deleteProduct('999');
    expect(result).toBe(false);
  });
});