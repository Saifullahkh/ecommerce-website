import React from 'react'
import { NavLink } from 'react-router-dom'
import Layout from '../component/layout/Layout'
import { ProductList } from '../data/data'

function Product() {
  return (
    <Layout>
     <div className="container">
        <div className="row">
            <h1 className='text-center my-3'>Product</h1>
        </div>
        <div className="row justify-content-center gap-5 mb-3">
        {
        ProductList.map((item) => {
            return (
                <>
                    <div class="card" style={{width: '18rem', padding: '0px'}}>
                        <img src={item.img} class="card-img-top img-fluid" alt={item.title} style={{height: '300px'}} />
                        <div class="card-body">
                            <h5 class="card-title">{item.title}</h5>
                            <p class="lead">${item.price}</p>
                            <NavLink to={`/product/${item.id}`}  className="btn btn-outline-primary">Buy Now</NavLink>
                        </div>
                    </div>
                </>
            )
        })
      }
        </div>
     </div>
    </Layout>
  )
}

export default Product
