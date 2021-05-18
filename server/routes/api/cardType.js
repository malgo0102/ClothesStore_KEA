import {
  authJwt,
  authParams,
} from '../../middlewares/auth';

const express = require('express');

const router = express.Router();

const {
  getAllCardTypes,
  getCardType,
  updateCardType,
  addCardType,
  deleteCardType,
} = require('../../controllers/cardType');

/**
 * @swagger
 * /api/cards:
 *   get:
 *     description: Use to request all card types
 *     responses:
 *       '200':
 *         description: A successful response, returned all card types
 *       '500':
 *         description: Internal server error
 *   post:
 *     description: Use to add card type
 *     responses:
 *       '200':
 *         description: A successful response, added card type
 *       '500':
 *         description: Internal server error
 * /api/cards/:id:
 *   get:
 *     description: Use to request card type
 *     responses:
 *       '200':
 *         description: A successful response, returned card type
 *       '500':
 *         description: Internal server error
 *   put:
 *     description: Use to update card type
 *     responses:
 *       '200':
 *         description: A successful response, updated card type
 *       '500':
 *         description: Internal server error
 *   delete:
 *     description: Use to delete card type
 *     responses:
 *       '200':
 *         description: A successful response, deleted card type
 *       '500':
 *         description: Internal server error
 */
router.get('/', getAllCardTypes);
router.get('/:id', [authParams.verifyIdParam, getCardType]);
router.post('/', [authJwt.verifyToken, authJwt.isAdmin, addCardType]);
router.put('/:id', [authParams.verifyIdParam, authJwt.verifyToken, authJwt.isAdmin, updateCardType]);
router.delete('/:id', [authParams.verifyIdParam, authJwt.verifyToken, authJwt.isAdmin, deleteCardType]);

module.exports = router;
