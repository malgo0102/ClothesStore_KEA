import {
  authJwt,
  authParams,
} from '../../middlewares/auth';

const express = require('express');

const router = express.Router();

const {
  getAllProducts,
  getProduct,
  updateProduct,
  addProduct,
  deleteProduct,
} = require('../../controllers/product');

/**
 * @swagger
 * /api/products:
 *   get:
 *     description: Use to request all products
 *     tags:
 *       - products
 *     responses:
 *       '200':
 *         description: A successful response, returned all products
 *       '500':
 *         description: Internal server error
 *   post:
 *     description: Use to add product
 *     tags:
 *       - products
 *     responses:
 *       '200':
 *         description: A successful response, added product
 *       '500':
 *         description: Internal server error
 * /api/products/:id:
 *   get:
 *     description: Use to request product
 *     tags:
 *       - products
 *     responses:
 *       '200':
 *         description: A successful response, returned product
 *       '500':
 *         description: Internal server error
 *   put:
 *     description: Use to update product
 *     tags:
 *       - products
 *     responses:
 *       '200':
 *         description: A successful response, updated product
 *       '500':
 *         description: Internal server error
 *   delete:
 *     description: Use to delete product
 *     tags:
 *       - products
 *     responses:
 *       '204':
 *         description: No content, deleted product
 *       '500':
 *         description: Internal server error
 */

router.get('/', getAllProducts);
router.get('/:id', [authParams.verifyIdParam, getProduct]);
router.post('/', [authJwt.verifyToken, authJwt.isEmployeeOrAdmin, addProduct]);
router.put('/:id', [authParams.verifyIdParam, authJwt.verifyToken, authJwt.isEmployeeOrAdmin, updateProduct]);
router.delete('/:id', [authParams.verifyIdParam, authJwt.verifyToken, authJwt.isAdmin, deleteProduct]);

module.exports = router;
