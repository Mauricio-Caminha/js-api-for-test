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
    const result = await getAllProducts();
    expect(result).toEqual(products);
  });

  it("should get a product by id", async () => {
    const result = await getProductById('1');
    expect(result).toEqual(products[0]);
  });

  it("should return undefined for a non-existing product", async () => {
    const result = await getProductById('999');
    expect(result).toBeUndefined();
  });

  it("should create a new product", async () => {
    const newProductData = { name: 'Headphones', description: 'Headphones Bluetooth', price: 300, stock: 20, category: 'Electronics' };
    const result = await createProduct(newProductData);
    expect(result).toEqual({ id: '4', ...newProductData });
    expect(await getAllProducts()).toHaveLength(4);
  });

  it("should update an existing product", async () => {
    const updatedData = { name: 'Updated Notebook', price: 4000 };
    const result = await updateProduct('1', updatedData);
    expect(result).toEqual({ id: '1', name: 'Updated Notebook', description: 'Notebook Dell Inspiron', price: 4000, stock: 10, category: 'Electronics' });
  });

  it("should return null for updating a non-existing product", async () => {
    const result = await updateProduct('999', { name: 'Non-existing Product' });
    expect(result).toBeNull();
  });

  it("should delete an existing product", async () => {
    const result = await deleteProduct('1');
    expect(result).toBe(true);
    expect(await getAllProducts()).toHaveLength(2);
  });

  it("should return false for deleting a non-existing product", async () => {
    const result = await deleteProduct('999');
    expect(result).toBe(false);
  });
});