import { useFormik } from 'formik';
import * as Yup from 'yup';
import axiosInstance from '../../Api/Axios';
import { toast } from 'react-toastify';

function AddRationales() {
  const formik = useFormik({
    initialValues: {
      rationale: '',
      decisionType: '',
      rationaleId: '',
      module: 'Medical review',
      rationaleSummary: '',
      groupId: '',
      sequence: '',
      specialtyCode: '',
    },
    validationSchema: Yup.object({
      rationale: Yup.string().required('Rationale is required'),
      decisionType: Yup.string().required('Type of Decision is required'),
      rationaleId: Yup.string().required('Rationale ID is required'),
      module: Yup.string().required('Module is required'),
      rationaleSummary: Yup.string().required('Rationale Summary is required'),
      groupId: Yup.string().required('Group ID is required'),
      sequence: Yup.string().required('Sequence is required'),
      specialtyCode: Yup.string().required('Specialty Code is required'),
    }),
    onSubmit: async (values) => {
      try {
        const response = await axiosInstance.post('/addrationale', values);
        if (response.status === 200) {
          toast.success(response.data.message)
        }
      } catch (error) {
        if (error.response.data.error) {
          console.log(error.response.data.error)
          toast.error(error.response.data.error)
        }
      }
    },
  });

  return (
    <>
      <div className='flex justify-center h-auto  '>
        <div className='bg-[rgba(51,53,55,255)] rounded-3xl mt-3  w-full sm:w-3/4 p-6'>
          <form className=' space-y-4' onSubmit={formik.handleSubmit}>
            <div className='flex gap-2 flex-col  sm:flex-row justify-between'>
              <div className='div1 sm:w-1/2'>
                <div>
                  <label className='block text-[#ffd013] mb-2' htmlFor='rationale'>
                    Add a Rationale
                  </label>
                  <input
                    type='text'
                    id='rationale'
                    name='rationale'
                    className='w-full grayscale outline-none px-3 py-2 rounded-md bg-gray-700 text-white'
                    onChange={formik.handleChange}
                    value={formik.values.rationale}
                  />
                  {formik.touched.rationale && formik.errors.rationale ? (
                    <div className='text-red-500 text-sm'>{formik.errors.rationale}</div>
                  ) : null}
                </div>
                <div>
                  <label className='block text-[#ffd013] mb-2' htmlFor='decisionType'>
                    Type of Decision
                  </label>
                  <select
                    type='text'
                    id='decisionType'
                    name='decisionType'
                    className='w-full grayscale outline-none px-3 py-2 rounded-md bg-gray-700 text-white'
                    onChange={formik.handleChange}
                    value={formik.values.decisionType}
                  >
                    <option value=''>Select</option>
                    <option value='1'>Approved</option>
                    <option value='0'>Denied</option>
                  </select>
                  {formik.touched.decisionType && formik.errors.decisionType ? (
                    <div className='text-red-500 text-sm'>{formik.errors.decisionType}</div>
                  ) : null}
                </div>
                <div>
                  <label className='block text-[#ffd013] mb-2' htmlFor='rationaleId'>
                    Rationale ID
                  </label>
                  <input
                    type='text'
                    id='rationaleId'
                    name='rationaleId'
                    className='w-full grayscale outline-none px-3 py-2 rounded-md bg-gray-700 text-white'
                    onChange={formik.handleChange}
                    value={formik.values.rationaleId}
                  />
                  {formik.touched.rationaleId && formik.errors.rationaleId ? (
                    <div className='text-red-500 text-sm'>{formik.errors.rationaleId}</div>
                  ) : null}
                </div>
                <div>
                  <label className='block text-[#ffd013] mb-2' htmlFor='module'>
                    Module
                  </label>
                  <input
                    type='text'
                    id='module'
                    name='module'
                    className='w-full grayscale outline-none px-3 py-2 rounded-md bg-gray-700 text-white'
                    onChange={formik.handleChange}
                    value={formik.values.module}
                  />
                  {formik.touched.module && formik.errors.module ? (
                    <div className='text-red-500 text-sm'>{formik.errors.module}</div>
                  ) : null}
                </div>
              </div>
              <div className='div2 sm:w-1/2'>
                <div>
                  <label className='block text-[#ffd013] mb-2' htmlFor='rationaleSummary'>
                    Rationale Summary
                  </label>
                  <input
                    type='text'
                    id='rationaleSummary'
                    name='rationaleSummary'
                    className='w-full grayscale outline-none px-3 py-2 rounded-md bg-gray-700 text-white'
                    onChange={formik.handleChange}
                    value={formik.values.rationaleSummary}
                  />
                  {formik.touched.rationaleSummary && formik.errors.rationaleSummary ? (
                    <div className='text-red-500 text-sm'>{formik.errors.rationaleSummary}</div>
                  ) : null}
                </div>
                <div>
                  <label className='block text-[#ffd013] mb-2' htmlFor='groupId'>
                    Group ID
                  </label>
                  <input
                    type='text'
                    id='groupId'
                    name='groupId'
                    className='w-full grayscale outline-none px-3 py-2 rounded-md bg-gray-700 text-white'
                    onChange={formik.handleChange}
                    value={formik.values.groupId}
                  />
                  {formik.touched.groupId && formik.errors.groupId ? (
                    <div className='text-red-500 text-sm'>{formik.errors.groupId}</div>
                  ) : null}
                </div>
                <div>
                  <label className='block text-[#ffd013] mb-2' htmlFor='sequence'>
                    Sequence
                  </label>
                  <input
                    type='text'
                    id='sequence'
                    name='sequence'
                    className='w-full grayscale outline-none px-3 py-2 rounded-md bg-gray-700 text-white'
                    onChange={formik.handleChange}
                    value={formik.values.sequence}
                  />
                  {formik.touched.sequence && formik.errors.sequence ? (
                    <div className='text-red-500 text-sm'>{formik.errors.sequence}</div>
                  ) : null}
                </div>
                <div>
                  <label className='block text-[#ffd013] mb-2' htmlFor='specialtyCode'>
                    Specialty Code
                  </label>
                  <input
                    type='text'
                    id='specialtyCode'
                    name='specialtyCode'
                    className='w-full grayscale outline-none px-3 py-2 rounded-md bg-gray-700 text-white'
                    onChange={formik.handleChange}
                    value={formik.values.specialtyCode}
                  />
                  {formik.touched.specialtyCode && formik.errors.specialtyCode ? (
                    <div className='text-red-500 text-sm'>{formik.errors.specialtyCode}</div>
                  ) : null}
                </div>
              </div>
            </div>
            <div>
              <button
                type='submit'
                className='w-full px-3 active:scale-[.99] py-2 mt-2 bg-[#292b2d] font-semibold text-yellow-500 rounded-md'
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
