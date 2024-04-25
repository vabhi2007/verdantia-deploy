'use client'

import DetReqBlock from "./components/JDB/detReqBlock"
import DetailsBlock from "./components/JDB/detailsBlock"
import  InfoPanel  from "./components/JDB/infoPanel"
import JobDetailBlock from "./components/jobDetailBlock"
import { JobSubInfoBlock } from "./components/JDB/jobSubInfoBlock"
import ReqsBlock from "./components/JDB/requirementsBlock"
import TitleBlock from "./components/JDB/titleBlock"
import TopInfo from "./components/JDB/topInfo"
import TopLeftInfo from "./components/JDB/topLeftInfo"
import TopRightInfo from "./components/JDB/topRightInfo"
import LandingContent from "./components/landingContent";
import JobBlock from "./components/jobBlock";
import BodyHeading from "./components/bodyHeading";
import HandsPlanting from "../../public/images/handsPlanting.svg";
import PotDivider from "../../public/images/potDivider.png";
import ImageDivider from "./components/imageDivider";
import ValuesLeftTab from "./components/valuesLeftTab";
import ValuesRightTab from "./components/valuesRightTab";
import ForestDivider from "../../public/images/forestDivider.png";

import Slideshow from "./components/slideshow";
import Slide1 from "../../public/images/Slide1.svg";
import Slide2 from "../../public/images/Slide2.svg";
import Slide3 from "../../public/images/Slide3.svg";
import Slide4 from "../../public/images/Slide4.svg";
import Slide5 from "../../public/images/Slide5.svg";

import {getAuth} from "firebase/auth";
import {auth} from "@/app/firebase/config";
import {useAuthState} from "react-firebase-hooks/auth";
import {useRouter} from "next/navigation";

import { motion, useAnimation } from "framer-motion";
import { useEffect, useRef } from "react";
import { useState } from "react";

import Carousel from "./components/Carousel";

import React from 'react';
import { signOut } from '@firebase/auth';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '@/app/firebase/config';
import Footer from "./components/Footer"
import { doc, getDoc, updateDoc, arrayRemove, arrayUnion } from 'firebase/firestore';

const slides = [
  {
    imageUrl: Slide1.src,
    heading: "Reforestation Initiatives",
    subheading: "\"30 per cent of emissions from industry and fossil fuels are soaked up by forests and woodlands. Yet every year the world loses 10 million hectares of forest. Deforestation and forest degradation accounts for 11 per cent of carbon emissions.\" - UN Environment Programme",
    description: "Verdantia has successfully planted over 500,000 trees in deforested regions, contributing to the restoration of critical ecosystems and providing habitat for various wildlife species.",
  },
  {
    imageUrl: Slide2.src,
    heading: "Carbon Neutrality Achieved",
    subheading: "\"A recently published report identified that 100 energy companies have been responsible for 71% of all industrial emissions since human-driven climate change was officially recognized.\" - National Resources Defense Council",
    description: "Through innovative technologies and sustainable practices, Verdantia has achieved carbon neutrality across its operations, making significant strides in reducing its carbon footprint.",
  },
  {
    imageUrl: Slide3.src,
    heading: "Eco-Education Outreach",
    subheading: "\"Environmental education is a process that allows individuals to explore environmental issues, engage in problem solving, and take action to improve the environment.\" - United States Environmental Protection Agency",
    description: "Verdantia's dedicated teams have conducted eco-education programs in local communities, reaching over 10,000 individuals and inspiring environmentally conscious practices.",
  },
  {
    imageUrl: Slide4.src,
    heading: "Smart City Collaboration",
    subheading: "\"Digitalisation and smart controls can reduce emissions from buildings by 350 Mt CO2 by 2050.\" - International Energy Agency",
    description: "Verdantia's smart city solutions with progressive municipalities have lowered energy usage, enhanced waste management efficiency, and elevated urban sustainability.",
  },
  {
    imageUrl: Slide5.src,
    heading: "Biodiversity Conservation",
    subheading: "\"The World Wide Fund for Nature’s Living Planet Report 2022 documents a 69% average loss in the abundance of mammal, bird, reptile, fish and amphibian species since 1970.\" - The London School of Economics and Political Science",
    description: "Verdantia actively supports biodiversity conservation efforts by protecting endangered species and preserving vital habitats.",
  }
];

