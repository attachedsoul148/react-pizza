import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type filtersType = {
  currentPage: string
  category: string
  search: string
  sortBy: string
}
const initialState = {
  searchString: '',
  sortVariants: ['rating', 'price', 'title'],
  sort: 'rating',
  categoryIndex: 0,
  currentPage: 1,
}
const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    changeSearch: (state, action: PayloadAction<string>) => {
      state.searchString = action.payload
    },
    setSortVariant: (state, action: PayloadAction<number>) => {
      state.sort = state.sortVariants[action.payload]
    },
    changeCategory: (state, action: PayloadAction<number>) => {
      state.categoryIndex = action.payload
    },
    changePage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload
    },
    setSearchParams: (state, action: PayloadAction<filtersType>) => {
      state.currentPage = Number(action.payload.currentPage)
      state.categoryIndex = Number(action.payload.category)
      state.sort = action.payload.sortBy
      state.searchString = action.payload.search
    },
  },
})

export default filterSlice.reducer
export const { changeSearch, setSortVariant, changeCategory, changePage, setSearchParams } =
  filterSlice.actions
