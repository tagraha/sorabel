import React, { Component, Fragment } from 'react';
import { Formik } from 'formik';
import firebase from '../Firebase';

class AddProduct extends Component {
  constructor(props) {
    super(props);
    this.ref = firebase.firestore().collection('product');
    this.storageRef = firebase.storage();
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
              // upload image
              const uploadTask = this.storageRef.ref().child(`images/${values.productPicture.name}`).put(values.productPicture);
              uploadTask.on('state_changed', (snapshot) => {
                // Observe state change events such as progress, pause, and resume
                console.log(snapshot);
                },
                (error) => {
                  // Handle unsuccessful uploads
                  console.log('upload error');
                  console.log(error);
                  setSubmitting(false);
                },
                (image) => {
                  // Do something once upload is complete
                  console.log('upload success');
                  uploadTask.snapshot.ref.getDownloadURL().then((producImageURL) => {
                    // save to firebase
                    this.ref.add({
                      productName: values.productName,
                      productPrice: values.productPrice,
                      productImage: producImageURL,
                    }).then((docRef) => {
                      alert(JSON.stringify(values, null, 2));
                      setSubmitting(false);

                      this.props.history.push("/");
                    })
                    .catch((error) => {
                      setSubmitting(false);
                      console.error("Error adding document: ", error);
                    });
                  });
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
            setFieldValue,
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
              <input
                type="file"
                name="productImage"
                onChange={(event) => {
                  setFieldValue("productPicture", event.currentTarget.files[0]);
                }}
                onBlur={handleBlur}
                value={values.productImage}
              />
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
