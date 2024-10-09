import React, {useEffect, useState} from 'react';
import {supabase} from "@/utils/client";
import {useUser} from "@clerk/nextjs";
import {toast} from "sonner";
import {AdType} from "@/app/(routes)/edit-ad/[id]/page";
import Ad from "@/app/(routes)/user/_components/Ad";

function UsersAds() {
    const {user} = useUser()
    const [usersAds, setUsersAds] = useState<AdType[]>([])
    const getUserAds = async () => {
        if (user) {
            const {data, error} = await supabase
                .from('listing')
                .select('*, listingImagesTable(listing_id, url)')
                .eq('createdBy', user.primaryEmailAddress?.emailAddress)
            if (data) {
                setUsersAds(data)
            }
            if (error) {
                toast("Error while getting users ads")
            }
        }
    }
    useEffect(() => {
        getUserAds()
    }, [usersAds])
    const adsForSell = usersAds.filter(ad => ad.type === 'sell')
    const adsForRent = usersAds.filter(ad => ad.type === 'rent')
    return (
        <section>
            {adsForSell.length ? <h2 className={'font-bold text-2xl text-primary'}>For sale</h2> : ''}
            <div className={'grid grid-cols-1 md:grid-cols-2 gap-2'}>
                {adsForSell.map((sell, index) => (
                    <div key={index}>
                        <Ad ad={sell}/>
                    </div>
                ))}
            </div>
            {adsForRent.length ? <h2 className={'font-bold text-2xl text-primary'}>For rent</h2> : ''}
            <div className={'grid grid-cols-1 md:grid-cols-2 gap-2'}>
                {adsForRent.map((rent, index) => (
                    <div key={index}>
                        <Ad ad={rent}/>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default UsersAds;