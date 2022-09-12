import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import filterSlice from './filterSlice'
import cartSlice from './cartSlice'
import pizzasSlice from './pizzasSlice'

export const store = configureStore({
  reducer: {
    filterSlice,
    cartSlice,
    pizzasSlice
  }
})

export type AppDispatchType = typeof store.dispatch
export type RootStateType = ReturnType<typeof store.getState>
export const useAppUseSelector: TypedUseSelectorHook<RootStateType> = useSelector
export const useAppDispatch = () => useDispatch<AppDispatchType>()
