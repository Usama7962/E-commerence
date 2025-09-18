import AdminSidebar from "../AdminSidebar/AdminSidebar.js";

const AdminLayout = ({ children }) => {
  return (
    <div className="flex justify-between">
      <div className=" w-0 md:w-[150px]">
      <AdminSidebar />
      </div>
      <div className="w-full mt-10 md:mt-0 md:w-5xl bg-gray-100 ">
        {children}
      </div>
    </div>
  );
};

export default AdminLayout;
