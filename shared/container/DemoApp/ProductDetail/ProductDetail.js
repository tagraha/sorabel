import React from 'react';
import firebase from '../Firebase';

let db = firebase.firestore();

class ProductDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      image: '',
      price: '',
    };
  }
  componentDidMount() {
    const itemRef = db.collection("product").doc("dMi95Mwn9TevydyYuQuc");
    itemRef.get().then(doc => {
      const itemData = doc.data();
      if(doc.exists) {
        this.setState((prevState, props) => {
          return {
            name: itemData.productName,
            image: itemData.productImage,
            price: itemData.productPrice,
          }
        });

        console.log('state : ', this.state);
      }
    })
  }
  render() {
    return (
      <React.Fragment>
        product detail
      </React.Fragment>
    );
  }
}

export default ProductDetail;

