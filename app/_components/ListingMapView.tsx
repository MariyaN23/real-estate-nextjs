"use client"
import React, {useEffect, useState} from 'react';
import Listing from "@/app/_components/Listing";
import {supabase} from "@/utils/client";
import {AdType} from "@/app/(routes)/edit-ad/[id]/page";
import {toast} from "sonner";
import GoogleMapView from './GoogleMapView';

type ListingMapViewType = {
    type: 'rent' | 'sell'
}

export type CoordinatesType = {
    lat: number
    lng: number
}

function ListingMapView({type}: ListingMapViewType) {
    const [ads, setAds] = useState<AdType[]>([])
    const [searchedAddress, setSearchedAddress] = useState()
    const [bedrooms, setBedrooms] = useState(0)
    const [bathrooms, setBathrooms] = useState(0)
    const [price, setPrice] = useState(0)
    const [propertyType, setPropertyType] = useState<string | null>('')
    const [coordinates, setCoordinates] = useState<CoordinatesType>()
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
    const searchHandleClick = async () => {
        // @ts-ignore
        const searchTerm = searchedAddress?.value.structured_formatting.main_text
        let query: any = supabase
            .from('listing')
            .select(`*, listingImagesTable(
                url,
                listing_id
                )`)
            .eq('active', true)
            .eq('type', type)
            .gte('bedroom', bedrooms)
            .gte('bathroom', bathrooms)
            .gte('price', price)
            //.like('address', `%${searchTerm}%`)
            .order('id', {ascending: false})
        if (propertyType) {
            query = query.eq('propertyType', propertyType)
        }
        if (searchTerm) {
            query = query.like('address', `%${searchTerm}%`)
        }
        const {data, error} = await query
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
        <div className={'grid grid-cols-1 md:grid-cols-2 gap-8'}>
            <Listing allAds={ads}
                     searchHandleClick={searchHandleClick}
                     searchedAddress={setSearchedAddress}
                     setPrice={setPrice}
                     setPropertyType={setPropertyType}
                     setBedCount={setBedrooms}
                     setBathCount={setBathrooms}
                     setCoordinates={setCoordinates}/>
            <div className={'fixed right-10 h-full md:w-[350px] lg:w-[450px] xl:w-[650px]'}>
                <GoogleMapView coordinates={coordinates} ads={ads} defZoom={11}/>
            </div>
        </div>
    );
}

export default ListingMapView;