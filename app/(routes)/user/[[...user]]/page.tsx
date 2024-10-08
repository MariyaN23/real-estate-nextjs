"use client"
import React from 'react';
import {UserButton, UserProfile} from "@clerk/nextjs";
import {Building2} from "lucide-react";
import UsersAds from "@/app/(routes)/user/_components/UsersAds";

function User() {
    return (
        <section className={'mt-28 mb-8 md:px-10 lg:px-32 xl:px-72'}>
            <UserProfile>
                <UserButton.UserProfilePage label={'My ads'}
                                            labelIcon={<Building2 className={'h-5 w-5'}/>}
                                            url={'/my-ads'}>
                    <UsersAds/>
                </UserButton.UserProfilePage>
            </UserProfile>
        </section>
    );
}

export default User;