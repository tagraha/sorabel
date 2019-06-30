import React from 'react';
import styled from 'styled-components';

import formatNumber from '../../utils/currencyFormat';

const ProductName = styled.h1`
  margin-top: 0
  margin-bottom: 8px;
  line-height: 30px;
  font-size: 28px;
  font-weight: 800;
`;

const ProductDescription = styled.div`
  margin-top: 28px;
`;

const ProductList = props => {
  return (
    <React.Fragment>
      <div className="row">
        <div className="col-xs-12 col-md-3 col-lg-3">
          <div className="box">
            <img width="100%" src={props.data.image} />
          </div>
        </div>

        <div className="col-xs-12 col-md-9 col-lg-9">
          <ProductName>{props.data.name}</ProductName>
          <span class="tag is-dark is-medium">Rp.&nbsp;{formatNumber(props.data.price)}</span>

          <ProductDescription>
            <span className="tag is-link is-normal">product description</span>
            <p>{props.data.description}</p>
          </ProductDescription>
        </div>
      </div>
    </React.Fragment>
  )
}

export default ProductList;
