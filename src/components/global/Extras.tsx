export const CustomLabel = (props: {main: string, subText: string}) => {
    return(
        <div className="flexitems-center text-[13px]">
            <span className="text-[#262626]">{props.main}</span>
            <span className="text-[#595959B2]">{props.subText}</span>
        </div>

    )
}