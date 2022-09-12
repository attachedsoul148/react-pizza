import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type CartItemType = {
  id: string
  title: string
  size: number
  type: string
  price: number
  count: number
}
const initialState = {
  totalCount: 0,
  totalPrice: 0,
  cartItems: [] as CartItemType[],
}
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<CartItemType>) {
      const el = state.cartItems.find(
        (el) =>
          el.id === action.payload.id &&
          el.type === action.payload.type &&
          el.size === action.payload.size,
      )
      if (!el) {
        state.cartItems.push(action.payload)
      } else {
        el.count++
      }
      state.totalPrice = state.cartItems.reduce((sum, el) => (sum += el.price * el.count), 0)
      state.totalCount = state.cartItems.reduce((sum, el) => (sum += el.count), 0)
    },
    removeItem(state, action: PayloadAction<CartItemType>) {
      state.cartItems = state.cartItems.filter(
        (el) =>
          el.id !== action.payload.id ||
          el.type !== action.payload.type ||
          el.size !== action.payload.size,
      )
      state.totalPrice = state.cartItems.reduce((sum, el) => (sum += el.price * el.count), 0)
      state.totalCount = state.cartItems.reduce((sum, el) => (sum += el.count), 0)
    },
    clearItems(state) {
      state.cartItems = []
      state.totalPrice = 0
      state.totalCount = 0
    },
    plusCount(state, action: PayloadAction<CartItemType>) {
      const el = state.cartItems.find(
        (el) =>
          el.id === action.payload.id &&
          el.type === action.payload.type &&
          el.size === action.payload.size,
      )
      if (el) {
        el.count++
      }
      state.totalPrice = state.cartItems.reduce((sum, el) => (sum += el.price * el.count), 0)
      state.totalCount = state.cartItems.reduce((sum, el) => (sum += el.count), 0)
    },
    minusCount(state, action: PayloadAction<CartItemType>) {
      const el = state.cartItems.find(
        (el) =>
          el.id === action.payload.id &&
          el.type === action.payload.type &&
          el.size === action.payload.size,
      )
      if (el && el.count > 0) {
        el.count--
      }
      state.totalPrice = state.cartItems.reduce((sum, el) => (sum += el.price * el.count), 0)
      state.totalCount = state.cartItems.reduce((sum, el) => (sum += el.count), 0)
    },
  },
})

export const { addItem, removeItem, clearItems, plusCount, minusCount } = cartSlice.actions
export default cartSlice.reducer
