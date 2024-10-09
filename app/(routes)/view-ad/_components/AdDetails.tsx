import React from 'react';
import {AdType} from "@/app/(routes)/edit-ad/[id]/page";
import {Bath, BedDouble, CarFront, Hammer, House, LandPlot, MapPin, Share} from "lucide-react";
import {Button} from "@/components/ui/button";
import GoogleMapView from "@/app/_components/GoogleMapView";
import AgentDetails from "@/app/(routes)/view-ad/_components/AgentDetails";

type AdDetailsType = {
    details: AdType | undefined
}

function AdDetails({details}: AdDetailsType) {
    return (
        <div className={'my-6 flex gap-2 flex-col'}>
            <div className={'flex justify-between items-center'}>
                <div>
                    <p className={'font-bold text-3xl pb-1'}>${details?.price}</p>
                    <h2 className={'text-gray-500 text-lg flex gap-2'}>
                        <MapPin className={'text-primary'}/> {details?.address}
                    </h2>
                </div>
                <Button className={'flex gap-2'}>
                    <Share/> Share
                </Button>
            </div>
            <hr/>
            <div className={'mt-4 flex flex-col gap-3'}>
                <p className={'font-bold text-2xl mt-4'}>Key features</p>
                <div className={'grid grid-cols-2 md:grid-cols-3 gap-4'}>
                    <p className={'flex gap-2 items-center bg-slate-100 rounded-lg p-3 text-primary justify-center'}>
                        <House/> {details?.propertyType}
                    </p>
                    <p className={'flex gap-2 items-center bg-slate-100 rounded-lg p-3 text-primary justify-center'}>
                        <Hammer/> Built in {details?.builtIn}
                    </p>
                    <p className={'flex gap-2 items-center bg-slate-100 rounded-lg p-3 text-primary justify-center'}>
                        <LandPlot/> {details?.area} sq.m
                    </p>
                    <p className={'flex gap-2 items-center bg-slate-100 rounded-lg p-3 text-primary justify-center'}>
                        <BedDouble/> {details?.bedroom}
                    </p>
                    <p className={'flex gap-2 items-center bg-slate-100 rounded-lg p-3 text-primary justify-center'}>
                        <Bath/> {details?.bathroom}
                    </p>
                    <p className={'flex gap-2 items-center bg-slate-100 rounded-lg p-3 text-primary justify-center'}>
                        <CarFront/> {details?.parking}
                    </p>
                </div>
                <p className={'font-bold text-2xl mt-4'}>What's special</p>
                <p>{details?.description}</p>
                <p className={'font-bold text-2xl mt-4'}>Find on map</p>
                <GoogleMapView coordinates={details?.coordinates}
                               ads={details ? [details] : []}
                               defZoom={16}/>
                <p className={'font-bold text-2xl mt-4'}>Agent details</p>
                <AgentDetails details={details}/>
            </div>
        </div>
    );
}

export default AdDetails;