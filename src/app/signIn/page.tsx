'use client'

import SignInPopUp from "@/app/components/signInPopUp";
import Navbar from "@/app/components/navbar";
export default function SignIn() {
    return (
        <main>
            <Navbar/>
            <div className={"flex justify-center items-center"}>
                <div className={"flex flex-col items-center"}>
                    <SignInPopUp/>
                </div>

            </div>
        </main>
    )
}