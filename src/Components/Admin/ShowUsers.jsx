import { useEffect, useState } from 'react';
import axiosInstance from '../../Api/Axios';
import Spinner from '../Spinner/Spinner';

function ShowUsers() {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchUsers(currentPage);
  }, [currentPage]);

  const fetchUsers = async (page) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(`/getusers?page=${page}&limit=10`);
      setUsers(response.data.users);
      setTotalPages(response.data.totalPages);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching users:', error);
      setLoading(false); 
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="hidden sm:block">
        <table className="min-w-full bg-[rgba(51,53,55,255)] rounded-xl">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b bg-[#252729] rounded-tl-xl font-bold text-yellow-500 border-yellow-500">Name</th>
              <th className="py-2 px-4 border-b bg-[#252729] rounded-tr-xl font-bold border-l text-white border-yellow-500">Email</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="2" className="text-center py-4">
                  <Spinner width={'w-[25px]'} />
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr key={user._id}>
                  <td className="py-2 px-4 text-white font-mono">{user.name}</td>
                  <td className="py-2 px-4 text-yellow-500 font-mono border-l border-yellow-500">{user.email}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="block sm:hidden">
        {loading ? (
          <div className="text-center py-4">
            <Spinner width={'w-[25px]'} />
          </div>
        ) : (
          users.map((user) => (
            <div key={user._id} className="bg-[rgba(51,53,55,255)] rounded-xl p-4 mb-4">
              <h2 className="text-yellow-500 font-bold">Name</h2>
              <p className="text-white font-mono">{user.name}</p>
              <h2 className="text-yellow-500 font-bold mt-2">Email</h2>
              <p className="text-yellow-500 font-mono">{user.email}</p>
            </div>
          ))
        )}
      </div>

      <div className="mt-4 flex justify-center">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            className={`py-2 rounded-md px-4 mx-1 ${currentPage === index + 1 ? 'bg-yellow-500 text-white' : 'bg-gray-200'}`}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default ShowUsers;
