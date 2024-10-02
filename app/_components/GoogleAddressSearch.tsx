"use client"
import React from 'react';
import GooglePlacesAutocomplete, {geocodeByAddress, getLatLng} from "react-google-places-autocomplete";
import {MapPin} from "lucide-react";

type GoogleAddressSearchType = {
    selectedAddress: (place: any) => void
    setCoordinates: (coordinates: {lat: number, lng: number}) => void
}

function GoogleAddressSearch({selectedAddress, setCoordinates}: GoogleAddressSearchType) {
    return (
        <div className={'flex items-center w-full'}>
            <MapPin className={'h-10 w-10 p-2 rounded-l-lg text-primary bg-slate-100'}/>
            <GooglePlacesAutocomplete
                apiKey={process.env.NEXT_PUBLIC_GOOGLE_PLACE_API_KEY}
                selectProps={{
                    placeholder: "Search property address",
                    isClearable: true,
                    className: 'w-full',
                    onChange: (place)=> {
                            selectedAddress(place)
                        if (place?.label) {
                        geocodeByAddress(place.label)
                            .then(res => getLatLng(res[0]))
                            .then(({lat, lng})=> {
                                setCoordinates({lat, lng})
                            })
                        }
                    }
                }}/>
        </div>
    );
}

export default GoogleAddressSearch;