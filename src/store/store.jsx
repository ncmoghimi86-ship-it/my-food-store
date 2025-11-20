import { configureStore } from '@reduxjs/toolkit'
import mealsReducer from '../features/mealsSlice'
import cartReducer from '../features/cartSlice'
import authoReducer from '../features/authoSlice' 
import orderReducer from '../features/orderSlice' 

export const store = configureStore({
  reducer: {
    meals: mealsReducer,
    cart: cartReducer,
    autho: authoReducer,
    order: orderReducer, 
  },
})

export default store