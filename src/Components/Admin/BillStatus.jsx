import { useEffect, useState } from "react";
import axiosInstance from '../../Api/Axios';
import Spinner from "../Spinner/Spinner";

function BillStatus() {
  const [medicalBills, setMedicalBills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [selectedBill, setSelectedBill] = useState(null);

  // Fetch medical bills //
  useEffect(() => {
    const fetchMedicalBills = async () => {
      try {
        const response = await axiosInstance.get(`/getallmedicalbills?page=${page}&limit=10`);
        if (response.status === 200) {
          const { medicalBills, totalPages } = response.data;
          setMedicalBills(medicalBills);
          setTotalPages(totalPages);
        }
      } catch (error) {
        console.error("Error fetching medical bills:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMedicalBills();
  }, [page]);

  // function to Handle page change //
  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  // View Rationale after clicking the view rationale button  //
  const handleViewRationale = (bill) => {
    setSelectedBill(bill);
  };

  // function to close modal  //
  const closeModal = () => {
    setSelectedBill(null);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-yellow-500 mb-4">Medical Bill Status</h1>

      {loading ? (
        <Spinner width={'w-[25px]'} />
      ) : (
        <>
          <div className="md:hidden">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {medicalBills.length === 0 ? (
                <p className="text-gray-600">No medical bills found.</p>
              ) : (
                medicalBills.map((bill, index) => (
                  <div key={index} className="bg-[rgba(51,53,55,255)] rounded-lg shadow-md p-4">
                    <h2 className="text-xl font-semibold text-yellow-500">PatientName: <span className="text-white">{bill.patientName}</span></h2>
                    <p className="text-sm text-yellow-500 mb-2"> DoctorName: <span className="text-white">{bill.doctorName}</span></p>
                    <p className="text-sm text-yellow-500 mb-2"> DateOfService: <span className="text-white">{bill.dateOfService}</span></p>
                    <p className="text-sm text-yellow-500 mb-2"> SpecialtyCode: <span className="text-white">{bill.specialtyCode}</span></p>
                    <p className="text-sm text-yellow-500 mb-2">Status: <span className="text-white">{bill.billStatus}</span></p>
                    {bill.billStatus === "Denied" && (
                      <button 
                        className="bg-gray-500 text-white px-4 py-2 rounded-md mt-2"
                        onClick={() => handleViewRationale(bill)}
                      >
                        View Rationale
                      </button>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="hidden md:block">
            <table className="min-w-full bg-[rgba(51,53,55,255)] rounded-xl">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b bg-[#252729] rounded-tl-xl font-bold text-yellow-500 border-yellow-500">Patient Name</th>
                  <th className="py-2 px-4 border-b bg-[#252729] font-bold text-yellow-500 border-yellow-500">Doctor Name</th>
                  <th className="py-2 px-4 border-b bg-[#252729] font-bold text-yellow-500 border-yellow-500">Date of Service</th>
                  <th className="py-2 px-4 border-b bg-[#252729] font-bold text-yellow-500 border-yellow-500">Specialty Code</th>
                  <th className="py-2 px-4 border-b bg-[#252729] font-bold text-yellow-500 border-yellow-500">Status</th>
                  <th className="py-2 px-4 border-b bg-[#252729] font-bold text-yellow-500 border-yellow-500">Rationale</th>
                  <th className="py-2 px-4 border-b bg-[#252729] rounded-tr-xl font-bold text-yellow-500 border-yellow-500">ActionBy</th>
                </tr>
              </thead>
              <tbody>
                {medicalBills.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="text-center py-4">
                      No medical bills found.
                    </td>
                  </tr>
                ) : (
                  medicalBills.map((bill, index) => (
                    <tr key={index}>
                      <td className="py-2 px-4 text-white">{bill.patientName}</td>
                      <td className="py-2 px-4 text-yellow-500">{bill.doctorName}</td>
                      <td className="py-2 px-4 text-sm text-white">{bill.dateOfService}</td>
                      <td className="py-2 px-4 text-sm text-white">{bill.specialtyCode}</td>
                      <td className="py-2 px-4 text-sm text-white">{bill.billStatus}</td>
                      <td className="py-2 px-4 text-sm font-medium">
                        {bill.billStatus === "Denied" ? (
                          <button 
                            className="text-indigo-600 hover:text-indigo-900"
                            onClick={() => handleViewRationale(bill)}
                          >
                            View Rationale
                          </button>
                        ) : '--'}
                      </td>
                      <td className="py-2 px-4 text-sm text-white font-medium">
                        {bill.billStatus !== "Pending" ? (
                          bill.person
                        ) : '--'}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>

            {totalPages > 1 && (
              <div className="flex justify-center mt-4">
                {[...Array(totalPages).keys()].map((pageNumber) => (
                  <button
                    key={pageNumber}
                    className={`px-3 py-1 mx-1 rounded-md ${
                      pageNumber + 1 === page ? "bg-blue-500 text-white" : "bg-gray-200"
                    }`}
                    onClick={() => handlePageChange(pageNumber + 1)}
                  >
                    {pageNumber + 1}
                  </button>
                ))}
              </div>
            )}
          </div>
        </>
      )}

      {selectedBill && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={closeModal}
        >
          <div
            className="bg-[rgba(51,53,55,255)] rounded-lg p-4 shadow-lg relative w-96"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
              onClick={closeModal}
            >
              &times;
            </button>
            <div className="mt-4">
              <h2 className="text-xl font-semibold text-yellow-500">Rationale</h2>
              <p className="mt-2 text-white">{selectedBill.denyReason}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default BillStatus;
