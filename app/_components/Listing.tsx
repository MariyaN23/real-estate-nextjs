import React, {useState} from 'react';
import {AdType} from "@/app/(routes)/edit-ad/[id]/page";
import Image from "next/image";
import {Bath, BedDouble, MapPin, Ruler, Search} from "lucide-react";
import GoogleAddressSearch from "@/app/_components/GoogleAddressSearch";
import {Button} from "@/components/ui/button";
import FilterSearch from "@/app/_components/FilterSearch";
import {CoordinatesType} from "@/app/_components/ListingMapView";
import Link from "next/link";

type ListingType = {
    allAds: AdType[]
    searchHandleClick: () => void
    searchedAddress: (place: any) => void
    setBedCount: (beds: number) => void
    setBathCount: (bath: number) => void
    setPrice: (price: number) => void
    setPropertyType: (type: string | null) => void
    setCoordinates: (coordinates: CoordinatesType) => void
}

function Listing(
    {
        allAds, searchHandleClick, searchedAddress,
        setBedCount, setBathCount, setPropertyType,
        setPrice, setCoordinates
    }: ListingType) {
    const [address, setAddress] = useState<{ label: string }>()
    return (
        <div>
            <div className={'p-3 flex gap-1'}>
                <GoogleAddressSearch selectedAddress={(value) => {
                    searchedAddress(value)
                    setAddress(value)
                }} setCoordinates={(value) => setCoordinates(value)}/>
                <Button className={'flex gap-2 h-full'} onClick={searchHandleClick}>
                    <Search/>
                </Button>
            </div>
            <FilterSearch setBedCount={setBedCount}
                          setBathCount={setBathCount}
                          setPrice={setPrice}
                          setPropertyType={setPropertyType}/>
            {address &&
                <div className={'px-3 my-2'}>
                    <p className={'text-lg'}>Found <span className={'text-primary font-bold'}>{allAds.length} </span>
                        results in <span className={'text-primary font-bold'}> {address.label}</span></p>
                </div>}
            <div className={'grid grid-cols-1 md:grid-cols-2 gap-4'}>
                {allAds.length > 0
                    ? allAds.map((ad, index) => (
                        <Link href={`/view-ad/${ad.id}`}>
                            <div key={index}
                                 className={'p-3 hover:border hover:border-primary cursor-pointer rounded-lg'}>
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
                        </Link>
                    ))
                    : [1, 2, 3, 4].map((el, index) => (
                        <div key={index} className={'h-[230px] w-full bg-slate-200 animate-pulse rounded-lg'}></div>
                    ))}
            </div>
        </div>
    );
}

export default Listing;