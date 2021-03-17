import React, { useEffect, useState } from 'react';
import fakeData from '../../fakeData';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css';
import { Link } from 'react-router-dom';

const Shop = () => {

    const first10 = fakeData.slice(0, 15)
    const [products, setProducts] = useState(first10)
    const [count, setCount] = useState([]);


    useEffect(() => {

        const saveCart = getDatabaseCart();

        const productKeys = Object.keys(saveCart);

        const previousCart = productKeys.map(existingKey => {
            const product = fakeData.find(pd => pd.key === existingKey)

            product.quantity = saveCart[existingKey];

            return product;
        })
        console.log(productKeys);

    }, [])

    const handleAddProduct = (pd) => {

        const toBeAddedKey = pd.key;
        const sameProduce = count.find(pd => pd.key === toBeAddedKey)

        let countNumber = 1;
        let newCart;
        if (sameProduce) {
            countNumber = sameProduce.quantity + 1;
            sameProduce.quantity = countNumber;
            const others = count.filter(pd => pd.key !== toBeAddedKey)
            newCart = [...others, sameProduce];
        }
        else {
            pd.quantity = 1;
            newCart = [...count, pd]
        }

        setCount(newCart);

        addToDatabaseCart(pd.key, countNumber);

    }
    // console.log(count);

    return (
        <div className="twin-container">
            <div className="product-container">
                {
                    products.map(product => <Product

                        key={product.key}
                        addToButton={true}
                        handleAddProduct={handleAddProduct}
                        product={product}


                    ></Product>)
                }

            </div>
            <div className="cart-container">

                <Cart Count={count}>

                    <Link to="/review">
                        <button className="main-button">Order Review</button>
                    </Link>

                </Cart>

            </div>

          

        </div>
    );
};

export default Shop;