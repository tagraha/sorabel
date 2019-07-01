import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withJob } from 'react-jobs';
import Helmet from 'react-helmet';

import firebase from '../Firebase';
import config from '../../../../config';

import { setProductsStore } from '../../../redux/modules/products';
import ProductList from '../../../components/Products/ProductList';

class HomeRoute extends React.Component {
  constructor(props) {
    super(props);
    this.firebaseRef = firebase.firestore().collection('product');
    this.getProductsItem = this.getProductsItem.bind(this);
    this.onCollectionUpdate = this.onCollectionUpdate.bind(this);
  }

  onCollectionUpdate(querySnapshot) {
    const productItems = [];
    querySnapshot.forEach((doc) => {
      const { productName, productPrice, productImage, productDescription } = doc.data();
      productItems.push({
        key: doc.id,
        doc, // DocumentSnapshot
        productName,
        productPrice,
        productImage,
        productDescription,
      });
    });

    this.props.setProductsStore(productItems);
  }

  getProductsItem() {
    this.unsubscribe = this.firebaseRef.onSnapshot(this.onCollectionUpdate);
  }

  componentDidMount() {
    this.getProductsItem();
  }

  componentDidUpdate() {
    console.log(this.props);
  }

  render() {
    const { products } = this.props;
    return (
      <div>
        <Helmet>
          <title>Home</title>
        </Helmet>

        <h3 class="title">product</h3>
        {products.data.map((value, index) =>
          <Fragment key={value.key}>
            <ProductList data={value} />
          </Fragment>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  products: state.products,
});

const mapActionsToProps = {
  setProductsStore: setProductsStore
};

export default compose(
  connect(mapStateToProps, mapActionsToProps),
)(HomeRoute);
