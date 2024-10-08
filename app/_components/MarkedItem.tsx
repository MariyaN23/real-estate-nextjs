import React from 'react';
import Image from "next/image";
import {Bath, BedDouble, X} from "lucide-react";
import {AdType} from "@/app/(routes)/edit-ad/[id]/page";
import {Button} from "@/components/ui/button";

type MarkedItemType = {
    selectedItem: AdType
    closeItemHandler: ()=> void
}

function MarkedItem({selectedItem, closeItemHandler}: MarkedItemType) {
    return (
        <div className={'bg-white border-solid border-primary border-2 cursor-pointer rounded-lg w-[204px]'}>
            <X onClick={()=> closeItemHandler()}/>
            <Image src={selectedItem.listingImagesTable[0].url}
                   width={800} height={150} alt={'img preview'}
                   className={'rounded-lg object-cover h-[100px] w-[201px]'}/>
            <div className={'flex mt-2 flex-col gap-2 p-2'}>
                <span className={'font-bold text-xl'}>${selectedItem.price}</span>
                <span className={'flex gap-2 text-sm text-gray-400'}>{selectedItem.address}</span>
                <div className={'flex gap-2 mt-2 justify-between'}>
                    <span className={'flex justify-center items-center w-full gap-2 text-sm bg-slate-200 rounded-md p-2 text-gray-500'}>
                        <BedDouble className={'text-primary h-4 w-4'}/>{selectedItem.bedroom}</span>
                    <span className={'flex justify-center items-center w-full gap-2 text-sm bg-slate-200 rounded-md p-2 text-gray-500'}><Bath className={'text-primary h-4 w-4'}/>{selectedItem.bathroom}</span>
                </div>
                <Button>More Details</Button>
            </div>
        </div>
    );
}

export default MarkedItem;