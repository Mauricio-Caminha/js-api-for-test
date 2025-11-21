const { describe, it, expect, beforeEach } = require("@jest/globals");
const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
} = require("../services/productService");

describe("Product Service", () => {
  let initialProducts;

  beforeEach(() => {
    initialProducts = [
      { id: '1', name: 'Notebook', description: 'Notebook Dell Inspiron', price: 3500, stock: 10, category: 'Electronics' },
      { id: '2', name: 'Mouse', description: 'Mouse Logitech Wireless', price: 150, stock: 50, category: 'Electronics' },
      { id: '3', name: 'Teclado', description: 'Teclado Mecânico RGB', price: 450, stock: 25, category: 'Electronics' }
    ];
  });

  it("should return all products", async () => {
    const products = await getAllProducts();
    expect(products).toEqual(initialProducts);
  });

  it("should return a product by id", async () => {
    const product = await getProductById('1');
    expect(product).toEqual(initialProducts[0]);
  });

  it("should create a new product", async () => {
    const newProductData = {
      name: 'Monitor',
      description: 'Monitor 24 inch',
      price: 1200,
      stock: 15,
      category: 'Electronics'
    };
    const newProduct = await createProduct(newProductData);
    expect(newProduct).toEqual({
      id: '4',
      ...newProductData
    });
    const products = await getAllProducts();
    expect(products).toHaveLength(4);
  });

  it("should update an existing product", async () => {
    const updatedData = {
      name: 'Updated Notebook',
      price: 4000
    };
    const updatedProduct = await updateProduct('1', updatedData);
    expect(updatedProduct).toEqual({
      id: '1',
      name: 'Updated Notebook',
      description: 'Notebook Dell Inspiron',
      price: 4000,
      stock: 10,
      category: 'Electronics'
    });
  });

  it("should return null when updating a non-existent product", async () => {
    const updatedProduct = await updateProduct('999', { name: 'Non-existent' });
    expect(updatedProduct).toBeNull();
  });

  it("should delete a product", async () => {
    const result = await deleteProduct('1');
    expect(result).toBe(true);
    const products = await getAllProducts();
    expect(products).toHaveLength(2);
  });

  it("should return false when deleting a non-existent product", async () => {
    const result = await deleteProduct('999');
    expect(result).toBe(false);
  });
});