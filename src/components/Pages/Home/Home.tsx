import React from 'react'
import { useAppUseSelector } from '../../../store/store'
import Categories from './Categories'
import Paginator from '../../Paginator'
import PizzaBlock, { PizzaType } from '../../PizzaBlock'
import Skeleton from '../../Skeleton'
import Sort from './Sort'

type HomeProps = {
  pizzas?: PizzaType[]
  isLoading: boolean
}
const Home: React.FC<HomeProps> = ({ pizzas, isLoading }) => {
  const searchString = useAppUseSelector((state) => state.filterSlice.searchString)
  return (
    <>
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h1 className="content__title">Всі піци</h1>
      <div className="content__items">
        {isLoading ? (
          <>
            {[...new Array(8)].map((_, index) => (
              <Skeleton key={index} />
            ))}
          </>
        ) : (
          <>
            {pizzas && (
              <>
                {[...pizzas]
                  .filter((el) => el.title.toLowerCase().includes(searchString.toLowerCase()))
                  .map((pizza) => (
                    <PizzaBlock key={pizza.id} {...pizza} />
                  ))}
              </>
            )}
          </>
        )}
      </div>
      <Paginator totalCount={12} />
    </>
  )
}

export default Home
