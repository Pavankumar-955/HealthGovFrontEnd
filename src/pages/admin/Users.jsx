import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../../api/axios';
import toast from 'react-hot-toast';
import { MdEdit, MdRefresh, MdSave, MdClose, MdToggleOn } from 'react-icons/md';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('ALL');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' });
  const [editingUser, setEditingUser] = useState(null);
  const [editName, setEditName] = useState('');
  const [editPhone, setEditPhone] = useState('');

  useEffect(() => {
    fetchUsers();
  }, [filterRole]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filterRole]);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      if (filterRole === 'ALL') {
        const response = await API.get('/healthGov/getAllUsers');
        setUsers(response.data);
      } else {
        const response = await API.get(`/healthGov/getUserByRole/${filterRole}`);
        setUsers(Array.isArray(response.data) ? response.data : [response.data]);
      }
      toast.success('Users loaded successfully');
    } catch (err) {
      toast.error('Failed to load users');
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const openEditModal = (user) => {
    setEditingUser(user);
    setEditName(user.name || user.fullName || '');
    setEditPhone(user.phone || '');
  };

  const closeEditModal = () => {
    setEditingUser(null);
    setEditName('');
    setEditPhone('');
  };

  const updateUserDetails = async () => {
    if (!editingUser) return;
    try {
      setLoading(true);
      const payload = {
        userId: editingUser.userId,
        name: editName,
        phone: editPhone,
      };
      const response = await API.put('/healthGov/updateUserByAdmin', payload);
      const updatedUser = response.data;
      setUsers((prev) => prev.map((user) =>
        user.userId === updatedUser.userId
          ? { ...user, name: updatedUser.name, fullName: updatedUser.name, phone: updatedUser.phone }
          : user
      ));
      toast.success('User updated successfully');
      closeEditModal();
    } catch (err) {
      toast.error('Failed to update user');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const toggleUserStatus = async (user) => {
    const newStatus = user.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE';
    try {
      setLoading(true);
      const response = await API.put(`/healthGov/admin/update-status/${user.userId}?status=${newStatus}`);
      const updatedUser = response.data;
      setUsers((prev) => prev.map((u) =>
        u.userId === updatedUser.userId
          ? { ...u, status: updatedUser.status || newStatus }
          : u
      ));
      toast.success(`User status updated to ${newStatus}`);
    } catch (err) {
      toast.error('Failed to update user status');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filteredUsers = users.filter(user =>
    user.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedUsers = [...filteredUsers].sort((a, b) => {
    const getValue = (item, key) => {
      if (key === 'name') return (item.name || item.fullName || '').toLowerCase();
      if (key === 'email') return (item.email || '').toLowerCase();
      if (key === 'role') return (item.role || '').toLowerCase();
      if (key === 'status') return (item.status || '').toLowerCase();
      if (key === 'userId') return item.userId || 0;
      return '';
    };
    const aValue = getValue(a, sortConfig.key);
    const bValue = getValue(b, sortConfig.key);
    if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
    return 0;
  });

  const pageSize = 10;
  const totalPages = Math.ceil(sortedUsers.length / pageSize) || 1;
  const paginatedUsers = sortedUsers.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const handleSort = (key) => {
    setSortConfig((current) => {
      if (current.key === key) {
        return { key, direction: current.direction === 'asc' ? 'desc' : 'asc' };
      }
      return { key, direction: 'asc' };
    });
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Users Management</h1>
        <p className="text-gray-600">View and manage all system users</p>
      </div>

      {/* Filters and Actions */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-6">
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
          <div className="flex-1 flex flex-col lg:flex-row gap-4 w-full">
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-600"
            />

            <select
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-600"
            >
              <option value="ALL">All Roles</option>
              <option value="ADMIN">Admin</option>
              <option value="CITIZEN">Citizen</option>
              <option value="PROVIDER">Provider</option>
              <option value="RESEARCHER">Researcher</option>
              <option value="MANAGER">Manager</option>
              <option value="COMPLIANCE">Compliance</option>
              <option value="AUDITOR">Auditor</option>
            </select>
          </div>

          <div className="flex gap-2">
            <button
              onClick={fetchUsers}
              disabled={loading}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition disabled:opacity-50"
            >
              <MdRefresh size={20} />
              Refresh
            </button>

            <Link
              to="/admin/add-user"
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition"
            >
              + Add User
            </Link>
          </div>
        </div>

      {editingUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4">
          <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Edit User</h2>
                <p className="text-sm text-gray-500">Update name and phone for {editingUser.email}</p>
              </div>
              <button onClick={closeEditModal} className="text-gray-500 hover:text-gray-800">
                <MdClose size={24} />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-2 focus:border-green-600 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Phone</label>
                <input
                  type="text"
                  value={editPhone}
                  onChange={(e) => setEditPhone(e.target.value)}
                  className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-2 focus:border-green-600 focus:outline-none"
                />
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <button
                  onClick={closeEditModal}
                  className="rounded-xl border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={updateUserDetails}
                  disabled={loading}
                  className="inline-flex items-center gap-2 rounded-xl bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700 disabled:opacity-50"
                >
                  <MdSave size={18} />
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Users Table */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          {loading ? (
            <div className="p-6 text-center text-gray-600">Loading users...</div>
          ) : filteredUsers.length === 0 ? (
            <div className="p-6 text-center text-gray-600">No users found</div>
          ) : (
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th
                    onClick={() => handleSort('userId')}
                    className="cursor-pointer px-6 py-3 text-left text-sm font-semibold text-gray-900"
                  >
                    ID
                  </th>
                  <th
                    onClick={() => handleSort('name')}
                    className="cursor-pointer px-6 py-3 text-left text-sm font-semibold text-gray-900"
                  >
                    Name
                  </th>
                  <th
                    onClick={() => handleSort('email')}
                    className="cursor-pointer px-6 py-3 text-left text-sm font-semibold text-gray-900"
                  >
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Phone</th>
                  <th
                    onClick={() => handleSort('role')}
                    className="cursor-pointer px-6 py-3 text-left text-sm font-semibold text-gray-900"
                  >
                    Role
                  </th>
                  <th
                    onClick={() => handleSort('status')}
                    className="cursor-pointer px-6 py-3 text-left text-sm font-semibold text-gray-900"
                  >
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedUsers.map((user) => (
                  <tr key={user.userId} className="border-b border-gray-200 hover:bg-gray-50 transition">
                    <td className="px-6 py-4 text-sm text-gray-900">{user.userId}</td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{user.name || user.fullName || 'N/A'}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{user.email}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{user.phone || 'N/A'}</td>
                    <td className="px-6 py-4 text-sm">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        user.role === 'ADMIN' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'
                      }`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      {user.status === 'ACTIVE' ? (
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                          <span className="text-green-800 font-semibold">Active</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                          <span className="text-gray-800 font-semibold">Inactive</span>
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <div className="flex gap-2">
                        <button
                          onClick={() => openEditModal(user)}
                          className="text-blue-600 hover:text-blue-900 transition"
                          title="Edit Name/Phone"
                        >
                          <MdEdit size={20} />
                        </button>
                        <button
                          onClick={() => toggleUserStatus(user)}
                          disabled={user.role === 'ADMIN'}
                          className={`transition ${user.role === 'ADMIN' ? 'text-gray-300 cursor-not-allowed' : user.status === 'ACTIVE' ? 'text-orange-600 hover:text-orange-900' : 'text-green-600 hover:text-green-900'}`}
                          title={user.role === 'ADMIN' ? 'Cannot change admin status' : 'Set to ' + (user.status === 'ACTIVE' ? 'Inactive' : 'Active')}
                        >
                          <MdToggleOn size={20} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Pagination Info */}
        <div className="flex flex-col gap-3 px-6 py-4 border-t border-gray-200 text-sm text-gray-600 md:flex-row md:items-center md:justify-between">
          <div>
            Showing {(currentPage - 1) * pageSize + 1} to {Math.min(currentPage * pageSize, sortedUsers.length)} of {sortedUsers.length} users
          </div>
          {totalPages > 1 && (
            <div className="flex items-center gap-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="rounded-lg border border-gray-300 px-3 py-1 text-sm font-medium text-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Prev
              </button>
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index + 1}
                  onClick={() => handlePageChange(index + 1)}
                  className={`rounded-lg px-3 py-1 text-sm font-medium ${currentPage === index + 1 ? 'bg-green-600 text-white' : 'bg-white text-slate-700 border border-gray-300'}`}
                >
                  {index + 1}
                </button>
              ))}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="rounded-lg border border-gray-300 px-3 py-1 text-sm font-medium text-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
    </div>
  );
};

export default Users;
