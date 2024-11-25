'use client'
import withAuth from "@/utils/hoc";


function AdminDashboard() {
  return <h1>Admin Dashboard</h1>;
}

export default withAuth(AdminDashboard, 'admin');
