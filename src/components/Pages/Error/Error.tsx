import React from 'react'
import style from '../Ntfn/NotFound.module.scss'

const Error = () => {
  return (
    <div className={style.container}>
      <span>😕</span>
      <h1>Щось пішло не так</h1>
      <p>Можливо проводяться технічні роботи , спробуйте пізніше</p>
    </div>
  )
}

export default Error
