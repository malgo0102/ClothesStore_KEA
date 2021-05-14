const express = require('express');

const router = express.Router();

const userRoutes = require('./user.js');
const productRoutes = require('./product.js');
const brandsRoutes = require('./brand.js');
const rolesRoutes = require('./role.js');
const cardTypesRoutes = require('./cardType.js');
const cartItemsRoutes = require('./cartItem.js');
const invoicesRoutes = require('./invoice.js');
const favouritesRoutes = require('./favourite.js');

router.use('/users', userRoutes);
router.use('/products', productRoutes);
router.use('/brands', brandsRoutes);
router.use('/roles', rolesRoutes);
router.use('/cards', cardTypesRoutes);
router.use('/cartItems', cartItemsRoutes);
router.use('/invoices', invoicesRoutes);
router.use('/favourites', favouritesRoutes);

module.exports = router;
