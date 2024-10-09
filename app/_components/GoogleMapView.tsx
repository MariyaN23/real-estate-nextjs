import React, {useEffect, useState} from 'react'
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import {CoordinatesType} from "@/app/_components/ListingMapView";
import {AdType} from "@/app/(routes)/edit-ad/[id]/page";
import MarkerForMap from "@/app/_components/MarkerForMap";

type GoogleMapViewType = {
    coordinates: CoordinatesType | undefined
    ads: AdType[]
    defZoom: number
}

const containerStyle = {
    width: '100%',
    height: '80vh',
    borderRadius: '10px'
}

const options = {
    gestureHandling: 'greedy'
}

function GoogleMapView({coordinates, ads, defZoom}: GoogleMapViewType) {
    const [center, setCenter] = useState({
        lat: 53.9006011,
        lng: 27.558972
    })
    useEffect(() => {
        coordinates && setCenter(coordinates)
    }, [coordinates])
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: `${process.env.NEXT_PUBLIC_GOOGLE_PLACE_API_KEY}`
    })

    const [map, setMap] = React.useState(null)

    const onLoad = React.useCallback(function callback(map: any) {
        const bounds = new window.google.maps.LatLngBounds(center)
        //map.fitBounds(bounds)
        setMap(map)
    }, [])

    const onUnmount = React.useCallback(function callback(map: any) {
        setMap(null)
    }, [])

    return isLoaded ? (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={defZoom}
            onLoad={onLoad}
            onUnmount={onUnmount}
            options={options}
        >
            {ads.map((ad, index)=> (
                <MarkerForMap key={index} item={ad}/>
            ))}
        </GoogleMap>
    ) : <></>
}

export default React.memo(GoogleMapView)