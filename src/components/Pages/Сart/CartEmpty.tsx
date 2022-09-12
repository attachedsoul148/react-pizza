import React from 'react'
import { Link } from 'react-router-dom'

const CartEmpty = () => {
  return (
    <div className="cart cart--empty">
      <h2>
        Кошик пустий <span>😕</span>
      </h2>
      <p>
        Скоріш за все , ви ще нічого не додали
        <br />
        Для того щоб додати піцу перейдіть на головну сторіку
      </p>
      <img src="/img/empty-cart.png" alt="Empty cart" />
      <Link className="button button--black" to="/">
        <span>Повернутись</span>
      </Link>
    </div>
  )
}

export default CartEmpty
