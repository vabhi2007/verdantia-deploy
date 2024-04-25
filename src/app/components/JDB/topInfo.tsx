import TopLeftInfo from "./topLeftInfo"
import TopRightInfo from "./topRightInfo"

interface myProps{
    job : string
    date : string
    onAddToList: () => void; // Add a prop to handle adding job to list
    buttonText: string
}
const TopInfo: React.FC<myProps> = ({ job, date, onAddToList, buttonText }) => {
    return (
        <div className="inline-flex flex-row gap-[6vw] w-[39vw] flex items-baseline">
            <TopLeftInfo
                job={job}
                date={date}
            />
            <TopRightInfo onAddToList={onAddToList} buttonText={buttonText}/>
        </div>
       
    )

}

export default TopInfo