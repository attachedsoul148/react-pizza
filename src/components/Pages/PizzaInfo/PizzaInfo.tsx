import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { PizzaType } from '../../PizzaBlock'

const PizzaInfo = React.memo(() => {
  const [pizza, setPizza] = useState<PizzaType>()
  const { id } = useParams()
  const fetchPizza = async () => {
    const { data } = await axios.get<PizzaType>(
      `https://62fddae741165d66bfb2fc43.mockapi.io/pizzas/` + id,
    )
    setPizza(data)
  }
  useEffect(() => {
    fetchPizza()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])
  return (
    <div
      className="container"
      style={{ alignItems: 'center', display: 'flex', flexDirection: 'column' }}>
      <img src={pizza?.imageUrl} alt="logo" width={300} height={300} />
      <h1>{pizza?.title}</h1>
      <div>
        <h3>Price : {pizza?.price} UAH</h3>
        <h3>Rating : {pizza?.rating}/10⭐</h3>
      </div>
    </div>
  )
})
export default PizzaInfo
