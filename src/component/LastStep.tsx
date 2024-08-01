// import React from 'react'

import { Divider } from "antd"



const LastStep = () => {
  return (
    <div className='flex justify-center  h-screen gap-10 mx-8'>
    <section className='w-[400px] h-[400px] bg-[#FDFDFD] space-y-2 rounded-md border'>
        
        <div className="mx-6 py-4">
            <h3 className="font-bold">Billing</h3>
            <div className="text-sm flex justify-between items-center space-y-2">
                <p>Customer Seats</p>
                <p>200</p>
            </div>
            <div className="text-sm flex justify-between items-center">
                <p>Amount</p>
                <p>NGN 400, 000</p>
            </div>
        </div>
        <Divider className=""/>
        <div className="mx-6 py-6">
            <h3 className="font-bold">Project Management</h3>
            <div className="text-sm flex justify-between items-center space-y-2">
                <p>Customer Seats</p>
                <p>200</p>
            </div>
            <div className="text-sm flex justify-between items-center">
                <p>Amount</p>
                <p>NGN 400, 000</p>
            </div>
        </div>
        <Divider className=""/>
        <div className="mx-6 py-6">
            <h3 className="font-bold">Incident Management</h3>
            <div className="text-sm flex justify-between items-center space-y-2">
                <p>Customer Seats</p>
                <p>200</p>
            </div>
            <div className="text-sm flex justify-between items-center">
                <p>Amount</p>
                <p>NGN 400, 000</p>
            </div>
        </div>
       
      
    </section>
    <section className='w-[300px] h-[140px] border bg-[#FDFDFD] space-y-2 rounded-md'>
    <div className="mx-6 py-6">
            <h3 className="font-bold">Project Management</h3>
            <div className="text-sm flex justify-between items-center space-y-2">
                <p>Customer Seats</p>
                <p>200</p>
            </div>
            <div className="text-sm flex justify-between items-center">
                <p>Amount</p>
                <p>NGN 400, 000</p>
            </div>
        </div>
    </section>
  </div>
  )
}

export default LastStep
