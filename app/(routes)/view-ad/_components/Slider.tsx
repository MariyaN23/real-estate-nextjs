import React from 'react';
import {Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious} from "@/components/ui/carousel";
import {listingImage} from "@/app/(routes)/edit-ad/_components/UploadFile";
import Image from "next/image";

type SliderType = {
    images: listingImage[] | undefined
}

function Slider({images}: SliderType) {
    return (
        <div>
            {images ? <Carousel>
                <CarouselContent>
                    {images.map((i, index)=> (
                        <CarouselItem key={index}>
                            <Image src={i.url}
                                   alt={'img preview'}
                                   width={800}
                                   height={300}
                                   className={'rounded-xl object-contain h-[300px]'}/>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious/>
                <CarouselNext/>
            </Carousel>
                : <div className={'w-full h-[200px] bg-slate-200 animate-pulse rounded-lg'}></div>}
        </div>
    );
}

export default Slider;