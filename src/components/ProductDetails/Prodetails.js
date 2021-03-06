import React from 'react';
import { useParams } from 'react-router-dom';
import fakeData from '../../fakeData';
import Product from '../Product/Product';

const Prodetails = () => {


  const {productKey}=useParams();

 const product = fakeData.find( prod => prod.key===productKey)


    return (
        <div>
            <h1> Product Details</h1>
            <Product addToButton={false} product={product}></Product>
   
        </div>
    );
};

export default Prodetails;









// const {productKey} =useParams();
    
// const productDetails=fakeData.find( pd => pd.key==productKey)
// console.log(productDetails);