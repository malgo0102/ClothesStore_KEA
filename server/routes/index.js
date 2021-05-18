const express = require('express');

const router = express.Router();

const brandsRoutes = require('./api/brand.js');
const cardTypesRoutes = require('./api/cardType.js');
const cartItemsRoutes = require('./api/cartItem.js');
const favouritesRoutes = require('./api/favourite.js');
const invoicesRoutes = require('./api/invoice.js');
const productRoutes = require('./api/product.js');
const rolesRoutes = require('./api/role.js');
const userRoutes = require('./api/user.js');

router.use('/brands', brandsRoutes);
router.use('/cards', cardTypesRoutes);
router.use('/cartItems', cartItemsRoutes);
router.use('/favourites', favouritesRoutes);
router.use('/invoices', invoicesRoutes);
router.use('/products', productRoutes);
router.use('/roles', rolesRoutes);
router.use('/users', userRoutes);

module.exports = router;
