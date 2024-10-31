
import React, { useState } from 'react';
import EmployeeService from '../services/EmployeeService';
import {  useNavigate } from 'react-router-dom';
import { ErrorMessage, Field, Formik, Form } from 'formik';
import * as yup from 'yup';

const AddEmployee = () => {

  const validationSchema = yup.object({
    firstName: yup.string()
      .required('First Name is required')
      .min(4,'First Name must be at least 4 characters'),
    lastName: yup.string()
      .required('Last Name is required')
      .min(4,'Last Name must be at least 4 characters'),
    emailId: yup.string()
      .required('Email is required')
      .email('Invalid email format')
  });

  // const [employee, setEmployee] = useState({
  //   id: "",
  //   firstName: "",
  //   lastName: "",
  //   emailId: ""
  // });

  // const handleChange = (e) => {
  //   const value = e.target.value;
  //   setEmployee({ ...employee, [e.target.name]: value });
  // };

  const navigate = useNavigate();

  const handleSave = (values, { resetForm }) => {
   
    EmployeeService.saveEmployee(values)
      .then((response) => {
        console.log(response.data); 
        navigate("/employeeList")
        resetForm();
      })
      .catch((error) => {
        console.error(error); 
      });
  };

  // const handelClear = () =>{
  //   setEmployee({
  //     id: "",
  //     firstName: "",
  //     lastName: "",
  //     emailId: ""
  //   })
  // }
  
  

  return (
  
    <div className="flex max-w-2xl mx-auto shadow border-b">
      {console.log(EmployeeService) }
      <div className="px-8 py-8">
        <h1 className='font-thin text-2xl tracking-wider'>Add New Employee</h1>
        <Formik 
          initialValues={{
            id: "",
            firstName: "",
            lastName: "",
            emailId: ""
          }}
          validationSchema={validationSchema}
          onSubmit={handleSave}
        >
          {({ isSubmitting, resetForm }) => (
            <Form>
              <div className='my-4'>
                <label className='block text-gray-600 text-sm font-normal'>First Name</label>
                <Field type='text' name='firstName' className='h-10 w-96 border mt-2 px-2 py-2' />
                <ErrorMessage name='firstName' component='div' className=' text-red-600'/>
              </div>
              <div className='my-4'>
                <label className='block text-gray-600 text-sm font-normal'>Last Name</label>
                <Field type='text' name='lastName' className='h-10 w-96 border mt-2 px-2 py-2' />
                <ErrorMessage name='lastName' component='div' className=' text-red-600'/>
              </div>
              <div className='my-4'>
                <label className='block text-gray-600 text-sm font-normal'>Email</label>
                <Field type='text' name='emailId' className='h-10 w-96 border mt-2 px-2 py-2' />
                <ErrorMessage name='emailId' component='div' className=' text-red-600'/>
              </div>
              <div className='my-4 space-x-4'>
                <button type='submit' disabled={isSubmitting} className='rounded text-white font-semibold bg-green-400 hover:bg-green-800 py-2 px-6'>Save</button>
                <button type='button' onClick={resetForm} className='rounded text-white font-semibold bg-red-400 hover:bg-red-800 py-2 px-6'>Clear</button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AddEmployee;
