const { describe, it, expect, beforeEach, jest } = require("@jest/globals");
const { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct } = require("../src/services/productService");

describe("Product Service", () => {
  let products;

  beforeEach(() => {
    jest.clearAllMocks();
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

  it("should get product by id", async () => {
    const result = await getProductById('1');
    expect(result).toEqual(products[0]);
  });

  it("should return undefined for non-existing product", async () => {
    const result = await getProductById('999');
    expect(result).toBeUndefined();
  });

  it("should create a new product", async () => {
    const newProductData = { name: 'Headphones', description: 'Headphones Sony', price: 300, stock: 20, category: 'Electronics' };
    const result = await createProduct(newProductData);
    expect(result).toEqual({ id: '4', ...newProductData });
  });

  it("should update an existing product", async () => {
    const updatedData = { name: 'Updated Mouse', price: 200 };
    const result = await updateProduct('2', updatedData);
    expect(result).toEqual({ id: '2', name: 'Updated Mouse', description: 'Mouse Logitech Wireless', price: 200, stock: 50, category: 'Electronics' });
  });

  it("should return null when updating a non-existing product", async () => {
    const result = await updateProduct('999', { name: 'Non-existing' });
    expect(result).toBeNull();
  });

  it("should delete an existing product", async () => {
    const result = await deleteProduct('3');
    expect(result).toBe(true);
    const allProducts = await getAllProducts();
    expect(allProducts).toHaveLength(2);
  });

  it("should return false when deleting a non-existing product", async () => {
    const result = await deleteProduct('999');
    expect(result).toBe(false);
  });
});