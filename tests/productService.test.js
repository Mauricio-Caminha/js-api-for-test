const { describe, it, expect } = require("@jest/globals");
const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
} = require("../services/productService");

describe("Product Service", () => {
  beforeEach(() => {
    // Reset the products array before each test
    products = [
      { id: '1', name: 'Notebook', description: 'Notebook Dell Inspiron', price: 3500, stock: 10, category: 'Electronics' },
      { id: '2', name: 'Mouse', description: 'Mouse Logitech Wireless', price: 150, stock: 50, category: 'Electronics' },
      { id: '3', name: 'Teclado', description: 'Teclado Mecânico RGB', price: 450, stock: 25, category: 'Electronics' }
    ];
  });

  describe("getAllProducts", () => {
    it("should return all products", async () => {
      const products = await getAllProducts();
      expect(products).toHaveLength(3);
    });
  });

  describe("getProductById", () => {
    it("should return a product by id", async () => {
      const product = await getProductById('1');
      expect(product).toEqual({ id: '1', name: 'Notebook', description: 'Notebook Dell Inspiron', price: 3500, stock: 10, category: 'Electronics' });
    });

    it("should return undefined for a non-existing product", async () => {
      const product = await getProductById('999');
      expect(product).toBeUndefined();
    });
  });

  describe("createProduct", () => {
    it("should create a new product", async () => {
      const newProductData = { name: 'Monitor', description: 'Monitor 24"', price: 1200, stock: 15, category: 'Electronics' };
      const newProduct = await createProduct(newProductData);
      expect(newProduct).toHaveProperty('id');
      expect(newProduct.name).toBe('Monitor');
      expect(newProduct).toHaveProperty('description', 'Monitor 24"');
    });
  });

  describe("updateProduct", () => {
    it("should update an existing product", async () => {
      const updatedProductData = { name: 'Updated Notebook', price: 4000 };
      const updatedProduct = await updateProduct('1', updatedProductData);
      expect(updatedProduct).toEqual(expect.objectContaining(updatedProductData));
    });

    it("should return null for a non-existing product", async () => {
      const updatedProduct = await updateProduct('999', { name: 'Non-existing' });
      expect(updatedProduct).toBeNull();
    });
  });

  describe("deleteProduct", () => {
    it("should delete an existing product", async () => {
      const result = await deleteProduct('1');
      expect(result).toBe(true);
      const product = await getProductById('1');
      expect(product).toBeUndefined();
    });

    it("should return false for a non-existing product", async () => {
      const result = await deleteProduct('999');
      expect(result).toBe(false);
    });
  });
});