"use client"
import React, {useEffect, useState} from 'react';
import {supabase} from "@/utils/client";
import {usePathname} from "next/navigation";
import {toast} from "sonner";
import {AdType} from "@/app/(routes)/edit-ad/[id]/page";
import Slider from "@/app/(routes)/view-ad/_components/Slider";
import AdDetails from "@/app/(routes)/view-ad/_components/AdDetails";

function ViewAd() {
    useEffect(() => {
        listingDetails()
    }, [])
    const params = usePathname()
    const paramsId = params.split('/')[2]
    const [ad, setAd] = useState<AdType>()
    const listingDetails = async ()=> {
        const {data, error} = await supabase
            .from('listing')
            .select(`*, listingImagesTable(
                url,
                listing_id
                )`)
            .eq('id', paramsId)
            .eq('active', true)
        if (data) {
            setAd(data[0])
        }
        if (error) {
            toast(`Error while fetching ad`)
        }
    }
    return (
        <section className={'mt-16 p-10'}>
            <div className={'px-4 md:px-32 lg:px-56 xl:px-80 my-3'}>
                <Slider images={ad?.listingImagesTable}/>
                <AdDetails details={ad}/>
            </div>
        </section>
    );
}

export default ViewAd;