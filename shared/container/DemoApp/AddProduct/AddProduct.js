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
          initialValues={{
            productName: '',
            productPrice: ''
          }}
          validate={values => {
            let errors = {};
            if (!values.productName) {
              errors.productName = 'Product Name Required';
            }

            if (!values.productPrice) {
              errors.productPrice = 'Product Price Required';
            }

            if (!values.productDescription) {
              errors.productDescription = 'Product Desscription required';
            }

            if (!values.productPicture) {
              errors.productPicture = 'Product image is required';
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
                      productDescription: values.productDescription,
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

              <div className="field">
                <label className="label">Product Name</label>
                <div className="control">
                  <input
                    type="text"
                    name="productName"
                    className="input"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.productName}
                  />
                </div>
                <p className="help is-danger">
                  {errors.productName && touched.productName && errors.productName}
                </p>
              </div>

              <div className="field">
                <label className="label">Price</label>
                <div className="control">
                  <input
                    type="number"
                    name="productPrice"
                    className="input"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.productPrice}
                  />
                </div>
                <p className="help is-danger">
                  {errors.productPrice && touched.productPrice && errors.productPrice}
                </p>
              </div>

              <textarea
                name="productDescription"
                className="textarea"
                placeholder="Product description"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.productDescription}
              ></textarea>
              <p className="help is-danger">
                {errors.productDescription && errors.productDescription}
              </p>

              <br />
              <br />
              <br />

              <input
                type="file"
                name="productImage"
                onChange={(event) => {
                  setFieldValue("productPicture", event.currentTarget.files[0]);
                }}
                onBlur={handleBlur}
                value={values.productImage}
              />
              <p className="help is-danger">
                {errors.productPicture && errors.productPicture}
              </p>
              <button type="submit" disabled={isSubmitting} className={`button is-primary ${isSubmitting ? 'is-loading' : ''}`}>
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
