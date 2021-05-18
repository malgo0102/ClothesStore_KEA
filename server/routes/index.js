const express = require('express');

const router = express.Router();

const brandsRoutes = require('./brand.js');
const cardTypesRoutes = require('./cardType.js');
const cartItemsRoutes = require('./cartItem.js');
const favouritesRoutes = require('./favourite.js');
const invoicesRoutes = require('./invoice.js');
const productRoutes = require('./product.js');
const rolesRoutes = require('./role.js');
const userRoutes = require('./user.js');

router.use('/brands', brandsRoutes);
router.use('/cards', cardTypesRoutes);
router.use('/cartItems', cartItemsRoutes);
router.use('/favourites', favouritesRoutes);
router.use('/invoices', invoicesRoutes);
router.use('/products', productRoutes);
router.use('/roles', rolesRoutes);
router.use('/users', userRoutes);

module.exports = router;
