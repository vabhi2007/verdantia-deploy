'use client'

import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/app/firebase/config';
import { useRouter } from 'next/navigation';
import { signOut } from '@firebase/auth';
import { motion } from 'framer-motion';
import JobBlock from '@/app/components/jobBlock';
import JobDetailBlock from '../components/jobDetailBlock';
import LandingContent from '@/app/components/landingContent';
import BodyHeading from '@/app/components/bodyHeading';
import { collection, doc, onSnapshot, updateDoc, arrayUnion, setDoc, getDoc, arrayRemove } from 'firebase/firestore';
import { db } from '@/app/firebase/config';
import Footer from '../components/Footer';
import JobApplicationPopUp from "@/app/components/jobApplicationPopUp";

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
    requirements: string;
    salary: string;
    description: string;
}

export default function Portal() {
    const [user] = useAuthState(auth);
    const router = useRouter();
    const [selectedJob, setSelectedJob] = useState<Job | null>(null);
    const [userJobList, setUserJobList] = useState<string[]>([]);
    const [allJobs, setJobListings] = useState<Job[]>([]);

    // Fetch user's job list from Firestore when component mounts
    useEffect(() => {
        if (user) {
            const userRef = doc(db, 'users', user.uid);
            const unsubscribe = onSnapshot(userRef, (docSnapshot) => {
                if (docSnapshot.exists()) {
                    const userData = docSnapshot.data();
                    setUserJobList(userData.jobList || []); // Set user's job list
                }
            });
            return () => unsubscribe();
        }
    }, [user]);

    // Fetch all jobs from Firestore when component mounts
    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, 'allJobs'), (snapshot) => {
            const jobs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Job));
            setJobListings(jobs);
        });
        return () => unsubscribe();
    }, []);

    // Redirect to signIn if user is not authenticated
    useEffect(() => {
        if (!user) router.push('/signIn');
    }, [user, router]);

    // Function to add job to user's job list
    const addToUserJobList = async (jobId: string) => {
        if (user) {
            try {
                const userRef = doc(db, 'users', user.uid);
                const userData = await getDoc(userRef);
                const userJobList = userData.data()?.jobList || [];
                
                if (userJobList.includes(jobId)) {
                    // If job is already in user's job list, remove it
                    await updateDoc(userRef, {
                        jobList: arrayRemove(jobId)
                    });
                } else {
                    // If job is not in user's job list, add it
                    await updateDoc(userRef, {
                        jobList: arrayUnion(jobId)
                    });
                }
            } catch (error) {
                console.error('Error updating user jobList:', error);
            }
        }
    };

    // Function to handle clicking on a job block
    const handleJobBlockClick = (job: Job) => {
        setSelectedJob(job); // Set the selected job when a JobBlock is clicked
    };

    // Function to handle exploring more jobs
    const handleExploreCareers = () => {
        router.push('/jobs');
    };

    // Variants for animation
    const variants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    };

    // Filter job listings to show only jobs in the user's list
    const userJobs = allJobs.filter(job => userJobList.includes(job.id));

    return (
        <main>
            <LandingContent
                heading="Welcome to \nYour Portal"
                subheading=""
                buttonText="Explore Careers"
            />

            <motion.div
                initial="hidden"
                animate="visible"
                variants={variants}
            >
                <div className="flex items-center justify-between relative mt-32">
                    <BodyHeading marginTop="" marginBottom="">My Jobs</BodyHeading>
                    <button onClick={handleExploreCareers} className="[font-family:'Montserrat-Bold',Helvetica] font-bold pr-32 underline">View More</button>
                </div>

                <div className="container mx-auto py-5 text-white overflow-x-auto flex justify-center">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-[3vw]">
                        {/* Map over user's job list to create JobBlocks */}
                        {userJobs.map((job) => (
                            <JobBlock
                                key={job.id}
                                applicantCount={job.applicants}
                                data={job.date}
                                jobTitle={job.name}
                                location={job.location}
                                workMethod={job.place}
                                duration={job.duration}
                                onClick={() => handleJobBlockClick(job)} // Pass onClick handler to JobBlock
                            />
                        ))}
                    </div>
                </div>

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

            </motion.div>
            {/*<div className="top-0 left-0 w-full h-full flex items-center justify-center fixed bg-black bg-opacity-50 z-20">
                <JobApplicationPopUp></JobApplicationPopUp>
            </div> */}
            <Footer/>
        </main>
    );
}