const { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct } = require("../../services/productService");

describe("ProductService", () => {
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
      const result = await getAllProducts();
      expect(result).toEqual(products);
    });
  });

  describe("getProductById", () => {
    it("should return product when id exists", async () => {
      const result = await getProductById('1');
      expect(result).toEqual(products[0]);
    });

    it("should return undefined when id does not exist", async () => {
      const result = await getProductById('999');
      expect(result).toBeUndefined();
    });
  });

  describe("createProduct", () => {
    it("should create a new product", async () => {
      const newProductData = { name: 'Monitor', description: 'Monitor LG 24"', price: 1200, stock: 15, category: 'Electronics' };
      const result = await createProduct(newProductData);
      expect(result).toHaveProperty('id');
      expect(result.name).toBe(newProductData.name);
      expect(products.length).toBe(4);
    });
  });

  describe("updateProduct", () => {
    it("should update an existing product", async () => {
      const updatedData = { name: 'Notebook Updated', price: 3000 };
      const result = await updateProduct('1', updatedData);
      expect(result).toEqual(expect.objectContaining(updatedData));
      expect(result.id).toBe('1');
    });

    it("should return null when product id does not exist", async () => {
      const result = await updateProduct('999', { name: 'Nonexistent Product' });
      expect(result).toBeNull();
    });
  });

  describe("deleteProduct", () => {
    it("should delete an existing product", async () => {
      const result = await deleteProduct('1');
      expect(result).toBe(true);
      expect(products.length).toBe(2);
    });

    it("should return false when product id does not exist", async () => {
      const result = await deleteProduct('999');
      expect(result).toBe(false);
    });
  });
});