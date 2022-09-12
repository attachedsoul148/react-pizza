import React from 'react'
import { Link } from 'react-router-dom'
import { addItem } from '../store/cartSlice'
import { useAppDispatch } from '../store/store'

export type PizzaType = {
  id: string
  imageUrl: string
  title: string
  types: number[]
  sizes: number[]
  price: number
  category: number
  rating: number
}
const PizzaBlock: React.FC<PizzaType> = React.memo(
  ({ imageUrl, price, title, types, sizes, id }) => {
    const dispatch = useAppDispatch()
    const [activeType, setActiveType] = React.useState(0)
    const [activeSize, setActiveSize] = React.useState(0)
    const variants = ['Звичайне', 'Тонке']
    return (
      <div className="pizza-parent">
        <div className="pizza-block">
          <Link to={`/pizza/${id}`}>
            {' '}
            <img className="pizza-block__image" src={imageUrl} alt="Pizza" />
          </Link>

          <h4 className="pizza-block__title">{title}</h4>
          <div className="pizza-block__selector">
            <ul>
              {types.map((el) => (
                <li
                  key={el}
                  className={activeType === el ? 'active' : ''}
                  onClick={() => setActiveType(el)}>
                  {variants[el]}
                </li>
              ))}
            </ul>
            <ul>
              {sizes.map((size, index) => (
                <li
                  key={index}
                  className={activeSize === index ? 'active' : ''}
                  onClick={() => setActiveSize(index)}>
                  {size}
                </li>
              ))}
            </ul>
          </div>
          <div className="pizza-block__bottom">
            <div className="pizza-block__price">{price} UAH</div>
            <div
              className="button button--outline button--add"
              onClick={() =>
                dispatch(
                  addItem({
                    id,
                    title,
                    price,
                    type: variants[activeType],
                    count: 1,
                    size: sizes[activeSize],
                  }),
                )
              }>
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                  fill="white"
                />
              </svg>
              <span>Додати</span>
            </div>
          </div>
        </div>
      </div>
    )
  },
)

export default PizzaBlock
