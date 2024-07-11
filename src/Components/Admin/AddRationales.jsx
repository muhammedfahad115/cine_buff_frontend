import React from 'react';
import { useFormik } from 'formik';

function AddRationales() {
  const formik = useFormik({
    initialValues: {
      rationale: '',
      decisionType: '',
      rationaleId: '',
    },
    onSubmit: (values) => {
      // Handle form submission
      console.log('Form values:', values);
      // You can send the form values to your backend here
    },
  });

  return (
    <>
      <div className='flex justify-center h-[300px]'>
        <div className='bg-[rgba(51,53,55,255)] rounded-3xl mt-3 h-[120%] w-full sm:w-3/4 p-6'>
          <form className='space-y-4' onSubmit={formik.handleSubmit}>
            <div>
              <label className='block text-[#ffd013] mb-2' htmlFor='rationale'>
                Add a Rationale
              </label>
              <input
                type='text'
                id='rationale'
                name='rationale'
                className='w-full grayscale outline-none px-3 py-2 border rounded-md bg-gray-700 text-white'
                onChange={formik.handleChange}
                value={formik.values.rationale}
              />
            </div>
            <div>
              <label className='block text-[#ffd013] mb-2' htmlFor='decisionType'>
                Type of Decision
              </label>
              <input
                type='text'
                id='decisionType'
                name='decisionType'
                className='w-full grayscale outline-none px-3 py-2 border rounded-md bg-gray-700 text-white'
                onChange={formik.handleChange}
                value={formik.values.decisionType}
              />
            </div>
            <div>
              <label className='block text-[#ffd013] mb-2' htmlFor='rationaleId'>
                Rationale ID
              </label>
              <input
                type='text'
                id='rationaleId'
                name='rationaleId'
                className='w-full grayscale outline-none px-3 py-2 border rounded-md bg-gray-700 text-white'
                onChange={formik.handleChange}
                value={formik.values.rationaleId}
              />
            </div>
            <div>
              <button
                type='submit'
                className='w-full px-3 active:scale-[.99] py-2 mt-4 bg-gray-900 font-semibold text-yellow-500 rounded-md'
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default AddRationales;
