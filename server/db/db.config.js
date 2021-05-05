import sequelize from './index';
import Brand from '../models/Brand';
import CardType from '../models/CardType';
import Cart from '../models/Cart';
import CartItem from '../models/CartItem';
import FavouriteProduct from '../models/FavouriteProduct';
import Invoice from '../models/Invoice';
import Product from '../models/Product';
import Role from '../models/Role';
import User from '../models/User';


// Defining associations between Sequelize Models,
// may remove some or add 'many-to-many' associations later
Brand.hasMany(Product, { foreignKey: 'brand_id' });
Product.belongsTo(Brand, { foreignKey: 'brand_id' });
Product.hasMany(CartItem, { foreignKey: 'product_id' });
Role.hasMany(User, { foreignKey: 'role_id' });
User.belongsTo(Role, { foreignKey: 'role_id' });
User.hasMany(Cart, { foreignKey: 'user_id' });
Cart.belongsTo(User, { foreignKey: 'user_id' });
Cart.hasMany(CartItem, { foreignKey: 'cart_id' });
CardType.hasMany(Invoice, { foreignKey: 'card_type_id' });
Invoice.belongsTo(CardType, { foreignKey: 'card_type_id' });
Invoice.hasMany(CartItem, { foreignKey: 'invoice_id' });
CartItem.belongsTo(Cart, { foreignKey: 'cart_id' });
CartItem.belongsTo(Product, { foreignKey: 'product_id' });
FavouriteProduct.belongsTo(User, { foreignKey: 'user_id' });
FavouriteProduct.belongsTo(Product, { foreignKey: 'product_id' });

const dbConfig = {
    Sequelize: sequelize,
    Brand: Brand,
    Product: Product,
    Role: Role,
    User: User,
    Cart: Cart,
    Invoice: Invoice,
    CartItem: CartItem,
    CardType: CardType,
    FavouriteProduct: FavouriteProduct,
  };

export default dbConfig;

