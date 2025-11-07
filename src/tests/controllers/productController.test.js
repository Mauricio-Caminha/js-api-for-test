const { describe, it, expect, beforeEach } = require('@jest/globals');
const productController = require('../../controllers/productController');
const productService = require('../../services/productService');

jest.mock('../../services/productService');

describe('ProductController', () => {
  let req, res, next;

  beforeEach(() => {
    req = { params: {}, body: {} };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
  });

  describe('getAllProducts', () => {
    it('should return all products', async () => {
      const mockProducts = [{ id: '1', name: 'Product 1' }];
      productService.getAllProducts.mockResolvedValue(mockProducts);

      await productController.getAllProducts(req, res, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockProducts);
    });

    it('should call next with error on failure', async () => {
      const mockError = new Error('Service error');
      productService.getAllProducts.mockRejectedValue(mockError);

      await productController.getAllProducts(req, res, next);

      expect(next).toHaveBeenCalledWith(mockError);
    });
  });

  describe('getProductById', () => {
    it('should return product when id exists', async () => {
      req.params.id = '1';
      const mockProduct = { id: '1', name: 'Product 1' };
      productService.getProductById.mockResolvedValue(mockProduct);

      await productController.getProductById(req, res, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockProduct);
    });

    it('should return 404 when product not found', async () => {
      req.params.id = '999';
      productService.getProductById.mockResolvedValue(null);

      await productController.getProductById(req, res, next);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'Product not found' });
    });

    it('should call next with error on failure', async () => {
      req.params.id = '1';
      const mockError = new Error('Service error');
      productService.getProductById.mockRejectedValue(mockError);

      await productController.getProductById(req, res, next);

      expect(next).toHaveBeenCalledWith(mockError);
    });
  });

  describe('createProduct', () => {
    it('should create and return a new product', async () => {
      const mockProductData = { name: 'Product 1' };
      const mockNewProduct = { id: '1', ...mockProductData };
      req.body = mockProductData;
      productService.createProduct.mockResolvedValue(mockNewProduct);

      await productController.createProduct(req, res, next);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(mockNewProduct);
    });

    it('should call next with error on failure', async () => {
      const mockError = new Error('Service error');
      req.body = { name: 'Product 1' };
      productService.createProduct.mockRejectedValue(mockError);

      await productController.createProduct(req, res, next);

      expect(next).toHaveBeenCalledWith(mockError);
    });
  });

  describe('updateProduct', () => {
    it('should update and return the product when it exists', async () => {
      req.params.id = '1';
      const mockProductData = { name: 'Updated Product' };
      const mockUpdatedProduct = { id: '1', ...mockProductData };
      req.body = mockProductData;
      productService.updateProduct.mockResolvedValue(mockUpdatedProduct);

      await productController.updateProduct(req, res, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockUpdatedProduct);
    });

    it('should return 404 when product not found', async () => {
      req.params.id = '999';
      req.body = { name: 'Updated Product' };
      productService.updateProduct.mockResolvedValue(null);

      await productController.updateProduct(req, res, next);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'Product not found' });
    });

    it('should call next with error on failure', async () => {
      req.params.id = '1';
      req.body = { name: 'Updated Product' };
      const mockError = new Error('Service error');
      productService.updateProduct.mockRejectedValue(mockError);

      await productController.updateProduct(req, res, next);

      expect(next).toHaveBeenCalledWith(mockError);
    });
  });

  describe('deleteProduct', () => {
    it('should delete the product and return success message', async () => {
      req.params.id = '1';
      productService.deleteProduct.mockResolvedValue(true);

      await productController.deleteProduct(req, res, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: 'Product deleted successfully' });
    });

    it('should return 404 when product not found', async () => {
      req.params.id = '999';
      productService.deleteProduct.mockResolvedValue(false);

      await productController.deleteProduct(req, res, next);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'Product not found' });
    });

    it('should call next with error on failure', async () => {
      req.params.id = '1';
      const mockError = new Error('Service error');
      productService.deleteProduct.mockRejectedValue(mockError);

      await productController.deleteProduct(req, res, next);

      expect(next).toHaveBeenCalledWith(mockError);
    });
  });
});