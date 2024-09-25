// import React from 'react'

import { FiEdit } from 'react-icons/fi';

const customerInfo = [
  { key: 1, name: 'John Doe', email: 'john@example.com', website: 'New York No. 1 Lake Park', phone: '1234567890', industry: 'Computer' },
//   { key: 2, name: 'Jane Doe', email: 'jane@example.com', website: 'London No. 1 Lake Park', phone: '1234567890', industry: 'IT' },
//   { key: 3, name: 'Jim Doe', email: 'jim@example.com', website: 'Sidney No. 1 Lake Park', phone: '1234567890', industry: 'Facility' },
];


const CustomerView = () => {
  return (
    <section>
        <div className='border rounded-md md:w-2/3 bg-white'>
      <div className="flex items-center justify-between mb-4 p-2 border-b ">
        <h4 className=' font-semibold'>Company Information</h4>
        <div className="cursor-pointer flex items-center gap-1 text-blue-400 hover:text-blue-600">
            <p><FiEdit className=''/></p>
            <p >Edit</p>
        </div>
      </div>

      {customerInfo.map((customer) => (
        <div key={customer.key} className="grid grid-cols-2 gap-8 p-4 mb-4 ">
          <div>
            <p className='font-semibold'>Company Name</p>
            <p className='text-gray-500'>{customer.name}</p>
            <p className='font-semibold'> Email </p>
            <p className='text-gray-500'>{customer.email}</p>
            <p className='font-semibold'>Website </p>
            <p className='text-gray-500'>{customer.website}</p>
          </div>
          <div>
            <p className='font-semibold'>Phone</p>
            <p className='text-gray-500'>{customer.phone}</p>
            <p className='font-semibold'>Industry </p>
            <p className='text-gray-500'>{customer.industry}</p>
          </div>
        </div>
      ))}
    </div>
    </section>
  )
}

export default CustomerView
