import {
  authJwt,
  authParams,
} from '../../middlewares/auth';

const express = require('express');

const router = express.Router();

const {
  getAllInvoices,
  getInvoice,
  addInvoice,
} = require('../../controllers/invoice');

/**
 * @swagger
 * /api/invoices:
 *   get:
 *     description: Use to request all invoices
 *     tags:
 *       - invoices
 *     responses:
 *       '200':
 *         description: A successful response, returned all invoices
 *       '500':
 *         description: Internal server error
 *   post:
 *     description: Use to add invoice
 *     tags:
 *       - invoices
 *     responses:
 *       '200':
 *         description: A successful response, added invoice
 *       '500':
 *         description: Internal server error
 * /api/invoices/:id:
 *   get:
 *     description: Use to request invoice
 *     tags:
 *       - invoices
 *     responses:
 *       '200':
 *         description: A successful response, returned invoice
 *       '500':
 *         description: Internal server error
 */

router.get('/', [authJwt.verifyToken, authJwt.isEmployeeOrAdmin, getAllInvoices]);
router.get('/:id', [authParams.verifyIdParam, authJwt.verifyToken, authJwt.isEmployeeOrAdmin, getInvoice]);
router.post('/', addInvoice);

module.exports = router;
