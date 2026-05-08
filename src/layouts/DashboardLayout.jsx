import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

const DashboardLayout = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 p-4 lg:p-6 w-full overflow-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
