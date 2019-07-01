import React from 'react';
import { Link } from 'react-router-dom';

const ProductList = props => {
  const formatNumber = (num) => {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
  }

  return (
    <div className="flex-container">
      <div className="flex-card">
        <div className="flex-card__media">
          <Link to={`/product/${props.data.key}`}>
            <img src={props.data.productImage} alt={`${props.data.productName} image`} />
          </Link>
        </div>
        <div className="flex-card__content">
          <h3 className="flex-card__content-title">
            <Link to={`/product/${props.data.key}`}>{props.data.productName}</Link>
          </h3>
          <h5 className="flex-card__content-subtitle">Rp.&nbsp;{formatNumber(props.data.productPrice)}</h5>
          <p>{props.data.productDescription}</p>
        </div>
        <div className="flex-card__actions">
          <Link to={`/product/${props.data.key}`} className="flex-card__actions-button">Detail</Link>
        </div>
      </div>
    </div>
  );
}

export default ProductList;
