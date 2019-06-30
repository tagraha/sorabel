import React from 'react';
import styled from 'styled-components';

import formatNumber from '../../utils/currencyFormat';

const ProductName = styled.h1`
  margin-top: 0
  line-height: 30px;
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
          <h3>{formatNumber(props.data.price)}</h3>
        </div>
      </div>
    </React.Fragment>
  )
}

export default ProductList;
