import AdminSidebar from '../common/AdminSidebar';
// import AdminHeader from '../common/AdminHeader';

export default function AdminLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main content area */}
      <div className="flex flex-col flex-1">
        {/* Header */}
        {/* <AdminHeader /> */}

        {/* Page content */}
        <main className="p-6 bg-white flex-1">
          {children}
        </main>
      </div>
    </div>
  );
}
