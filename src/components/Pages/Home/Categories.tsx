import React from 'react'
import { changeCategory } from '../../../store/filterSlice'
import { useAppDispatch, useAppUseSelector } from '../../../store/store'

const Categories = React.memo(() => {
  const dispatch = useAppDispatch()
  const category = useAppUseSelector((state) => state.filterSlice.categoryIndex)
  const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые']
  return (
    <div className="categories">
      <ul>
        {categories.map((el, index) => (
          <li
            key={el}
            className={category === index ? 'active' : ''}
            onClick={() => {
              dispatch(changeCategory(index))
            }}>
            {el}
          </li>
        ))}
      </ul>
    </div>
  )
})

export default Categories
