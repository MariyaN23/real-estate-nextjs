import React from 'react';
import {AdType} from "@/app/(routes)/edit-ad/[id]/page";
import Image from "next/image";
import {Button} from "@/components/ui/button";

type AgentDetailsType = {
    details: AdType | undefined
}

function AgentDetails({details}: AgentDetailsType) {
    return (
        <div className={'flex gap-5 items-center justify-between p-5 rounded-lg shadow-md border'}>
            <div>
                <p className={'text-lg font-bold'}>Name:
                    <span
                        className={'text-gray-500 font-medium'}> {details?.fullName ? details?.fullName : 'Anonymous'}</span>
                </p>
                <p className={'text-lg font-bold'}>Email:
                    <span
                        className={'text-gray-500 font-medium'}> {details?.createdBy}</span>
                </p>
            </div>
            <Button>Send message</Button>
        </div>
    );
}

export default AgentDetails;