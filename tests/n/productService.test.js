const { describe, it, expect, beforeEach } = require("@jest/globals");
const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
} = require("../../src/services/productService");

describe("Product Service", () => {
  let initialProducts;

  beforeEach(() => {
    initialProducts = [
      { id: '1', name: 'Notebook', description: 'Notebook Dell Inspiron', price: 3500, stock: 10, category: 'Electronics' },
      { id: '2', name: 'Mouse', description: 'Mouse Logitech Wireless', price: 150, stock: 50, category: 'Electronics' },
      { id: '3', name: 'Teclado', description: 'Teclado Mecânico RGB', price: 450, stock: 25, category: 'Electronics' }
    ];
  });

  describe("getAllProducts", () => {
    it("should return all products", async () => {
      const products = await getAllProducts();
      expect(products).toEqual(initialProducts);
    });
  });

  describe("getProductById", () => {
    it("should return a product by id", async () => {
      const product = await getProductById('1');
      expect(product).toEqual(initialProducts[0]);
    });

    it("should return undefined for a non-existent product", async () => {
      const product = await getProductById('999');
      expect(product).toBeUndefined();
    });
  });

  describe("createProduct", () => {
    it("should create a new product", async () => {
      const newProductData = {
        name: 'Monitor',
        description: 'Monitor 24 inch',
        price: 1200,
        stock: 15,
        category: 'Electronics'
      };

      const newProduct = await createProduct(newProductData);
      expect(newProduct).toHaveProperty('id');
      expect(newProduct.name).toBe(newProductData.name);
      expect(newProduct.description).toBe(newProductData.description);
      expect(newProduct.price).toBe(newProductData.price);
      expect(newProduct.stock).toBe(newProductData.stock);
      expect(newProduct.category).toBe(newProductData.category);
    });
  });

  describe("updateProduct", () => {
    it("should update an existing product", async () => {
      const updatedData = {
        name: 'Updated Notebook',
        price: 3000
      };

      const updatedProduct = await updateProduct('1', updatedData);
      expect(updatedProduct.name).toBe(updatedData.name);
      expect(updatedProduct.price).toBe(updatedData.price);
      expect(updatedProduct.id).toBe('1');
    });

    it("should return null for a non-existent product", async () => {
      const result = await updateProduct('999', { name: 'Non-existent' });
      expect(result).toBeNull();
    });
  });

  describe("deleteProduct", () => {
    it("should delete an existing product", async () => {
      const result = await deleteProduct('1');
      expect(result).toBe(true);
      const products = await getAllProducts();
      expect(products).toHaveLength(2);
    });

    it("should return false for a non-existent product", async () => {
      const result = await deleteProduct('999');
      expect(result).toBe(false);
    });
  });
});