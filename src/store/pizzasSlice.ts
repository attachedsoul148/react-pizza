import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import { PizzaType } from '../components/PizzaBlock'

export const getPizzas = createAsyncThunk(
  'pizzasSlice/fetchPizzas',
  async (
    params: {
      currentPage: number
      sort: string
      searchString: string
      categoryIndex: number
    },
    { dispatch },
  ) => {
    const { currentPage, sort, searchString, categoryIndex } = params
    const { data } = await axios.get<PizzaType[]>(
      `https://62fddae741165d66bfb2fc43.mockapi.io/pizzas?&page=${currentPage}&limit=4&sortBy=${sort}&search=${searchString}&order=asc${
        categoryIndex === 0 ? '' : `&category=${categoryIndex}`
      }`,
    )
    dispatch(setPizzas(data))
  },
)

const initialState = {
  pizzas: [] as PizzaType[],
  isLoading : false
}
const pizzasSlice = createSlice({
  name: 'pizzas',
  initialState,
  reducers: {
    setPizzas: (state, action: PayloadAction<PizzaType[]>) => {
      state.pizzas = action.payload
    },
  },
  extraReducers : {
    [String(getPizzas.pending)] : (state) => {
        state.isLoading = true
    },
    [String(getPizzas.fulfilled)] : (state) => {
        state.isLoading = false
    },
    [String(getPizzas.rejected)] : (state) => {
        state.isLoading = false
    },
  }
})

export default pizzasSlice.reducer
export const { setPizzas } = pizzasSlice.actions
