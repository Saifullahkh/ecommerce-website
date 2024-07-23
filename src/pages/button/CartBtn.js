import React from 'react'
import { NavLink } from 'react-router-dom'
import { CiShoppingCart } from "react-icons/ci";
import { useSelector } from 'react-redux';

function CartBtn() {
  const state = useSelector((state) => state.addItem)
  return (
    <>
        <NavLink to='/cart' className='btn  btn-md align-items-center justify-content-center mt-1 text-white'>
            <span className='me-1'><CiShoppingCart /></span>
            Cart ({state.length})
        </NavLink> 
    </>
  )
}

export default CartBtn
