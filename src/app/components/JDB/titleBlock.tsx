import TopInfo from "./topInfo"

interface myProps{
    job : string
    date : string
    applicants : string
    location : string
    buttonText: string
    onAddToList: () => void; // Add a prop to handle adding job to list
}
const TitleBlock: React.FC<myProps> = ({ job, date, applicants, location, onAddToList, buttonText }) => {
    return (
        <div className="flex-col inline-flex"> {/* Adjusted gap here */}
            <TopInfo
                job={job}
                date={date}
                onAddToList={onAddToList}
                buttonText={buttonText}
            />
            <div className="flex-col inline-flex gap-[0.9vh]">
                {/*<p className="text-[0.9vw] text-opacity-70 text-[#53975D]" style={{ fontFamily: "Montserrat" }}>{applicants} applicants</p>*/}
                {/*<p className="text-[1.2vw] text-opacity-70" style={{ fontFamily: "Bellota Text" }}>Verdantia</p>*/}
                <p className="text-[0.9vw] text-[#A4A4A4]" style={{ fontFamily: "Montserrat" }}>{location}</p>
            </div>
        </div>
       
    )

}

export default TitleBlock
