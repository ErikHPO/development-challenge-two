import * as yup from 'yup';
const nameRegex = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;
const addressRegex = /^[a-zA-Z0-9\s,'-.]*$/;
const dateRegex = /^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d$/;

// NEW PATIENT FORM
  const patientSchema = yup.object({
    name: yup.string()
    .max(50, 'Não pode exceder 50 caracteres')
    .matches(nameRegex, 'Não parece ser um nome válido')
    .required('Este campo é obrigatório'),
    email: yup.string()
    .email('Não parece ser um e-mail válido')
    .required('Este campo é obrigatório'),
    address: yup.string()
    .max(60, 'Não pode exceder 60 caracteres')
    .matches(addressRegex, 'Não parece ser um endereço válido')
    .required('Este campo é obrigatório'),
    birthdate: yup.date()
    .max(new Date(), 'Não pode ser maior que a data atual')
    .required('Este campo é obrigatório'),

    });



export  {patientSchema};
