import AdminLayout from '@/app/component/AdminLayout/AdminLayout'
import Orders from '@/app/Modules/Admin/Order'
import React from 'react'

const page = () => {
  return (
    <>
    <AdminLayout>
      <Orders/>
      </AdminLayout>
    </>
  )
}

export default page
