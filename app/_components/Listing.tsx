import React from 'react';
import {AdType} from "@/app/(routes)/edit-ad/[id]/page";
import Image from "next/image";
import {Bath, BedDouble, MapPin, Ruler} from "lucide-react";

type ListingType = {
    allAds: AdType[]
}

function Listing({allAds}: ListingType) {
    return (
        <div>
            <div className={'grid grid-cols-1 md:grid-cols-2 gap-4'}>
                {allAds.map((ad, index) => (
                    <div key={index} className={'p-3 hover:border hover:border-primary cursor-pointer rounded-lg'}>
                        <Image src={ad.listingImagesTable[0].url}
                               width={800} height={150} alt={'img preview'}
                               className={'rounded-lg object-cover h-[170px]'}/>
                        <div className={'flex mt-2 flex-col gap-2'}>
                            <span className={'font-bold text-xl'}>${ad.price}</span>
                            <span className={'flex gap-2 text-sm text-gray-400'}>
                                <MapPin className={'text-primary h-4 w-4'}/>
                                {ad.address}
                            </span>
                            <div className={'flex gap-2 mt-2 justify-between'}>
                                <span
                                    className={'flex justify-center items-center w-full gap-2 text-sm bg-slate-200 rounded-md p-2 text-gray-500'}>
                                    <BedDouble className={'text-primary h-4 w-4'}/>{ad.bedroom}
                                </span>
                                <span
                                    className={'flex justify-center items-center w-full gap-2 text-sm bg-slate-200 rounded-md p-2 text-gray-500'}>
                                    <Bath className={'text-primary h-4 w-4'}/>{ad.bathroom}
                                </span>
                                <span
                                    className={'flex justify-center items-center w-full gap-2 text-sm bg-slate-200 rounded-md p-2 text-gray-500'}>
                                    <Ruler className={'text-primary h-4 w-4'}/>{ad.area}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Listing;