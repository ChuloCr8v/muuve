import { Button, Select, Tooltip } from "antd"
import { maintenance } from "../../TableItems/data/MaintenanceData"
import { ArrowLeftOutlined, CheckOutlined, CloseOutlined, ExclamationCircleOutlined, UploadOutlined } from "@ant-design/icons"
import { twMerge } from "tailwind-merge"
import { useState } from "react"
import Empty from '../../../assets/empty.svg'
import { Link } from "react-router-dom"

export default function ReportReview () {
    const [selectedItem, setSelectedItem] = useState<any | null>(null)
    const [accpet, setAccpet] = useState(false)
    const [reject, setReject] = useState(false)

    const handleFile= (item: any) =>{
        setSelectedItem(item)
    }
    return(
        <div className="flex max-w-[100vw] overflow-hidden max-h-screen">
            <section className="w-[40%] overflow-hidden">
               <header className="p-2 flex justify-between border-b-[1.9px] border-[#E9EAEB] h-[45px]">
                <Link to="/operations/maintenance">
                        <Button>
                        <ArrowLeftOutlined/>
                            <span>Back</span>
                            
                        </Button>   
                </Link>             
                <Select className="w-[150px]" placeholder="Select Period" />
                <Button type="primary">
                    <span>Submit</span>
                    <UploadOutlined/>
                </Button>

               </header>
               <section className="h-[calc(100vh-90px)] overflow-y-auto">
                {maintenance.map((data, index) => (
                    <div key={index} onClick={() => handleFile(data)} className={twMerge('flex justify-between px-3 items-center py-1 border-b-[1.6px]', accpet && 'bg-green-50', reject && 'bg-red-50')}>
                        <div className={twMerge(
                            
                        )}>
                            <p className="text-[12px] leading-0 font-semibold">{data.name}</p>
                            <p className="text-[11px] ">{data.location}</p>
                        </div>
                        <div className="space-x-2">
                            <Tooltip title="Accept" color="#379D51" placement="left">
                                <CheckOutlined onClick={() => setAccpet(true)} className={twMerge('text-green-600 font-semibold p-2', accpet && 'bg-green-600 text-white rounded-[5px]')}/>
                            </Tooltip>
                            <Tooltip title="Reject" color="#E44136" placement="right">
                            <CloseOutlined onClick={() => setReject(true)}  className={twMerge('text-green-600 font-semibold p-2', reject && 'bg-red-600 text-white rounded-[5px]')}/>
                            </Tooltip>
                        </div>
                    </div>
                ))}

               </section>
               <footer className="h-[45px] p-2">
                    <Button type="primary">
                        <span>Accept All</span>
                        <CheckOutlined/>
                    </Button>
               </footer>

            </section>
            <section className="w-[60%] border-2 bg-[#f5f5f5] flex items-center">
                {selectedItem ? (
                    <iframe
                    src={selectedItem?.file}
                    title="File Preview"
                    width="100%"
                    height="100%"
                  />
                ) : (
                    <div className="text-[20px] m-auto text-center">
                        <ExclamationCircleOutlined className="text-[100px] text-[#D9DADC]"/>
                        <p className="text-[14px] text-[#777777]">Select an item to preview report</p>
                    </div>
                )}

            </section>
        </div>
    )
}