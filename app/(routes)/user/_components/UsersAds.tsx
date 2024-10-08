import React, {useEffect, useState} from 'react';
import {supabase} from "@/utils/client";
import {useUser} from "@clerk/nextjs";
import {toast} from "sonner";
import {AdType} from "@/app/(routes)/edit-ad/[id]/page";
import OneAd from "@/app/_components/OneAd";
import Link from "next/link";
import {Button} from "@/components/ui/button";
import {Edit, Trash} from 'lucide-react';

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
    }, [])
    const deleteAd = async (adId: number) => {
        const {error: imageError} = await supabase
            .from('listingImagesTable')
            .delete()
            .eq('listing_id', adId)
        if (imageError) {
            toast("Error while deleting ad images")
            return
        }
        const {error} = await supabase
            .from('listing')
            .delete()
            .eq('id', adId)
        if (error) {
            toast("Error while deleting ad")
        } else {
            toast("Ad deleted successfully")
        }
    }
    return (
        <section>
            <h2 className={'font-bold text-2xl'}>My ads</h2>
            <div className={'grid grid-cols-1 md:grid-cols-2 gap-2'}>
                {usersAds.map((ad) => (
                    <div>
                        <div className={'relative'}>
                                <span className={'bg-primary text-white absolute top-3 left-3 px-2 text-sm p-1 rounded-l'}>
                                {ad.active ? 'Published' : 'Draft'}
                            </span>
                            <div className={'flex gap-2'}>
                                <Link href={`/edit-ad/${ad.id}`}>
                                    <Button size={'sm'} className={'absolute right-16 top-3'}><Edit/></Button>
                                </Link>
                                <Button size={'sm'} onClick={() => deleteAd(ad.id)} className={'absolute right-3 top-3'}
                                        variant={'destructive'}>
                                    <Trash/>
                                </Button>
                            </div>
                            <Link href={`/view-ad/${ad.id}`}>
                                <OneAd ad={ad}/>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default UsersAds;