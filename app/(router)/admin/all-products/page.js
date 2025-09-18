import AdminLayout from '@/app/component/AdminLayout/AdminLayout'
import AllProducts from '@/app/Modules/Admin/Allproducts'
import React from 'react'

const page = () => {
  return (
    <>
    <AdminLayout>
  <AllProducts/>
    </AdminLayout>
  
    </>
  )
}

export default page
