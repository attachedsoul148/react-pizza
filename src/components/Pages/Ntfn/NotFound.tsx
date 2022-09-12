import React from 'react'
import style from './NotFound.module.scss'

const NotFound = () => {
  return (
    <div className={style.container}>
      <span>😕</span>
      <h1>Такої сторінки не знайдено</h1>
      <p>На жаль ця сторінка не була знайдена , спробуйте іншу адресу</p>
      <button className={style.button}>Назад</button>
    </div>
  )
}

export default NotFound
