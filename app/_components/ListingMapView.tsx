"use client"
import React, {useEffect, useState} from 'react';
import Listing from "@/app/_components/Listing";
import GoogleMap from "@/app/_components/GoogleMap";
import {supabase} from "@/utils/client";
import {AdType} from "@/app/(routes)/edit-ad/[id]/page";
import {toast} from "sonner";

type ListingMapViewType = {
    type: 'rent' | 'sell'
}

function ListingMapView({type}: ListingMapViewType) {
    const [ads, setAds] = useState<AdType[]>([])
    const getLatestListing = async ()=> {
        const {data, error} = await supabase
            .from('listing')
            .select(`*, listingImagesTable(
                url,
                listing_id
                )`)
            .eq('active', true)
            .eq('type', type)
            .order('id', {ascending: false})
        if (data) {
            setAds(data)
        }
        if (error) {
            toast("Error while fetching ads")
        }
    }
    useEffect(() => {
        getLatestListing()
    }, [])
    return (
        <div className={'grid grid-cols-1 md:grid-cols-2'}>
            <Listing allAds={ads}/>
            <GoogleMap/>
        </div>
    );
}

export default ListingMapView;