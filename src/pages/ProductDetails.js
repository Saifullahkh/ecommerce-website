import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import Layout from '../component/layout/Layout';
import { ProductList } from '../data/data';
import {useDispatch} from 'react-redux'
import {addItem, delItem} from '../redux/actions/index'


function ProductDetails() {

    const [cartBtn, setCartBtn] = useState('Add to Cart')

    //Now we need a product id which is passs from product page
    const proid = useParams();
    const proDetails = ProductList.filter(x=>x.id == proid.id)
    const product = proDetails[0];
    console.log(product);


    const dispatch = useDispatch()

    const handleCart = (product) => {
        if(cartBtn == 'Add to Cart'){
            dispatch(addItem(product))
            setCartBtn('Remove to Cart')
        }
        else{
            dispatch(delItem(product))
            setCartBtn('Add to Cart')
        }
    }

  return (
    <Layout>
     <div className="container my-5">
        <div className="row">
            <div className="col-md-6 d-flex justify-content-center product">
                <img src={product.img} alt={product.title} width='350px' height='400px'  />
            </div>
            <div className="col-md-6">
                <h1>{product.title}</h1>
                <hr />
                <h2>${product.price}</h2>
                <p className="lead">{product.desc}</p>
                <div onClick={() => handleCart(product)} className="btn btn-outline-primary">{cartBtn}</div>
            </div>
        </div>
     </div> 
    </Layout>
  )
}

export default ProductDetails
