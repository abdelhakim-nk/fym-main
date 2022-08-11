
import {CustomInput
} from 'components/formik';
import {
  Field, Form, Formik
} from 'formik';
import PropType from 'prop-types';
import React from 'react';
import * as Yup from 'yup';
import { CheckOutlined, LoadingOutlined } from '@ant-design/icons';


const FormSchema = Yup.object().shape({
  name: Yup.string()
    .required('Categorie name is required.')
    .max(60, 'Categorie name must only be less than 60 characters.')
});

const CategorieForm = ({ categorie, onSubmit, isLoading }) => {
  const initFormikValues = {
    name: categorie?.name || ''
  };

  const onSubmitForm = (form) => {
    onSubmit(form);
  };

  // @ts-ignore
    return (
    <div>
      <Formik
        initialValues={initFormikValues}
        validateOnChange
        validationSchema={FormSchema}
        onSubmit={onSubmitForm}
      >
        {({ values, setValues }) => (
          <Form className="product-form">
            <div className="product-form-inputs">
              <div className="d-flex">
                <div className="product-form-field">
                  <Field
                    disabled={isLoading}
                    name="name"
                    type="text"
                    label="* Nom du produit"
                    placeholder="Jordan 11"
                    style={{ textTransform: 'capitalize' }}
                    component={CustomInput}
                  />
                </div>
              </div>
              <br />
            </div>
            <br />
            <br />
            <br />
            <div className="product-form-field product-form-submit">
              <button
                className="button"
                disabled={isLoading}
                type="submit"
              >
                {isLoading ? <LoadingOutlined /> : <CheckOutlined />}
                &nbsp;
                {isLoading ? 'Saving Product' : 'Enregistrer le categorie'}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

CategorieForm.propTypes = {
  categorie: PropType.shape({name: PropType.string }).isRequired,
  onSubmit: PropType.func.isRequired,
  isLoading: PropType.bool.isRequired
};

export default CategorieForm;
