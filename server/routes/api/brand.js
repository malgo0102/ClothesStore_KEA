import {
  authJwt,
  authParams,
} from '../../middlewares/auth';

const express = require('express');

const router = express.Router();

const {
  getAllBrands,
  getBrand,
  updateBrand,
  addBrand,
  deleteBrand,
} = require('../../controllers/brand');

/**
 * @swagger
 * /api/brands:
 *   get:
 *     description: Use to request all brands
 *     tags:
 *       - brands
 *     responses:
 *       '200':
 *         description: A successful response, returned all brands
 *       '500':
 *         description: Internal server error
 *   post:
 *     description: Use to add brand
 *     tags:
 *       - brands
 *     responses:
 *       '201':
 *         description: Created, added new brand
 *       '500':
 *         description: Internal server error
 * /api/brands/:id:
 *   get:
 *     description: Use to request brand
 *     tags:
 *       - brands
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the brand to return
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: A successful response, returned brand
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 2
 *                 name:
 *                   type: string
 *                   example: Zara
 *                 description:
 *                   type: string
 *                   example It is Spanish
 *       '500':
 *         description: Internal server error
 *   put:
 *     description: Use to update brand
 *     tags:
 *       - brands
 *     responses:
 *       '200':
 *         description: A successful response, updated brand
 *       '500':
 *         description: Internal server error
 *   delete:
 *     description: Use to delete brand
 *     tags:
 *       - brands
 *     responses:
 *       '204':
 *         description: No content, deleted brand
 *       '500':
 *         description: Internal server error
 */
router.get('/', getAllBrands);
router.get('/:id', [authParams.verifyIdParam, getBrand]);
router.post('/', [authJwt.verifyToken, authJwt.isEmployeeOrAdmin, addBrand]);
router.put('/:id', [authParams.verifyIdParam, authJwt.verifyToken, authJwt.isEmployeeOrAdmin, updateBrand]);
router.delete('/:id', [authParams.verifyIdParam, authJwt.verifyToken, authJwt.isAdmin, deleteBrand]);

module.exports = router;
