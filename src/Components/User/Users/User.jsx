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
  const [suggestionsLoading, setSuggestionsLoading] = useState(false);
  const [showNoResults, setShowNoResults] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false); // State for confirmation modal

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
    setSuggestionsLoading(true);
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
    } finally {
      setSuggestionsLoading(false);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setDenyReason("");
    setSearchTerm("");
    setSuggestions([]);
  };

  const handleApprove = async () => {
    setIsConfirmModalOpen(true);
  };

  const handleConfirmApprove = async () => {
    try {
      const response = await axiosInstance.post("/approvebill", {
        billId: selectedBill._id,
      })
      if(response.status === 200) {
        toast.success(`Approved ${selectedBill.patientName}'s medical bill`);
      }
    } catch (error) {
      console.error("Error approving bill:", error);
      toast.error("Failed to approve bill");
    } finally {
      setIsConfirmModalOpen(false);
    }
  };

  const handleDeny = async () => {
    if (!denyReason.trim()) {
      toast.error("Please enter a reason for denial.");
      return;
    }
    try {
      const response = await axiosInstance.post("/denybill", {
        billId: selectedBill._id,
        denyReason: denyReason,
      })
      toast.error(`Denied ${selectedBill.patientName}'s medical bill`);
    } catch (error) {
      console.error("Error denying bill:", error);
    } finally {
      setIsModalOpen(false);
      setDenyReason("");
    }
  };

  const handleSearchInputChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);

    if (value.trim() === "") {
      setSuggestions([]);
      setShowNoResults(false);
      return;
    }

    const filteredSuggestions = rationales.filter((rationale) =>
      rationale.toLowerCase().includes(value.toLowerCase())
    );
    setSuggestions(filteredSuggestions);

    setShowNoResults(filteredSuggestions.length === 0 && value !== "");
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
                  <h1 className="text-yellow-500 font-semibold flex gap-2 items-center">PatientName: <p className="text-sm sm:text-base">{bill.patientName}</p></h1>
                  <h1 className="text-yellow-500 font-semibold flex gap-2 items-center ">DoctorName: <p className="text-sm sm:text-base">{bill.doctorName}</p></h1>
                  <h1 className="text-yellow-500 font-semibold flex gap-2 items-center ">Date: <p className="text-sm sm:text-base">{bill.dateOfService}</p></h1>
                  <h1 className="text-yellow-500 font-semibold flex gap-2 items-center ">ProcedureCode: <p className="text-sm sm:text-base">{bill.procedureCode}</p></h1>
                  <h1 className="text-yellow-500 font-semibold flex gap-2 items-center ">ProcedureDescription: <p className="text-sm sm:text-base">{bill.procedureDescription}</p></h1>
                  <h1 className="text-yellow-500 font-semibold flex gap-2 items-center ">Cost: <p className="text-sm sm:text-base">{bill.cost}</p></h1>
                  <h1 className="text-yellow-500 font-semibold flex gap-2 items-center ">SpecialtyCode: <p className="text-sm sm:text-base">{bill.specialtyCode}</p></h1>
                  <h1 className="text-yellow-500 font-semibold flex gap-2 items-center ">PhoneNumber: <p className="text-sm sm:text-base">{bill.phoneNumber}</p></h1>
                </div>

                <div className="flex justify-end mt-4">
                  <button
                    className="bg-green-500 text-white px-4 py-2 rounded-md mr-2"
                    onClick={handleApprove}
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
                {suggestionsLoading ? (
                  <div className="flex justify-center items-center mt-2">
                    <Spinner width={'w-[25px]'} />
                  </div>
                ) : (
                  <div className="mt-2 max-h-48 suggestionbox overflow-y-auto border border-gray-300 rounded-md">
                    {suggestions.length > 0 && (
                      suggestions.map((suggestion, index) => (
                        <div key={index}>
                          <div
                            className="p-2 text-yellow-500 cursor-pointer"
                            onClick={() => handleSuggestionClick(suggestion)}
                          >
                            {expandedSuggestions[index] ? suggestion : `${suggestion.slice(0, 50)}...`}
                          </div>
                          <button
                            onClick={() => toggleSuggestion(index)}
                            className="text-[#3182ce] underline mb-2 cursor-pointer"
                          >
                            {expandedSuggestions[index] ? "Show Less" : "Show More"}
                          </button>
                        </div>
                      ))
                    )}
                    {showNoResults && (
                      <div className="p-2 text-yellow-500">No results found.</div>
                    )}
                  </div>
                )}
                <div className="flex justify-end mt-4">
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded-md mr-2"
                    onClick={handleDeny}
                  >
                    Deny
                  </button>
                  <button
                    className="bg-gray-500 text-white px-4 py-2 rounded-md"
                    onClick={closeModal}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          {isConfirmModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
              <div className="bg-[#1d1e20] p-4 rounded-md w-full max-w-md">
                <h2 className="text-lg text-yellow-500 font-semibold mb-2">Confirm Approval</h2>
                <p className="text-white">Are you sure you want to approve {selectedBill?.patientName}'s medical bill?</p>
                <div className="flex justify-end mt-4">
                  <button
                    className="bg-green-500 text-white px-4 py-2 rounded-md mr-2"
                    onClick={handleConfirmApprove}
                  >
                    Yes
                  </button>
                  <button
                    className="bg-gray-500 text-white px-4 py-2 rounded-md"
                    onClick={() => setIsConfirmModalOpen(false)}
                  >
                    No
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="flex items-center justify-center h-96">
          <p className="text-white">No medical bills found.</p>
        </div>
      )}
    </div>
  );
}

export default User;
