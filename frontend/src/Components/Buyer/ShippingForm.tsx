import React from 'react'
import { Formik, Form, Field } from 'formik'
import { TextField, Button, Typography, Grid } from '@mui/material'
import * as Yup from 'yup'
import './ShippingForm.css'
import { useNavigate, useParams } from 'react-router-dom';
import Header from './Buyer-header/Buyer-header'
import BuyerFooter from './Buyer-footer'

interface FormValues {
  firstName: string
  lastName: string
  addressLine1: string
  addressLine2: string
  city: string
  stateProvince: string
  country: string
  postalCode: string
}

const initialValues: FormValues = {
  firstName: '',
  lastName: '',
  addressLine1: '',
  addressLine2: '',
  city: '',
  stateProvince: '',
  country: '',
  postalCode: '',
}

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),
  addressLine1: Yup.string().required('Address line 1 is required'),
  city: Yup.string().required('City is required'),
  stateProvince: Yup.string().required('State/Province is required'),
  country: Yup.string().required('Country is required'),
  postalCode: Yup.string().required('Postal code is required'),
})

const ShippingForm: React.FC = () => {

  // const { id: initialId } = useParams<{ id: string }>();
  const id = localStorage.getItem("buyer_id");

  const navigate = useNavigate();
  
  const handleSubmit = (values: FormValues) => {
    console.log('Form submitted with values:', values)
    // You can handle form submission logic here
    navigate(`/order-summary/${id}`, { state: { formValues: values } });
  }

  return (
    <div className='Order-Summary-Container '>
      <Header />

      <div className='form-container mb-3'
      // style={{
      //   width: '60%',
      //   justifyContent: 'center',
      //   margin: 'auto',
      //   backgroundColor: 'white',
      //   padding: '8px'
      // }}
      >

        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Typography variant="h5">Shipping Address</Typography>
          </Grid>
          <Grid item xs={12}>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ errors, touched }) => (
                <Form>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Field
                        as={TextField}
                        variant="outlined"
                        label="First Name"
                        name="firstName"
                        error={touched.firstName && Boolean(errors.firstName)}
                        helperText={touched.firstName && errors.firstName}
                        fullWidth
                        InputProps={{ style: { fontSize: 16 } }}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <Field
                        as={TextField}
                        variant="outlined"
                        label="Last Name"
                        name="lastName"
                        error={touched.lastName && Boolean(errors.lastName)}
                        helperText={touched.lastName && errors.lastName}
                        fullWidth
                        InputProps={{ style: { fontSize: 16 } }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Field
                        as={TextField}
                        variant="outlined"
                        label="Address Line 1"
                        name="addressLine1"
                        fullWidth
                        error={
                          touched.addressLine1 && Boolean(errors.addressLine1)
                        }
                        helperText={touched.addressLine1 && errors.addressLine1}
                        InputProps={{ style: { fontSize: 16 } }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Field
                        as={TextField}
                        variant="outlined"
                        label="Address Line 2"
                        name="addressLine2"
                        fullWidth
                        InputProps={{ style: { fontSize: 16 } }}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <Field
                        as={TextField}
                        variant="outlined"
                        label="City"
                        name="city"
                        error={touched.city && Boolean(errors.city)}
                        helperText={touched.city && errors.city}
                        fullWidth
                        InputProps={{ style: { fontSize: 16 } }}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <Field
                        as={TextField}
                        variant="outlined"
                        label="State/Province"
                        name="stateProvince"
                        error={
                          touched.stateProvince && Boolean(errors.stateProvince)
                        }
                        helperText={touched.stateProvince && errors.stateProvince}
                        fullWidth
                        InputProps={{ style: { fontSize: 16 } }}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <Field
                        as={TextField}
                        variant="outlined"
                        label="Country"
                        name="country"
                        error={touched.country && Boolean(errors.country)}
                        helperText={touched.country && errors.country}
                        fullWidth
                        InputProps={{ style: { fontSize: 16 } }}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <Field
                        as={TextField}
                        variant="outlined"
                        label="Zip/Postal Code"
                        name="postalCode"
                        error={touched.postalCode && Boolean(errors.postalCode)}
                        helperText={touched.postalCode && errors.postalCode}
                        fullWidth
                        InputProps={{ style: { fontSize: 16 } }}
                      />
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      style={{ display: 'flex', justifyContent: 'flex-end' }}
                    >
                      <Button type="submit" variant="contained" color="primary">
                        Continue
                      </Button>
                    </Grid>
                  </Grid>
                </Form>
              )}
            </Formik>
          </Grid>
        </Grid>
      </div>
      <BuyerFooter/>
    </div>
  )
}

export default ShippingForm
