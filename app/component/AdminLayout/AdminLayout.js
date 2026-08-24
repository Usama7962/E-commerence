"use client";

import AdminSidebar from "../AdminSidebar/AdminSidebar.js";
import ProtectedLayout from "../ProtectedLayout.js";

const AdminLayout = ({ children }) => {
  return (
    <ProtectedLayout>
      <AdminSidebar />
      <div className="mt-12 md:mt-0 md:ml-64 min-h-screen bg-gray-50">
        {children}
      </div>
    </ProtectedLayout>
  );
};

export default AdminLayout;
