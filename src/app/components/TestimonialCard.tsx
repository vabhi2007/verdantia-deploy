"use client"

import Shawna from "../../../public/images/shawna.svg"
import Adam from "../../../public/images/Adam.svg"
import Alisa from "../../../public/images/Alisa.svg"
import { motion } from "framer-motion";
import { AnimatePresence } from "framer-motion";
import PropTypes from "prop-types";
import React, { CSSProperties } from "react";
import LocationIcon from "../../../public/images/locationIcon.svg";
import RemoteIcon from "../../../public/images/remoteIcon.svg";
import { useState } from "react";

type TestProps = {
    source : string
    name : string
    position : string
    location : string
    quote : string
    onClick?: () => void; // Add onClick prop

}

export const TestCard: React.FC<TestProps> = ({source, name, position, location, quote, onClick} : TestProps) =>{
    const [isHovered, setIsHovered] = useState(false);
    const buttonVariants = {
        hover: {
            backgroundColor: "#384f3f", // Darker shade
        },
    };

    return (

        <div className="flex items-start justify-center">
            <div className="bg-white w-[70vw] sm:w-[60vw]  sm:mt-[10vw] rounded-[3vw] border border-[#b2b2b2] shadow-[0_0.3vh_0.3vh_0_rgba(0,0,0,0.25)] px-[2vw] py-[2vh]">
                <div className="flex items-center justify-center pt-[3vw] flex-col">
                    <img src={source} className="rounded-full w-[25vw] sm:w-[10vw]"></img>
                    <h1 className="text-gray-800 font-semibold text-[7vw] mt-[2.7vw] sm:text-[1.4vw] sm:mt-[2vw]">
                        {name}
                    </h1>
                    <h1 className="text-gray-500 text-[5vw] sm:text-[1.1vw]">
                        {location}
                    </h1>
                    <p className="text-gray-500 text-[5vw] text-wrap p-[1vw] sm:text-[1.1vw] sm:p-[1.27vw] text-center">
                        {quote}
                    </p>
                </div>
                <div className="flex justify-between p-[1vw] sm:p-[1.27vw] gap-[4.2vw]">
                    <div>
                        <h1 className="sm:text-[0.95vw] text-[4vw] uppercase text-gray-500">
                            Position
                        </h1>
                        <p className="sm:text-[0.95vw] text-[4vw] text-yellow-500">
                            {position}
                        </p>
                    </div>
                    <div>
                        
                        {/* <button className="sm:text-[0.95vw] text-[4vw] text-green-300 border-[.6vw] py-[0.30vw]  px-[1.5vw] sm:border-[.18vw] sm:py-[0.30vw]  sm:px-[0.63vw] border-green-300">
                            Connect
                        </button> */}
                        
                    <motion.button 
                        className="flex w-[25vw] h-[8.3vw] rounded-[5vw] sm:w-[9vw] sm:h-[3vw] items-center justify-center sm:gap-[2vw]  bg-[#5b8c69] sm:rounded-[2vw] overflow-hidden "
                        variants={buttonVariants}
                        whileHover="hover"
                        onClick={onClick}
                    >
                        <div className="w-fit mt-[-1vw] mb-[-1vw] [font-family:'Bellota Text'] font-normal text-white text-[3.05vw] sm:text-[1vw] text-center tracking-[0] leading-[normal]">
                            Connect
                        </div>
                    </motion.button>
                    </div>
                </div>
            </div>
        </div>

    )
}