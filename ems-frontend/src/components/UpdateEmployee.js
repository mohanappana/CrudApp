import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import EmployeeService from '../services/EmployeeService';
import { Formik , Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';

const UpdateEmployee = () => {

    const navigate = useNavigate();

    const {id} = useParams();
    const [employee, setEmployee] = useState({
        id: id,
        firstName: "",
        lastName: "",
        emailId: ""
    });

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
    })
  

    useEffect(() => {
      const fetchData = async () => {
        try{
            const response = await EmployeeService.getEmployeeById(id);
            setEmployee(response.data)
        } catch(error){
            console.log(error);
        }
      };
      fetchData();
    }, [id])
    


    const handleUpdateEmployee = (values) => {
        try {
            EmployeeService.updateEmployee(values, id);
            navigate("/employeeList")
            console.log("Employee updated successfully!");
        } catch (error) {
            console.error("Error updating employee", error);
        }
    }
  return (
    <div className="flex max-w-2xl mx-auto shadow border-b">
      <div className="px-8 py-8">
        <h1 className='font-thin text-2xl tracking-wider'>Update Employee</h1>
        <Formik 
         enableReinitialize
         initialValues={employee}
         validationSchema={validationSchema}
         onSubmit={handleUpdateEmployee}>
          {({ isSubmitting }) => (
            <Form>
              <div className='my-4'>
                <label className='block text-gray-600 text-sm font-normal'>First Name</label>
                <Field type='text' name='firstName'  className='h-10 w-96 border mt-2 px-2 py-2' />
                <ErrorMessage name='firstName' component='div' className='text-red-700'/>
              </div>
              <div className='my-4'>
                <label className='block text-gray-600 text-sm font-normal'>Last Name</label>
                <Field type='text' name='lastName' className='h-10 w-96 border mt-2 px-2 py-2' />
                <ErrorMessage name='lastName' component='div' className='text-red-700'/>
              </div>
              <div className='my-4'>
                <label className='block text-gray-600 text-sm font-normal'>Email</label>
                <Field type='text' name='emailId' className='h-10 w-96 border mt-2 px-2 py-2' />
                <ErrorMessage name='emailId' component='div' className='text-red-700'/>
              </div>
              <div className='my-4 space-x-4'>
                <button type='submit'
                className='rounded text-white font-semibold bg-green-400 hover:bg-green-800 py-2 px-6'>
                Update</button>
                <button type='button' onClick={() => navigate("/employeeList")}
                className='rounded text-white font-semibold bg-red-400 hover:bg-red-800 py-2 px-6'>
                Cancel</button>
              </div>
            </Form>
            )}
        </Formik>
      </div>
    </div>
  )
}

export default UpdateEmployee
