"use client"
import React from 'react';
import Header from "@/app/_components/Header";
import {LoadScript} from "@react-google-maps/api";

type ProviderProps = {
    children: React.ReactNode
}

function Provider({children}: ProviderProps) {
    return (
        <div>
            <LoadScript googleMapsApiKey={`${process.env.NEXT_PUBLIC_GOOGLE_PLACE_API_KEY}`}
                        libraries={['places']}>
                <Header/>
                <div>
                    {children}
                </div>
            </LoadScript>
        </div>
    );
}

export default Provider;