// Define interface for job data
interface Job {
  id: string;
  name: string;
  location: string;
  place: string;
  applicants: string;
  date: string;
  role: string;
  duration: string;
  experience: string;
  salary: string;
  description: string;
  requirements: string;
}

export default function Home() {
  const [user] = useAuthState(auth);
  const [isVisible, setIsVisible] = useState(false);
  const controlsFeaturedJobs = useAnimation();
  const controlsOurMission = useAnimation();
  const controlsOurValues = useAnimation();
  const controlsOurImpacts = useAnimation();

  const refFeaturedJobs = useRef<HTMLDivElement | null>(null);
  const refOurMission = useRef<HTMLDivElement | null>(null);
  const refOurValues = useRef<HTMLDivElement | null>(null);
  const refOurImpacts = useRef<HTMLDivElement | null>(null);

  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [allJobs, setJobListings] = useState<Job[]>([]);
  const [userJobList, setUserJobList] = useState<string[]>([]); // Define userJobList state

  useEffect(() => {
      const unsubscribe = onSnapshot(collection(db, 'allJobs'), (snapshot) => {
          const jobs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Job));
          setJobListings(jobs);
      });

      return () => unsubscribe();
  }, []);

  // Fetch userJobList when user changes
  useEffect(() => {
      const fetchUserJobList = async () => {
          if (user) {
              try {
                  const userRef = doc(db, `users/${user.uid}`);
                  const userData = await getDoc(userRef);
                  const userJobListData = userData.data()?.jobList || [];
                  setUserJobList(userJobListData);
              } catch (error) {
                  console.error('Error fetching user jobList:', error);
              }
          }
      };

      fetchUserJobList();
  }, [user]);

  // Update addToUserJobList function to explicitly define the type of the 'id' parameter
  const addToUserJobList = async (jobId: string) => {
    if (user) {
        try {
            const userRef = doc(db, 'users', user.uid);
            const userData = await getDoc(userRef);
            const userJobList = userData.data()?.jobList || [];
            
            let updatedJobList: string[] = []; // Explicitly define the type of updatedJobList as string[]

            if (userJobList.includes(jobId)) {
                // If job is already in user's job list, remove it
                await updateDoc(userRef, {
                    jobList: arrayRemove(jobId)
                });
                updatedJobList = userJobList.filter((id: string) => id !== jobId); // Explicitly define the type of id as string
            } else {
                // If job is not in user's job list, add it
                await updateDoc(userRef, {
                    jobList: arrayUnion(jobId)
                });
                updatedJobList = [...userJobList, jobId];
            }

            // Force a state update to reflect the changes immediately
            setUserJobList(updatedJobList);
        } catch (error) {
            console.error('Error updating user jobList:', error);
        }
    }
};

  const handleJobBlockClick = (job: Job) => () => {
      setSelectedJob(job);
  };

  useEffect(() => {
      const onScroll = () => {
          const checkVisibility = (ref: React.MutableRefObject<HTMLDivElement | null>, controls: any) => {
              if (ref.current && ref.current.getBoundingClientRect().top < window.innerHeight) {
                  setIsVisible(true);
                  controls.start("visible");
              }
          };

          checkVisibility(refFeaturedJobs, controlsFeaturedJobs);
          checkVisibility(refOurMission, controlsOurMission);
          checkVisibility(refOurValues, controlsOurValues);
          checkVisibility(refOurImpacts, controlsOurImpacts);
      };

      window.addEventListener("scroll", onScroll);
      return () => window.removeEventListener("scroll", onScroll);
  }, [controlsFeaturedJobs, controlsOurMission, controlsOurValues, controlsOurImpacts]);

  const variants = {
      hidden: { opacity: 0, y: 50 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <main>
      <LandingContent
        heading="Welcome to \nVerdantia"
        subheading="Where Sustainability meets Innovation"
        buttonText="Join the Team"
      />

      <motion.div
        ref={refFeaturedJobs}
        initial="hidden"
        animate={controlsFeaturedJobs}
        variants={variants}
      >
        <BodyHeading marginTop="6vw" marginBottom="2vw">Featured Jobs</BodyHeading>
        <Carousel blocks={allJobs.map(job => ({
          data: job.date,
          applicantCount: job.applicants,
          workMethod: job.place,
          location: job.location,
          jobTitle: job.name,
          duration: job.duration,
          onClick: handleJobBlockClick(job),
        }))} />
      </motion.div>

      <motion.div
        ref={refOurMission}
        initial="hidden"
        animate={controlsOurMission}
        variants={variants}
      >
        <BodyHeading marginTop="24vw">Our Mission</BodyHeading>
        <div className="flex items-center ml-[8vw] mr-[8vw]" style={{ fontFamily: 'Montserrat', fontWeight: 300, color: '#3E3E3E', fontSize: '1.5vw', lineHeight: '2.25vw' }}>
          <div className="mr-[10vw]">
            At Verdantia, our mission is to revolutionize <strong>environmental sustainability</strong> by seamlessly integrating technology and human impact. We believe in a holistic approach, leveraging <strong>cutting-edge innovations</strong> alongside direct, hands-on efforts to create a more <strong>sustainable and resilient future</strong> for our planet.
          </div>
          <img src={HandsPlanting.src} alt="Hands Planting" className="w-[40vw] h-auto" />
        </div>
      </motion.div>

      <ImageDivider src={PotDivider.src} marginTop="6vw"></ImageDivider>

      <motion.div
        ref={refOurValues}
        initial="hidden"
        animate={controlsOurValues}
        variants={variants}
      >
        <BodyHeading marginTop="4vw" marginBottom="3vw">Our Values</BodyHeading>

        <div>
          <ValuesLeftTab
            title = "01 - Environmental Awareness"
            subheading = "We inspire positive change through mindful environmental awareness and education."
            iconSrc= "/images/Values1.svg"
          />

          <ValuesRightTab
            title = "02 - Collaboration"
            subheading = "We thrive using collaboration, leveraging its power for meaningful change in sustainability."
            iconSrc= "/images/Values2.svg"
          />

          <ValuesLeftTab
            title = "03 - Leadership"
            subheading = "Guided by visionary leadership, we aim to inspire a sustainable future through innovation and determination."
            iconSrc= "/images/Values3.svg"
          />

          <ValuesRightTab
            title = "04 - Responsibility"
            subheading = "Responsibility is central to Verdantia, guiding decisions with integrity as well as transparency for sustainable initiatives."
            iconSrc= "/images/Values4.svg"
            showDivider={false}
          />      
        </div>

      </motion.div>

      <ImageDivider src={ForestDivider.src} marginTop="6vw"></ImageDivider>

      <motion.div
        ref={refOurImpacts}
        initial="hidden"
        animate={controlsOurImpacts}
        variants={variants}
      >
        <BodyHeading marginTop="4vw" marginBottom="2vw" centerAligned={true}>Our Impacts</BodyHeading>

        <Slideshow slides={slides} />
      </motion.div>

      {/* Extra margin so footer doesn't look weird */}
      <div style={{ marginBottom: '20vw' }}></div>

      {selectedJob && (
        <div className="top-0 left-0 w-full h-full flex items-center justify-center fixed bg-black bg-opacity-50 z-20">
          <JobDetailBlock
              job={selectedJob.name}
              date={selectedJob.date}
              applicants={selectedJob.applicants}
              location={selectedJob.location}
              workExperience={selectedJob.experience}
              workType={selectedJob.role}
              salary={selectedJob.salary}
              detDesc={selectedJob.description}
              reqDesc={selectedJob.requirements}
              onClose={() => setSelectedJob(null)} // Add onClose handler to close the modal
              buttonText={
                userJobList.includes(selectedJob.id) 
                ? "Remove from List" 
                : "Add to List"
              }
              onAddToList={() => addToUserJobList(selectedJob.id)}
          />
        </div>
      )}
      
      <Footer/>

    </main>
  );
}