import {
  authJwt,
  authParams,
} from '../../middlewares/auth';

const express = require('express');

const router = express.Router();

const {
  getAllFavourites,
  getFavourite,
  addFavourite,
  deleteFavourite,
} = require('../../controllers/favourite');

/**
 * @swagger
 * /api/favourites:
 *   get:
 *     description: Use to request all favourite products
 *     tags:
 *       - favourites
 *     responses:
 *       '200':
 *         description: A successful response, returned all favourite products
 *       '500':
 *         description: Internal server error
 *   post:
 *     description: Use to add favourite product
 *     tags:
 *       - favourites
 *     responses:
 *       '201':
 *         description: Created, added new favourite product
 *       '500':
 *         description: Internal server error
 * /api/favourites/:id:
 *   get:
 *     description: Use to request favourite product
 *     tags:
 *       - favourites
 *     responses:
 *       '200':
 *         description: A successful response, returned favourite product
 *       '500':
 *         description: Internal server error
 *   delete:
 *     description: Use to delete favourite product
 *     tags:
 *       - favourites
 *     responses:
 *       '204':
 *         description: No content, deleted favourite product
 *       '500':
 *         description: Internal server error
 */

router.get('/', [authJwt.verifyToken, getAllFavourites]);
router.get('/:id', [authParams.verifyIdParam, authJwt.verifyToken, getFavourite]);
router.post('/', [authJwt.verifyToken, addFavourite]);
router.delete('/:id', [authParams.verifyIdParam, authJwt.verifyToken, deleteFavourite]);

module.exports = router;
