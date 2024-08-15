import React, { useContext } from 'react'
import { CartContext } from './cart'

function Test() {

 console.log(useContext(CartContext));
     
  return (
    <div>Testttttttt</div>
  )
}

export default Test