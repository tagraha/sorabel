import React, { Component, Fragment } from 'react';
import { Formik } from 'formik';
import firebase from '../Firebase';

class AddProduct extends Component {
  constructor(props) {
    super(props);
    this.ref = firebase.firestore().collection('product');
  }
  render() {
    return (
      <Fragment>
        <h1>add product</h1>
        <Formik
          initialValues={{ productName: '', productPrice: '' }}
          validate={values => {
            let errors = {};
            if (!values.productName) {
              errors.productName = 'Required';
            }
            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              this.ref.add({
                values
              }).then((docRef) => {

                alert(JSON.stringify(values, null, 2));
                setSubmitting(false);

                this.props.history.push("/");
              })
              .catch((error) => {
                setSubmitting(false);
                console.error("Error adding document: ", error);
              });
            }, 400);
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            /* and other goodies */
          }) => (
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="productName"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.productName}
              />
              {errors.productName && touched.productName && errors.productName}
              <input
                type="number"
                name="productPrice"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.productPrice}
              />
              {errors.productPrice && touched.productPrice && errors.productPrice}
              <button type="submit" disabled={isSubmitting}>
                Submit
              </button>
            </form>
          )}
        </Formik>
      </Fragment>
    )
  }
}

export default AddProduct;
