const IssueListCard =(props: {title: string, fault: string, rt: string, ttr: string, comment: string})=>{
    return (
        <div className="p-[12px] space-y-[12px] border-[1.5px] border-[#E9EAEB] rounded-md">
            <section className="font-semibold pb-3 border-b-[1.5px] text-[#DD2025]">{props.title}</section>
            <section className="grid grid-cols-2 gap-4">
                <div>
                    <p className="text-[12px] text-[#777777B2]">FAULT OCCURRENCE TIME</p>
                    <p className="text-[12px]">{props.fault}</p>
                </div>
                <div>
                    <p className="text-[12px] text-[#777777B2]">ISSUE RESOLVE TIME</p>
                    <p className="text-[12px]">{props.rt}</p>
                </div>

            </section>
            <section className="grid grid-cols-1">
                <div>
                    <p className="text-[14px] text-[#777777B2]">TTR</p>
                    <p className="text-[12px]">{props.ttr}</p>
                </div>
            </section>
            <section className="grid grid-cols-1">
                <div>
                    <p className="text-[14px] text-[#777777B2]">COMMENT</p>
                    <p className="text-[12px]">{props.comment}</p>
                </div>
            </section>
            
        </div>
    )
}

export default IssueListCard