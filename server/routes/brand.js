import {
  authJwt,
  authParams,
} from '../middlewares/auth';

const express = require('express');

const router = express.Router();

const {
  getAllBrands,
  getBrand,
  updateBrand,
  addBrand,
  deleteBrand,
} = require('../controllers/brand');

/**
 * @swagger
 * /api/brands:
 *   get:
 *     description: Use to request all brands
 *     responses:
 *       '200':
 *         description: A successful response, returned all brands
 *       '500':
 *         description: Internal server error
 *   post:
 *     description: Use to add brand
 *     responses:
 *       '200':
 *         description: A successful response, added brand
 *       '500':
 *         description: Internal server error
 * /api/brands/:id:
 *   get:
 *     description: Use to request brand
 *     responses:
 *       '200':
 *         description: A successful response, returned brand
 *       '500':
 *         description: Internal server error
 *   put:
 *     description: Use to update brand
 *     responses:
 *       '200':
 *         description: A successful response, updated brand
 *       '500':
 *         description: Internal server error
 *   delete:
 *     description: Use to delete brand
 *     responses:
 *       '200':
 *         description: A successful response, deleted brand
 *       '500':
 *         description: Internal server error
 */
router.get('/', getAllBrands);
router.get('/:id', [authParams.verifyIdParam, getBrand]);
router.post('/', [authJwt.verifyToken, authJwt.isEmployeeOrAdmin, addBrand]);
router.put('/:id', [authParams.verifyIdParam, authJwt.verifyToken, authJwt.isEmployeeOrAdmin, updateBrand]);
router.delete('/:id', [authParams.verifyIdParam, authJwt.verifyToken, authJwt.isAdmin, deleteBrand]);

module.exports = router;
