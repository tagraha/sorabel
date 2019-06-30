import React from 'react';

const ProductList = props => {
  const formatNumber = (num) => {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
  }

  return (
    <div className="flex-container">
      <div className="flex-card">
        <div className="flex-card__media">
          <img src={props.data.productImage} alt={`${props.data.productName} image`} />
        </div>
        <div className="flex-card__content">
          <h3 className="flex-card__content-title">{props.data.productName}</h3>
          <h5 className="flex-card__content-subtitle">Rp.&nbsp;{formatNumber(props.data.productPrice)}</h5>
          <p>Maecenas aliquet malesuada purus nec vulputate. Aenean volutpat lectus sed vestibulum ornare.</p>
        </div>
        <div className="flex-card__actions">
          <a href="#" className="flex-card__actions-button">Detail</a>
        </div>
      </div>
    </div>
  );
}

export default ProductList;
