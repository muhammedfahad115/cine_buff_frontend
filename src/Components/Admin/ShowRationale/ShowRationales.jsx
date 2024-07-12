import { useEffect, useState, useRef } from 'react';
import axiosInstance from '../../../Api/Axios';
import './ShowRationale.css';

function ShowRationales() {
  const [rationales, setRationales] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [editingRationale, setEditingRationale] = useState(null);
  const [expandedRationale, setExpandedRationale] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showAllSuggestions, setShowAllSuggestions] = useState(false);
  const [showSeeMore, setShowSeeMore] = useState(true);
  const [noResults, setNoResults] = useState(false);

  const suggestionBoxRef = useRef(null);

  useEffect(() => {
    fetchRationales(currentPage);
  }, [currentPage]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (suggestionBoxRef.current && !suggestionBoxRef.current.contains(event.target)) {
        setSuggestions([]);
        setNoResults(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const fetchRationales = async (page) => {
    try {
      const response = await axiosInstance.get(`/getrationales?page=${page}&limit=10`);
      const newData = response.data.rationales;

      if (page === 1) {
        setRationales(newData);
      } else {
        setRationales((prevRationales) => [...prevRationales, ...newData]);
      }
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error('Error fetching rationales:', error);
    }
  };

  const handleEdit = (rationale) => {
    setEditingRationale(rationale);
  };

  const handleSave = async (rationale) => {
    try {
      await axiosInstance.put(`/editrationales/${rationale._id}`, rationale);
      setEditingRationale(null);
      fetchRationales(1);
    } catch (error) {
      console.error('Error saving rationale:', error);
    }
  };

  const handleSeeMore = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const toggleExpand = (id) => {
    setExpandedRationale((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  const truncateText = (text, limit) => {
    if (text.length <= limit) return text;
    return text.slice(0, limit) + '...';
  };

  const handleSearchChange = async (e) => {
    const searchTerm = e.target.value;
    setSearchTerm(searchTerm);

    if (searchTerm) {
      try {
        const response = await axiosInstance.get(`/searchrationales?query=${searchTerm}`);
        const newData = response.data.rationales;

        if (newData.length === 0) {
          setNoResults(true);
          setSuggestions([]);
        } else {
          setNoResults(false);
          setSuggestions(newData);
        }
      } catch (error) {
        console.error('Error searching rationales:', error);
      }
    } else {
      setNoResults(false);
      setSuggestions([]);
      fetchRationales(1);
      setShowSeeMore(true);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion.Module);
    setSuggestions([]);
    setRationales([suggestion]);
    setTotalPages(1);
    setCurrentPage(1);
    setShowSeeMore(false);
    setNoResults(false);
  };

  const handleShowAllSuggestions = () => {
    setShowAllSuggestions(true);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="mb-4 relative">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search rationales..."
          className="w-full border bg-[#15171a] text-white rounded-md outline-none border-none px-2 py-1"
        />
        {suggestions && (
          <div ref={suggestionBoxRef} className={`absolute suggestionbox bg-[#15171a] ${suggestions.length > 0 ? 'border border-yellow-500' : ''} rounded-md mt-1 w-full z-10 max-h-48 overflow-y-auto`}>
            {noResults && (
              <div className="px-2 py-1 text-yellow-500">No results found.</div>
            )}
            {!noResults && suggestions.slice(0, showAllSuggestions ? suggestions.length : 5).map((suggestion) => (
              <div
                key={suggestion._id}
                className="px-2 py-1 cursor-pointer hover:bg-[#252729] text-yellow-500"
                onClick={() => handleSuggestionClick(suggestion)}
              >
                {suggestion.RationaleText}
              </div>
            ))}
            {!showAllSuggestions && suggestions.length > 5 && (
              <div
                className="px-2 py-1 cursor-pointer hover:bg-[#252729] text-yellow-500"
                onClick={handleShowAllSuggestions}
              >
                Show More
              </div>
            )}
          </div>
        )}
      </div>

      <div className="hidden sm:block">
        <table className="min-w-full bg-[rgba(51,53,55,255)] rounded-xl">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b bg-[#252729] rounded-tl-xl font-bold text-yellow-500 border-yellow-500">Module</th>
              <th className="py-2 px-4 border-b bg-[#252729] font-bold text-yellow-500 border-yellow-500">Summary</th>
              <th className="py-2 px-4 border-b bg-[#252729] font-bold text-yellow-500 border-yellow-500 max-w-xs">Text</th>
              <th className="py-2 px-4 border-b bg-[#252729] rounded-tr-xl font-bold text-yellow-500 border-yellow-500">Actions</th>
            </tr>
          </thead>
          <tbody>
            {rationales.map((rationale) => (
              <tr key={rationale._id}>
                <td className="py-2 px-4 text-white">{rationale.Module}</td>
                <td className="py-2 px-4 text-yellow-500">{rationale.RationaleSummary}</td>
                <td className="py-2 px-4 text-sm text-white max-w-xs">
                  <div className="overflow-hidden text-ellipsis">
                    {expandedRationale[rationale._id]
                      ? rationale.RationaleText
                      : truncateText(rationale.RationaleText, 100)}
                  </div>
                  <button
                    className="ml-2 text-yellow-500"
                    onClick={() => toggleExpand(rationale._id)}
                  >
                    {expandedRationale[rationale._id] ? 'See Less' : 'See More'}
                  </button>
                </td>
                <td className="py-2 px-4">
                  <button
                    className="py-1 px-3 bg-[#292b2d] text-yellow-500 font-semibold rounded"
                    onClick={() => handleEdit(rationale)}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="block sm:hidden">
        {rationales.map((rationale) => (
          <div key={rationale._id} className="bg-[rgba(51,53,55,255)] rounded-xl p-4 mb-4">
            <h2 className="text-yellow-500 font-bold">Module</h2>
            <p className="text-white">{rationale.Module}</p>
            <h2 className="text-yellow-500 font-bold mt-2">Summary</h2>
            <p className="text-white">{rationale.RationaleSummary}</p>
            <h2 className="text-yellow-500 font-bold mt-2">Rationale</h2>
            <p className="text-white">
              {expandedRationale[rationale._id]
                ? rationale.RationaleText
                : truncateText(rationale.RationaleText, 100)}
              <button
                className="ml-2 text-yellow-500"
                onClick={() => toggleExpand(rationale._id)}
              >
                {expandedRationale[rationale._id] ? 'See Less' : 'See More'}
              </button>
            </p>
            <button
              className="py-1 px-3 bg-[#292b2d] text-yellow-500 font-semibold rounded mt-2"
              onClick={() => handleEdit(rationale)}
            >
              Edit
            </button>
          </div>
        ))}
      </div>

      {editingRationale && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center">
          <div className="bg-[#1e2124] p-4 w-[90%] sm:w-[40%] rounded">
            <h2 className="text-xl font-bold text-yellow-500 mb-4">Edit Rationale</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSave(editingRationale);
              }}
            >
              <div className="mb-2">
                <label className="block text-sm text-yellow-500 font-semibold mb-1">Module</label>
                <input
                  type="text"
                  value={editingRationale.Module}
                  onChange={(e) => setEditingRationale({ ...editingRationale, Module: e.target.value })}
                  className="w-full border bg-[#15171a] text-white rounded-md outline-none border-none px-2 py-1"
                />
              </div>
              <div className="mb-2">
                <label className="block text-sm text-yellow-500 font-semibold mb-1">Summary</label>
                <input
                  type="text"
                  value={editingRationale.RationaleSummary}
                  onChange={(e) => setEditingRationale({ ...editingRationale, RationaleSummary: e.target.value })}
                  className="w-full border bg-[#15171a] text-white rounded-md outline-none border-none px-2 py-1"
                />
              </div>
              <div className="mb-2">
                <label className="block text-sm text-yellow-500 font-semibold mb-1">Rationale</label>
                <input
                  type="text"
                  value={editingRationale.RationaleText}
                  onChange={(e) => setEditingRationale({ ...editingRationale, RationaleText: e.target.value })}
                  className="w-full border bg-[#15171a] text-white rounded-md outline-none border-none px-2 py-1"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  className="py-1 px-3 bg-red-500 rounded mr-2"
                  onClick={() => setEditingRationale(null)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="py-1 px-3 bg-gray-500 text-yellow-500 font-bold rounded"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="mt-4 flex justify-center">
        {showSeeMore && (
          <button
            className="py-2 px-4 bg-yellow-500 text-white rounded"
            onClick={handleSeeMore}
            disabled={currentPage >= totalPages}
          >
            See More
          </button>
        )}
      </div>
    </div>
  );
}

export default ShowRationales;
