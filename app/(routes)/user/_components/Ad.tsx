import React from 'react';
import Link from "next/link";
import {Button} from "@/components/ui/button";
import {Edit, Trash} from "lucide-react";
import OneAd from "@/app/_components/OneAd";
import {AdType} from "@/app/(routes)/edit-ad/[id]/page";
import {supabase} from "@/utils/client";
import {toast} from "sonner";

type AdPropsType = {
    ad: AdType
}

function Ad({ad}: AdPropsType) {
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
        <div className={'relative'}>
                                <span
                                    className={'bg-primary text-white absolute top-3 left-3 px-2 text-sm p-1 rounded-l'}>
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
    );
}

export default Ad;