import React from 'react';

const ReviewItem = (props) => {
    // console.log(props);
  const  removeProduct =props.removeProduct;
    const {name,quantity,key,price}=props.product

    const reviewItemStyle={borderBottom:'1px solid lightGray',marginBottom:'5px',paddingBottom:'5px',marginLeft:'200px'}
    return (
        <div style={reviewItemStyle} className="review-item">
            <h4 className="Product-name">{name}</h4><br/>
            <p>Quantity :{quantity}</p>
            <p><small>$ {price}</small></p>
            <br/>
            <button 
            onClick={()=>removeProduct(key)}
            
            className="main-button">Remove</button>
        </div>
    );
};

export default ReviewItem;