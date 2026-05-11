import { Outlet } from 'react-router-dom';

const DashboardLayout = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="p-4 lg:p-6 w-full overflow-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
