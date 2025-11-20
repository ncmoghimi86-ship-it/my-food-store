import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  orders: [],        // لیست همه سفارش‌ها
  currentOrder: null // سفارش تازه ثبت شده (برای نمایش در داشبورد)
}

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    addOrder: (state, action) => {
      const newOrder = {
        id: Date.now(),
        date: new Date().toLocaleDateString('fa-IR'),
        time: new Date().toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' }),
        status: 'در انتظار تأیید',
        ...action.payload
      }
      state.orders.unshift(newOrder)
      state.currentOrder = newOrder
    },
    clearCurrentOrder: (state) => {
      state.currentOrder = null
    }
  }
})

export const { addOrder, clearCurrentOrder } = orderSlice.actions
export default orderSlice.reducer