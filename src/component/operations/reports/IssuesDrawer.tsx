import { Drawer } from "antd";
import Card from "./IssueListCard";

export default function IssueDrawer (props: {openIssue: boolean, setOpenIssue: any, selectedIssue: any }) {
    const data = props.selectedIssue
    console.log(data.issuelist?.comment)

    // console.log(props.data)
   
    return(
        <Drawer
        closeIcon={null}
        width={800}
        title={
            <div className="mt-5">
                <p className="text-[13px] ">{data?.name}</p>
                <div className=" font-bold flex justify-between items-center">
                    <p className="text-[13px] text-[#0A95CC]">{data?.descriptions}</p>
                    <p className="text-[#DD2025] text-[14px]">{`${data?.issuelist?.length} Reported Issues`}</p>
                </div>
                
            </div>
        }
         open={props.openIssue} onClose={() => props.setOpenIssue(false)}>
            <div className="grid grid-cols-2 gap-[8px]">
                {data?.issuelist?.map((list: any, index: number) =>(
                    <Card title={`ISSUE ${index + 1}`} fault={list.fault} rt={list.rt} ttr={list.ttr} comment={list.comment} />
                ))}

           

            </div>
            
        </Drawer>
    )
}