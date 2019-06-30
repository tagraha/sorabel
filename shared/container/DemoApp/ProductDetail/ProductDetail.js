import React from 'react';
import { Link } from 'react-router-dom';

import firebase from '../Firebase';
import { BackButton } from './ProductDetailStyle';
import ProductDetail from '../../../components/Products/ProductDetail';

let db = firebase.firestore();

class ProductDetailPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      image: '',
      price: '',
      isProductFound: false,
    };

    this.goBack = this.goBack.bind(this);
  }

  goBack() {
    this.props.history.goBack();
  }

  componentDidMount() {
    const dataKey = this.props.match.params.productKey;
    const itemRef = db.collection("product").doc(dataKey);
    itemRef.get().then(doc => {
      const itemData = doc.data();
      if(doc.exists) {
        this.setState((prevState, props) => {
          return {
            name: itemData.productName,
            image: itemData.productImage,
            price: itemData.productPrice,
            description: itemData.productDescription,
            isProductFound: true,
          }
        });
      } else {
        this.setState((prevState, props) => {
          return {
            isProductFound: false,
          }
        })
      }
    })
  }
  render() {
    return (
      <React.Fragment>
        <BackButton onClick={this.goBack}>
          {`<<  back`}
        </BackButton>
        <ProductDetail data={this.state} />
      </React.Fragment>
    );
  }
}

export default ProductDetailPage;

