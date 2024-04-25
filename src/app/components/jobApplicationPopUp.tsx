import React, { useState } from "react";

interface myProps {
    job: string;
    onClose: () => void;
}

const JobApplicationPopUp: React.FC = () => {
    const handleSubmit = () => {
        console.log("Job Application Submitted");
    }

    // State for the selected file
    const [selectedFile, setSelectedFile] = useState(null);

    // Handler for file input change
    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    // Handler for file upload
    const handleUpload = () => {
        // Process the selected file locally
        if (selectedFile) {
            console.log('Selected file:', selectedFile);
            // You can perform any operations with the file here, such as reading its content, etc.
        } else {
            console.log('No file selected');
        }
    };

    return (
        <main>
            <div className={"inline-flex flex-col items-start gap-[1vw] p-[2vw] relative bg-white w-fit border border-solid border-[#b2b2b2] shadow-[0px_4px_4px_#00000040] rounded-[1vw]"}>
                <div className="inline-flex flex-col items-start relative">
                    <div className="relative w-fit mt-[-1.00px] [font-family:'Bellota_Text',Helvetica] text-black text-[2.5vw] tracking-[0] leading-[normal]">
                        Job Application
                    </div>
                    <div className="relative w-fit [font-family:'Bellota_Text',Helvetica] text-[#53975dab] text-[1.5vw] tracking-[0] leading-[normal]">
                        Environmental Scientist
                    </div>
                </div>
                <div className={"inline-flex flex-col items-start gap-[1vw] relative"}>
                    <div className="flex flex-row items-start justify-center gap-[1vw] relative self-stretch w-full flex-[0_0_auto]">
                        <div className="flex flex-col items-start gap-[1vw] w-full">
                            <div className={"relative ml-0 w-fit mt-[-1.00px] [font-family:'Bellota_Text-Bold',Helvetica] text-black text-[1vw] tracking-[0] leading-[normal]"}>
                                First Name
                            </div>
                            <input
                                type="firstname"
                                placeholder="Enter"
                                className="w-full h-fit p-[0.8vw] rounded-[0.5vw] border-[0.106vw] border-solid border-gray-400 font-normal text-gray-700 text-[1.1vw] whitespace-nowrap"
                            />
                            <div className={"relative ml-0 w-fit mt-[-1.00px] [font-family:'Bellota_Text-Bold',Helvetica] text-black text-[1vw] tracking-[0] leading-[normal]"}>
                                Email
                            </div>
                            <input
                                type="email"
                                placeholder="Enter"
                                className="rounded-[0.5vw] w-full h-fit p-[0.8vw] border-[0.106vw] border-solid border-gray-400 font-normal text-gray-700 text-[1.1vw] whitespace-nowrap"
                            />
                            <div className={"relative ml-0 w-fit mt-[-1.00px] [font-family:'Bellota_Text-Bold',Helvetica] text-black text-[1vw] tracking-[0] leading-[normal]"}>
                                Zip Code
                            </div>
                            <input
                                type="zipcode"
                                placeholder="Enter"
                                className="rounded-[0.5vw] w-full h-fit p-[0.8vw] border-[0.106vw] border-solid border-gray-400 font-normal text-gray-700 text-[1.1vw] whitespace-nowrap"
                            />
                            <div></div>
                            <div className="flex items-center justify-between w-full gap-[1vw]">
                                <button
                                    onClick={handleSubmit}
                                    className="mt-[0.75vw] flex items-center justify-center py-[0.7vw] w-1/2 bg-[#53975d] rounded-[0.5vw] overflow-hidden"
                                >
                                    <div className="text-white text-[1vw] leading-27.6">
                                        Submit
                                    </div>
                                </button>
                                <button
                                    onClick={handleSubmit}
                                    className="mt-[0.75vw] flex items-center justify-center py-[0.7vw] w-1/2 bg-[#53975d] rounded-[0.5vw] overflow-hidden"
                                >
                                    <div className="text-white text-[1vw] leading-27.6">
                                        Close
                                    </div>
                                </button>
                            </div>
                        </div>
                        <div className="flex flex-col items-start gap-[1vw] w-full">
                            <div className={"relative ml-0 w-fit mt-[-1.00px] [font-family:'Bellota_Text-Bold',Helvetica] text-black text-[1vw] tracking-[0] leading-[normal]"}>
                                Last Name
                            </div>
                            <input
                                type="lastname"
                                placeholder="Enter"
                                className="w-full h-fit p-[0.8vw] rounded-[0.5vw] border-[0.106vw] border-solid border-gray-400 font-normal text-gray-700 text-[1.1vw] whitespace-nowrap"
                            />
                            <div className={"relative ml-0 w-fit mt-[-1.00px] [font-family:'Bellota_Text-Bold',Helvetica] text-black text-[1vw] tracking-[0] leading-[normal]"}>
                                Address
                            </div>
                            <input
                                type="address"
                                placeholder="Enter"
                                className="rounded-[0.5vw] w-full h-fit p-[0.8vw] border-[0.106vw] border-solid border-gray-400 font-normal text-gray-700 text-[1.1vw] whitespace-nowrap"
                            />
                            <div className={"relative ml-0 w-fit mt-[-1.00px] [font-family:'Bellota_Text-Bold',Helvetica] text-black text-[1vw] tracking-[0] leading-[normal]"}>
                                Upload Resume
                            </div>
                            <input className={"h-full text-[1.2vw]"} type="file" onChange={handleFileChange} />
                            <button onClick={handleUpload}></button>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default JobApplicationPopUp;
