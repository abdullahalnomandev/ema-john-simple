import React, { useState } from 'react';
import fakeData from '../../fakeData';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css';

const Shop = (pros) => {

    const first10 = fakeData.slice(0, 15)
    const [products, setProducts] = useState(first10)
    const [count, setCount] = useState([]);
    

    const handleAddProduct = (pd) => {
        const newCount = [...count, pd];
        setCount(newCount);
      
    }

    return (
        <div className="shop-container">
            <div className="product-container">
                {
                    products.map(product => <Product

                        handleAddProduct={handleAddProduct}
                        product={product}


                    ></Product>)
                }

            </div>
            <div className="cart-container">
              
              <Cart Count={count}></Cart>
                
            </div>


        </div>
    );
};

export default Shop;