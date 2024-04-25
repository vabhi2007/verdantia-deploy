'use client'

import Navbar from "@/app/components/navbar";
import LandingContent from "@/app/components/landingContent";
import React, {useEffect, useState} from "react";
import JobBlock from "@/app/components/jobBlock";
import {collection, onSnapshot} from "firebase/firestore";
import {auth, db} from "@/app/firebase/config";
import {signOut} from "@firebase/auth";
import {useAuthState} from "react-firebase-hooks/auth";
import {useRouter} from "next/navigation";
import EditableJobBlock from "@/app/components/editableJobBlock";


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

export default function AdminPortal() {

    const [user] = useAuthState(auth);
    const router = useRouter();
    const [selectedJob, setSelectedJob] = useState<Job | null>(null);

    const [allJobs, setJobListings] = useState<Job[]>([]); // Explicitly defining type as Job[]

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, 'allJobs'), (snapshot) => {
            const jobs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Job)); // Cast each document to Job type
            setJobListings(jobs);
        });

        return () => unsubscribe();
    }, []);

    // Redirect to signIn if user is not authenticated




    const handleJobBlockClick = (job: Job) => {
        setSelectedJob(job); // Set the selected job when a JobBlock is clicked
    };



    const variants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    };
    return (
        <main>
            <LandingContent
                heading="Welcome to \nYour Portal"
                subheading=""
                buttonText="Post Application"
            />
            {/*<div className="container mx-auto mt-[10vw] text-white  flex justify-center">*/}
            {/*    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-[5vw]">*/}
            {/*        /!* Map over job listings to create JobBlocks *!/*/}
            {/*        {allJobs.map((job) => (*/}
            {/*            <EditableJobBlock*/}
            {/*                key={job.id}*/}
            {/*                id = {job.id}*/}
            {/*                applicantCount={job.applicants}*/}
            {/*                data={job.date}*/}
            {/*                jobTitle={job.name}*/}
            {/*                location={job.location}*/}
            {/*                workMethod={job.place}*/}
            {/*                duration={job.duration}*/}
            {/*                onClick={() => handleJobBlockClick(job)} // Pass onClick handler to JobBlock*/}
            {/*            />*/}
            {/*        ))}*/}
            {/*    </div>*/}
            {/*</div>*/}
        </main>
    )
}