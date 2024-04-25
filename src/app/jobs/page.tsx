'use client'

import BodyHeading from '../components/bodyHeading';
import LandingContent from '../components/landingContent';
import RoleFilter from '../components/RoleFilter';
import DurationFilter from '../components/DurationFilter';
import LocationFilter from '../components/LocationFilter';
import PlaceFilter from "../components/PlaceFilter"
import { collection, doc, onSnapshot, arrayUnion, arrayRemove, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@/app/firebase/config";
import React, { useEffect, useState } from "react";
import JobBlock from "@/app/components/jobBlock";
import JobDetailBlock from '../components/jobDetailBlock';
import Footer from '../components/Footer';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/app/firebase/config';

interface Job {
    id: string;
    name: string;
    location: string;
    place: string;
    applicants: string;
    date: string;
    duration: string;
    role: string;
    experience: string;
    description: string;
    requirements: string;
    salary: string;
}

export default function Jobs() {
    const [allJobs, setJobListings] = useState<Job[]>([]);
    const [selectedJob, setSelectedJob] = useState<Job | null>(null);
    const [user] = useAuthState(auth);
    const [userJobList, setUserJobList] = useState<string[]>([]); // Initialize userJobList state

    const [durations, setDurations] = useState<string[]>([]);
    const [location, setLocation] = useState<string[]>([]);
    const [places, setPlaces] = useState<string[]>([]);
    const [roles, setRoles] = useState<string[]>([]);

    useEffect(() => {
        // Function to fetch user job list from Firestore
        const fetchUserJobList = async () => {
            if (user) {
                try {
                    const userRef = doc(db, 'users', user.uid);
                    const userDoc = await getDoc(userRef); // Use getDoc to fetch the document
                    const userData = userDoc.data();
                    if (userData) {
                        setUserJobList(userData.jobList || []); // Set userJobList state
                    }
                } catch (error) {
                    console.error('Error fetching user job list:', error);
                }
            }
        };

        fetchUserJobList(); // Call fetchUserJobList when component mounts or user state changes
    }, [user]);

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, "selectedFilters"), snapshot => {
            snapshot.forEach((doc) => {
                const data = doc.data();

                setDurations(data.durations)
                setLocation(data.location)
                setPlaces(data.places)
                setRoles(data.roles)
            })
        })
        return () => unsubscribe();
    }, []);

    const getFilters = () => {
        console.log("Durations: ", durations)
        console.log("Locations: ", location)
        console.log("Places: ", places)
        console.log("Roles: ", roles)
    }

    const getJobs = () => {
        console.log(getJobsToRender)
    }

    const getJobsToRender = allJobs.filter(Job => {
        console.log("Job: ",Job)
        console.log("Places: ", places)
        console.log("-", places.includes(Job.place))
        if ((location.includes(Job.location) || location.length == 0) &&
            (places.includes(Job.place) || places.length == 0)  &&
            (durations.includes(Job.duration) || durations.length == 0) &&
            (roles.includes(Job.role) || roles.length == 0)) return true;
        return false
    })

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, 'allJobs'), (snapshot) => {
            const jobs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Job));
            setJobListings(jobs);
        });
        return () => unsubscribe();
    }, []);

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


    const handleJobBlockClick = (job: Job) => {
        setSelectedJob(job);
    };

    return (
        <main>
            <LandingContent
                heading="Discover your \nNext Job"
                subheading="Explore your passions"
            />

            <div className="container mx-auto">
                <BodyHeading marginTop="8vw" marginBottom="2vw">Jobs at Verdantia</BodyHeading>

                <div className="grid grid-cols-1 md:grid-cols-2 ml-[8vw] mr-[8vw]">
                    <div className="md:col-span-1"> {/* Apply styling specifically for RoleFilter */}
                        <RoleFilter />
                    </div>
                    <div className="md:col-span-1"> {/* Apply styling specifically for DurationFilter */}
                        <DurationFilter />
                    </div>
                    <div
                        className="md:col-span-2"> {/* This div spans both columns, applying styling for LocationFilter */}
                        <LocationFilter />
                        <PlaceFilter />
                    </div>
                </div>
            </div>
            <div className="container mx-auto py-5 text-white  flex justify-center mt-[1vw]">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-[5vw]">
                    {/* Map over job listings to create JobBlocks */}
                    {getJobsToRender.map((job) => (
                        <JobBlock
                            key={job.id}
                            applicantCount={job.applicants}
                            data={job.date}
                            jobTitle={job.name}
                            location={job.location}
                            workMethod={job.place}
                            duration={job.duration}
                            onClick={() => handleJobBlockClick(job)} // Add to user's job list
                        />
                    ))}
                </div>
            </div>

            {selectedJob && (
                <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
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

            <Footer />
        </main>
    );
}
