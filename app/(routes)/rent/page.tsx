import React from 'react';
import ListingMapView from "@/app/_components/ListingMapView";

function Rent() {
    return (
        <section className={'mt-24 p-10'}>
            <ListingMapView type={'rent'}/>
        </section>
    );
}

export default Rent;