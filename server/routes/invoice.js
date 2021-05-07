const express = require('express');
import { authJwt, authParams }  from '../middlewares/auth';

const router = express.Router();

const {
  getAllInvoices, getInvoice, addInvoice,
} = require('../controllers/invoice');

router.get('/', [authParams.verifyIdParam, authJwt.verifyToken, authJwt.isEmployeeOrAdmin, getAllInvoices]);
router.get('/:id', [authParams.verifyIdParam, authJwt.verifyToken, authJwt.isEmployeeOrAdmin, getInvoice]);
router.post('/', addInvoice);

module.exports = router;