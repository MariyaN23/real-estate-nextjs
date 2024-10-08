"use client"
import React, {useEffect} from 'react';
import GoogleAddressSearch from "@/app/_components/GoogleAddressSearch";
import {Button} from "@/components/ui/button";
import {supabase} from "@/utils/client";
import {useUser} from "@clerk/nextjs";
import {toast} from "sonner";
import {Loader} from "lucide-react";
import {useRouter} from "next/navigation";

function AddNewAd() {
    const {user} = useUser()
    useEffect(() => {
        if (!user) {
            router.replace(`/sign-in`)
        }
    }, [])
    const router = useRouter()
    const [selectedAddress, setSelectedAddress] = React.useState<any>()
    const [coordinates, setCoordinates] = React.useState<{lat: number, lng: number}>()
    const [loading, setLoading] = React.useState(false)
    const continueHandler = async () => {
        setLoading(true)
        const {data, error} = await supabase
            .from('listing')
            .insert([{
                address: selectedAddress.label,
                coordinates: coordinates,
                createdBy: user?.primaryEmailAddress?.emailAddress
            },
            ])
            .select()
        if (data) {
            setLoading(false)
            router.replace(`/edit-ad/${data[0].id}`)
        }
        if (error) {
            toast("Error while adding address")
            setLoading(false)
        }
    }
    return (
        <section className={'mt-10 md:mx-56 lg:mx-80'}>
            <div className={'flex flex-col gap-5 mt-28 items-center justify-center'}>
                <h2 className={'font-bold text-2xl'}>Add new Ad</h2>
                <div className={'p-10 rounded-lg border w-full shadow-md flex flex-col gap-5'}>
                    <h2 className={'text-gray-500'}>Enter address which you want to add</h2>
                    <GoogleAddressSearch
                        selectedAddress={(value) => {
                            setSelectedAddress(value)
                        }}
                        setCoordinates={(value) => {
                            setCoordinates(value)
                        }}/>
                    <Button disabled={!selectedAddress || !coordinates || loading}
                            onClick={continueHandler}>
                        {loading ? <Loader className={'animate-spin'}/> : 'Continue'}
                    </Button>
                </div>
            </div>
        </section>
    );
}

export default AddNewAd;