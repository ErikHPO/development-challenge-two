import React from 'react';
import { useFormik } from 'formik';
import { patientSchema } from '../utils/yupSchema';
import { Button, TextField } from '@mui/material';
import { createUser, updateUser } from '../utils/api';
import  {useMutation, useQueryClient}  from '@tanstack/react-query';

export const PatientForm = ({setModalOpen, id, name, email, address, birthdate}) => {
  const queryClient = useQueryClient();
  const editMode = id ? true : false;
  const { mutate } = useMutation({
    mutationFn: (values) => editMode ? updateUser(id, values) : createUser(values),
    onMutate: (values) => {
      console.log('onMutate',values);
      },
      onError: (error) => {
        console.log('onError',error);
      },
      onSuccess: (data) => {
        queryClient.invalidateQueries()
        console.log('onSuccess',data);
    },
  });
  const formik = useFormik({
    initialValues: {
        name: name || '',
        email: email ||'',
        address:  address ||'',
        birthdate: birthdate || '',
    },
    validationSchema: patientSchema,
    onSubmit: (values) => {
      setModalOpen && setModalOpen(false)
        mutate(values);
    },
  });

  return (
    <div >
      {editMode ? <h1>Editar Paciente</h1> : <h1>Criar Paciente</h1>}
      <form onSubmit={formik.handleSubmit} className='patient-form'>
        <TextField
          fullWidth
          id="email"
          name="email"
          label="Email"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
        <TextField
          fullWidth
          id="name"
          name="name"
          label="Nome Completo"
          type="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
        />
        
        <TextField
          fullWidth
          id="address"
          name="address"
          label="address"
          type="address"
          value={formik.values.address}
          onChange={formik.handleChange}
          error={formik.touched.address && Boolean(formik.errors.address)}
          helperText={formik.touched.address && formik.errors.address}
        />
        <TextField
          fullWidth
          id="birthdate"
          name="birthdate"
          label=""
          type="date"
          value={formik.values.birthdate}
          onChange={formik.handleChange}
          error={formik.touched.birthdate && Boolean(formik.errors.birthdate)}
          helperText={formik.touched.birthdate && formik.errors.birthdate}
        />

        <Button color="primary" variant="contained" fullWidth type="submit" >
          Submit
        </Button>
      </form>
    </div>
  );
};



