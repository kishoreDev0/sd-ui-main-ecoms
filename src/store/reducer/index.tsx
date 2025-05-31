import { combineReducers } from '@reduxjs/toolkit';
import authReducer from '../slices/authentication/login';
import forgotPasswordReducer from '../slices/authentication/forgotPassword';
import changePasswordReducer from '../slices/authentication/changepassword';
import resetPasswordReducer from '../slices/authentication/resetPassword';
import inviteUserReducer from '../slices/authentication/inviteUser';
import registerReducer from '../slices/authentication/registerForm';
import productReducer from '../slices/product.slice';
import featureReducer from '../slices/feature.slice'
import categoryReducer from '../slices/category.slice';
import cartReducer from '../slices/cart.slice';
import usersReducer from '../slices/user';
import wishlistReducer from '../slices/wishlist.slice'
import orderReducer from '../slices/order.slice'

const rootReducer = combineReducers({
  auth: authReducer,
  forgotPassword: forgotPasswordReducer,
  changePassword: changePasswordReducer,
  resetPassword: resetPasswordReducer,
  inviteUser: inviteUserReducer,
  register: registerReducer,
  productSelector:productReducer,
  featureSelector:featureReducer,
  categorySelector:categoryReducer,
  cartSelector:cartReducer,
  userSelector:usersReducer,
  wishlistSelector:wishlistReducer,
  orderSelector:orderReducer
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
