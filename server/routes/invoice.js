import {
  authJwt,
  authParams,
} from '../middlewares/auth';

const express = require('express');

const router = express.Router();

const {
  getAllInvoices,
  getInvoice,
  addInvoice,
} = require('../controllers/invoice');

router.get('/', [authParams.verifyIdParam, authJwt.verifyToken, authJwt.isEmployeeOrAdmin, getAllInvoices]);
router.get('/:id', [authParams.verifyIdParam, authJwt.verifyToken, authJwt.isEmployeeOrAdmin, getInvoice]);
router.post('/', addInvoice);

module.exports = router;
