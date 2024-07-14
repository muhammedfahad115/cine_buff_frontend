import { useEffect, useState } from "react";
import axiosInstance from "../../../Api/Axios";
import { toast } from "react-toastify";
import Spinner from "../../Spinner/Spinner";
import './User.css';

function User() {
  const [medicalBills, setMedicalBills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [selectedBill, setSelectedBill] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [denyReason, setDenyReason] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [rationales, setRationales] = useState([]);
  const [expandedSuggestions, setExpandedSuggestions] = useState({});

  useEffect(() => {
    const getMedicalBills = async () => {
      try {
        const response = await axiosInstance.get(`/getmedicalbills?page=${page}&limit=10`);
        if (response.status === 200) {
          const { medicalBills, totalPages } = response.data;
          setMedicalBills(medicalBills);
          setTotalPages(totalPages);
          setLoading(false);
        }
      } catch (error) {
        if (error.response.data.error) {
          toast.error(error.response.data.error);
        }
        setLoading(false);
      }
    };

    getMedicalBills();
  }, [page]);

  const handleSeeMore = () => {
    setPage(page + 1);
  };

  const handleDenyClick = async (bill) => {
    setSelectedBill(bill);
    setIsModalOpen(true);
    setSearchTerm("");
    setSuggestions([]);
    try {
      const response = await axiosInstance.get(`/denyrationales?specialtyCode=${bill.specialtyCode}`);
      if (response.status === 200) {
        const rationaleSummaries = response.data.rationales.map(rationale => rationale.RationaleText);
        setRationales(rationaleSummaries);
        setSuggestions(rationaleSummaries); 
      }
    } catch (error) {
      console.error("Error fetching deniable rationales:", error);
      toast.error("Failed to fetch deniable rationales");
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setDenyReason("");
    setSearchTerm("");
    setSuggestions([]);
  };

  const handleApprove = (bill) => {
    toast.success(`Approved ${bill.patientName}`);
  };

  const handleConfirmDeny = async () => {
    if (!denyReason.trim()) {
      toast.error("Please enter a reason for denial.");
      return;
    }

    toast.error(`Denied  ${selectedBill.patientName}'s medical bill`);
    setIsModalOpen(false);
    setDenyReason("");
  };

  const handleSearchInputChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    const filteredSuggestions = rationales.filter((rationale) =>
      rationale.toLowerCase().includes(value.toLowerCase())
    );
    setSuggestions(filteredSuggestions);
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion);
    setSuggestions([]);
    setDenyReason(suggestion);
  };

  const toggleSuggestion = (index) => {
    setExpandedSuggestions(prev => ({ ...prev, [index]: !prev[index] }));
  };

  return (
    <div className="h-screen">
      {loading ? (
        <div className="h-96 flex items-center justify-center">
          <Spinner width={'w-[25px]'} />
        </div>
      ) : medicalBills.length > 0 ? (
        <div className="container mx-auto p-4 bg-[#1d1e20] rounded-lg">
          <div className="flex flex-col gap-6">
            {medicalBills.map((bill, index) => (
              <div key={index} className=" bg-[#252729] shadow-md rounded-md p-4">
                <div className="flex flex-col gap-4">
                  <h1 className="text-yellow-500 font-semibold">PatientName: {bill.patientName}</h1>
                  <h1 className="text-yellow-500 font-semibold">DoctorName: {bill.doctorName}</h1>
                  <h1 className="text-yellow-500 font-semibold">Date: {bill.dateOfService}</h1>
                  <h1 className="text-yellow-500 font-semibold">ProcedureCode: {bill.procedureCode}</h1>
                  <h1 className="text-yellow-500 font-semibold">ProcedureDescription: {bill.procedureDescription}</h1>
                  <h1 className="text-yellow-500 font-semibold">Cost: {bill.cost}</h1>
                  <h1 className="text-yellow-500 font-semibold">SpecialtyCode: {bill.specialtyCode}</h1>
                  <h1 className="text-yellow-500 font-semibold">PhoneNumber: {bill.phoneNumber}</h1>
                </div>

                <div className="flex justify-end mt-4">
                  <button
                    className="bg-green-500 text-white px-4 py-2 rounded-md mr-2"
                    onClick={() => handleApprove(bill)}
                  >
                    Approve
                  </button>
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded-md"
                    onClick={() => handleDenyClick(bill)}
                  >
                    Deny
                  </button>
                </div>
              </div>
            ))}
          </div>
          {page < totalPages && (
            <div className="flex justify-center mt-4">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
                onClick={handleSeeMore}
              >
                See More
              </button>
            </div>
          )}

          {isModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
              <div className="bg-[#1d1e20] p-4 rounded-md w-full max-w-md h-[60vh] overflow-y-auto">
                <h2 className="text-lg text-yellow-500 font-semibold mb-2">Deny Reason</h2>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={handleSearchInputChange}
                  className="w-full p-2 mt-2 border outline-none border-gray-300 rounded-md"
                  placeholder={`Search for rationale to deny ${selectedBill?.patientName}'s bill.`}
                />
                {suggestions.length > 0 && (
                  <div className="mt-2 max-h-48 suggestionbox overflow-y-auto border border-gray-300 rounded-md">
                    {suggestions.map((suggestion, index) => (
                      <div
                        key={index}
                        className="p-2 text-yellow-500 cursor-pointer"
                        onClick={() => handleSuggestionClick(suggestion)}
                      >
                        {expandedSuggestions[index] ? suggestion : `${suggestion.slice(0, 50)}...`}
                        <button
                          className="text-white underline ml-2"
                          onClick={() => toggleSuggestion(index)}
                        >
                          {expandedSuggestions[index] ? "See Less" : "See More"}
                        </button>
                      </div>
                    ))}
                  </div>
                )}
                <div className="flex justify-end mt-4">
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded-md mr-2"
                    onClick={closeModal}
                  >
                    Cancel
                  </button>
                  <button
                    className="bg-green-500 text-white px-4 py-2 rounded-md"
                    onClick={handleConfirmDeny}
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div>No medical bills found.</div>
      )}
    </div>
  );
}

export default User;
