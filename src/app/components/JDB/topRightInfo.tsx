// topRightInfo.tsx
import React from 'react';

interface TopRightInfoProps {
    onAddToList: () => void; // Add a prop to handle adding job to list
    buttonText: string;
}

const TopRightInfo: React.FC<TopRightInfoProps> = ({ onAddToList, buttonText }) => {
    return (
        <div className="inline-flex gap-[1vw] items-stretch">
            <button 
                className="flex-grow text-[0.75vw] rounded-[0.8vh] border border-[#b2b2b2] shadow-[0_0.3vh_0.3vh_0_rgba(0,0,0,0.25)] bg-opacity-70 bg-[#53975D] px-[1.5vw] py-[0.5vh] text-[#FFFFFF]" 
                style={{ fontFamily: 'Montserrat' }}
            >
                Apply
            </button>

            <button 
                className="flex-grow text-[0.75vw] bg-white rounded-[0.8vh] border border-[#b2b2b2] shadow-[0_0.3vh_0.3vh_0_rgba(0,0,0,0.25)] px-[1.5vw] py-[0.5vh]" 
                style={{ fontFamily: 'Montserrat' }}
                onClick={onAddToList} // Call onAddToList prop when button is clicked
            >
                {buttonText}
            </button>
        </div>
    );
};

export default TopRightInfo;
