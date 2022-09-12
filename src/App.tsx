import QueryString from 'qs'
import React, { useEffect, useRef } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import Header from './components/Header'
import Home from './components/Pages/Home/Home'
import './scss/app.scss'
import { filtersType, setSearchParams } from './store/filterSlice'
import { useAppDispatch, useAppUseSelector } from './store/store'
import { getPizzas } from './store/pizzasSlice'
import { addItem, CartItemType } from './store/cartSlice'
import Cart from './components/Pages/Сart/Cart'
const PizzaInfo = React.lazy(() => import('./components/Pages/PizzaInfo/PizzaInfo'))
const Error = React.lazy(() => import('./components/Pages/Error/Error'))
const NotFound = React.lazy(() => import('./components/Pages/Ntfn/NotFound'))

function App() {
  const dispatch = useAppDispatch()
  const navigator = useNavigate()
  const { sort, categoryIndex, currentPage, searchString } = useAppUseSelector(
    (state) => state.filterSlice,
  )
  const { pizzas, isLoading } = useAppUseSelector((state) => state.pizzasSlice)
  const writeParams = useRef(false)
  const doSearch = useRef(true)
  const fetchPizzas = async () => {
    try {
      await dispatch(
        getPizzas({
          currentPage,
          sort,
          categoryIndex,
          searchString,
        }),
      )
    } catch {
      navigator('/error')
    }
  }
  useEffect(() => {
    const data = localStorage.getItem('cart')
    if (data) {
      const items = JSON.parse(data)
      items.forEach((el: CartItemType) => dispatch(addItem(el)))
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  useEffect(() => {
    if (writeParams.current) {
      const queryString = QueryString.stringify({
        currentPage,
        sortBy: sort,
        search: searchString,
        category: categoryIndex,
      })
      navigator(`?${queryString}`)
    }
    writeParams.current = true
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, sort, categoryIndex, searchString])
  useEffect(() => {
    const params =
      currentPage === 1 && sort === 'rating' && searchString === '' && categoryIndex === 0
    if (window.location.search && !params) {
      doSearch.current = false
      const params = QueryString.parse(window.location.search.substring(1))
      dispatch(setSearchParams(params as filtersType))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  useEffect(() => {
    if (doSearch.current) {
      fetchPizzas()
    }
    doSearch.current = true
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, sort, categoryIndex, searchString])

  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <Routes>
            <Route path="/" element={<Home isLoading={isLoading} pizzas={pizzas} />} />
            <Route
              path="/cart"
              element={
                  <Cart />
              }
            />
            <Route
              path="*"
              element={
                <React.Suspense fallback={'Loading...'}>
                  <NotFound />
                </React.Suspense>
              }
            />
            <Route
              path="/error"
              element={
                <React.Suspense fallback={'Loading...'}>
                  <Error />
                </React.Suspense>
              }
            />
            <Route
              path="/pizza/:id"
              element={
                <React.Suspense fallback={'Loading...'}>
                  <PizzaInfo />
                </React.Suspense>
              }
            />
          </Routes>
        </div>
      </div>
    </div>
  )
}

export default App
