import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import Layout from '../component/layout/Layout'
import { delItem } from '../redux/actions'

const Cart = () => {
    const state = useSelector((state) => state.addItem)
    const dispatch = useDispatch()

    const handleClose = (item) => {
        dispatch(delItem(item))
    }

    const cartItems = (cartItem) => {
        return (
            <div className='px-4 my-3 bg-light rounded-3' key={cartItem.id}>
                <div className="container py-4">
                    <button onClick={() => handleClose(cartItem)} className="btn-close float-end" aria-label='Close'></button>
                    <div className="row justify-content-center">
                        <div className="col-md-4">
                            <img src={cartItem.img} alt={cartItem.title} height='200px' width='180px' />
                        </div>
                        <div className="col-md-4">
                            <h3>{cartItem.title}</h3>
                            <p className="lead fw-bold">${cartItem.price}</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    const emptyCart = () => {
        return (
            <div className='px-4 my-3 bg-light rounded-3'>
                <div className="container py-5">
                    <div className="row">
                        <h2>Your Cart is Empty</h2>
                    </div>
                </div>
            </div>
        )
    }

    const button = () => {
        return(
            <div className="px-4">
                <div className="container">
                    <div className="row">
                        <NavLink to='/checkout' className='btn btn-outline-primary mb-3 w-md-25 mx-auto'>Proceed To Checkout</NavLink>
                    </div>
                </div>
            </div>
        )
    }

  return (
    <Layout>
     { state.length === 0 && emptyCart() }
     { state.length !== 0 && state.map(cartItems)} 
     { state.length !== 0 && button() }
    </Layout>
  )
}

export default Cart
