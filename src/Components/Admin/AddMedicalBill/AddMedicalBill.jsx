import { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axiosInstance from '../../../Api/Axios';
import { toast } from 'react-toastify';
import './AddMedicalBill.css';

function AddMedicalBill() {
    const [specialtyCodes, setSpecialtyCodes] = useState([]);

    useEffect(() => {
        const fetchSpecialtyCodes = async () => {
            try {
                const response = await axiosInstance.get('/specialtycodes');
                if (response.status === 200) {
                    setSpecialtyCodes(response.data.specialtyCodes);
                }
            } catch (error) {
                console.error('Error fetching specialty codes:', error);
                toast.error('Failed to fetch specialty codes');
            }
        };

        fetchSpecialtyCodes();
    }, []);

    const formik = useFormik({
        initialValues: {
            patientName: '',
            procedureCode: '',
            procedureDescription: '',
            cost: '',
            dateOfService: '',
            doctorName: '',
            specialtyCode: '',
            phoneNumber: '',
        },
        validationSchema: Yup.object({
            patientName: Yup.string().required('Patient name is required'),
            procedureCode: Yup.string().required('Procedure code is required'),
            procedureDescription: Yup.string().required('Procedure description is required'),
            cost: Yup.number().required('Cost is required').positive('Cost must be positive'),
            dateOfService: Yup.date().required('Date of service is required'),
            doctorName: Yup.string().required('Doctor name is required'),
            specialtyCode: Yup.string().required('Specialty code is required'),
            phoneNumber: Yup.string().required('Phone number is required').matches(/^\d{10}$/, 'Phone number must be 10 digits'),
        }),
        onSubmit: async (values, { setSubmitting, resetForm }) => {
            try {
                const response = await axiosInstance.post('/addmedicalbills', values);
                if (response.status === 200) {
                    toast.success(response.data.message);
                    resetForm();
                }
            } catch (error) {
                console.error('Error creating bill:', error);
                toast.error('Failed to create bill');
            } finally {
                setSubmitting(false);
            }
        },
    });

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-xl font-bold text-yellow-500 mb-4">Add Medical Bill</h1>
            <form onSubmit={formik.handleSubmit} className="bg-[rgba(51,53,55,255)] p-4 rounded-xl">
                <div className="mb-4">
                    <label htmlFor="patientName" className="block text-sm text-yellow-500 font-semibold mb-1">Patient Name</label>
                    <input
                        id="patientName"
                        name="patientName"
                        type="text"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.patientName}
                        className="w-full border bg-[#15171a] text-white rounded-md outline-none border-none px-2 py-1"
                    />
                    {formik.touched.patientName && formik.errors.patientName ? (
                        <div className="text-red-500 text-sm mt-1">{formik.errors.patientName}</div>
                    ) : null}
                </div>

                <div className="mb-4">
                    <label htmlFor="procedureCode" className="block text-sm text-yellow-500 font-semibold mb-1">Procedure Code</label>
                    <input
                        id="procedureCode"
                        name="procedureCode"
                        type="text"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.procedureCode}
                        className="w-full border bg-[#15171a] text-white rounded-md outline-none border-none px-2 py-1"
                    />
                    {formik.touched.procedureCode && formik.errors.procedureCode ? (
                        <div className="text-red-500 text-sm mt-1">{formik.errors.procedureCode}</div>
                    ) : null}
                </div>

                <div className="mb-4">
                    <label htmlFor="procedureDescription" className="block text-sm text-yellow-500 font-semibold mb-1">Procedure Description</label>
                    <input
                        id="procedureDescription"
                        name="procedureDescription"
                        type="text"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.procedureDescription}
                        className="w-full border bg-[#15171a] text-white rounded-md outline-none border-none px-2 py-1"
                    />
                    {formik.touched.procedureDescription && formik.errors.procedureDescription ? (
                        <div className="text-red-500 text-sm mt-1">{formik.errors.procedureDescription}</div>
                    ) : null}
                </div>

                <div className="mb-4">
                    <label htmlFor="cost" className="block text-sm text-yellow-500 font-semibold mb-1">Cost</label>
                    <input
                        id="cost"
                        name="cost"
                        type="number"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.cost}
                        className="w-full border bg-[#15171a] text-white rounded-md outline-none border-none px-2 py-1"
                    />
                    {formik.touched.cost && formik.errors.cost ? (
                        <div className="text-red-500 text-sm mt-1">{formik.errors.cost}</div>
                    ) : null}
                </div>

                
                <div className="mb-4">
                    <label htmlFor="phoneNumber" className="block text-sm text-yellow-500 font-semibold mb-1">phoneNumber</label>
                    <input
                        id="phoneNumber"
                        name="phoneNumber"
                        onChange={formik.handleChange}
                        type="number"
                        onBlur={formik.handleBlur}
                        value={formik.values.phoneNumber}
                        className="w-full border bg-[#15171a] phonenumber text-white rounded-md outline-none border-none px-2 py-1"
                    />
                    {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
                        <div className="text-red-500 text-sm mt-1">{formik.errors.phoneNumber}</div>
                    ) : null}
                </div>

                <div className="mb-4">
                    <label htmlFor="dateOfService" className="block text-sm text-yellow-500 font-semibold mb-1">Date of Service</label>
                    <input
                        id="dateOfService"
                        name="dateOfService"
                        type="date"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.dateOfService}
                        className="w-full border bg-[#15171a] text-white rounded-md outline-none border-none px-2 py-1"
                    />
                    {formik.touched.dateOfService && formik.errors.dateOfService ? (
                        <div className="text-red-500 text-sm mt-1">{formik.errors.dateOfService}</div>
                    ) : null}
                </div>

                <div className="mb-4">
                    <label htmlFor="doctorName" className="block text-sm text-yellow-500 font-semibold mb-1">Doctor Name</label>
                    <input
                        id="doctorName"
                        name="doctorName"
                        type="text"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.doctorName}
                        className="w-full border bg-[#15171a] text-white rounded-md outline-none border-none px-2 py-1"
                    />
                    {formik.touched.doctorName && formik.errors.doctorName ? (
                        <div className="text-red-500 text-sm mt-1">{formik.errors.doctorName}</div>
                    ) : null}
                </div>

                <div className="mb-4">
                    <label htmlFor="specialtyCode" className="block text-sm text-yellow-500 font-semibold mb-1">Specialty Code</label>
                    <select
                        id="specialtyCode"
                        name="specialtyCode"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.specialtyCode}
                        className="w-full border bg-[#15171a] text-white rounded-md outline-none border-none px-2 py-1"
                    >
                        <option value="">Select Specialty Code</option>
                        {Array.isArray(specialtyCodes) && specialtyCodes.map((code, index) => (
                            <option className='text-white' key={index} value={code.SpecialtyCode}>
                                {code.SpecialtyCode}
                            </option>
                        ))}
                    </select>
                    {formik.touched.specialtyCode && formik.errors.specialtyCode ? (
                        <div className="text-red-500 text-sm mt-1">{formik.errors.specialtyCode}</div>
                    ) : null}
                </div>

                <div className="flex justify-end">
                    <button
                        type="submit"
                        className="py-2 px-4 bg-yellow-500 text-white rounded"
                        disabled={formik.isSubmitting}
                    >
                        Add Bill
                    </button>
                </div>
            </form>
        </div>
    );
}

export default AddMedicalBill;
