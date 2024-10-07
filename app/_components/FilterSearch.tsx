import React from 'react';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Bath, BedDouble, DollarSign} from "lucide-react";

type FilterSearchType = {
    setBedCount: (beds: number) => void
    setBathCount: (bath: number) => void
    setPrice: (price: number) => void
    setPropertyType: (type: string | null) => void
}

function FilterSearch({setBedCount, setBathCount, setPrice, setPropertyType}: FilterSearchType) {
    return (
        <div className={'px-3 py-4 grid grid-cols-2 md:flex gap-2'}>
            <Select onValueChange={(value)=> setBedCount(Number(value))}>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Bedroom"/>
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="1">
                        <div className={'flex gap-2'}>
                            <BedDouble className={'h-5 w-5 text-primary'}/>1+
                        </div>
                    </SelectItem>
                    <SelectItem value="2">
                        <div className={'flex gap-2'}>
                            <BedDouble className={'h-5 w-5 text-primary'}/>2+
                        </div>
                    </SelectItem>
                    <SelectItem value="3">
                        <div className={'flex gap-2'}>
                            <BedDouble className={'h-5 w-5 text-primary'}/>3+
                        </div>
                    </SelectItem>
                    <SelectItem value="4">
                        <div className={'flex gap-2'}>
                            <BedDouble className={'h-5 w-5 text-primary'}/>4+
                        </div>
                    </SelectItem>
                    <SelectItem value="5">
                        <div className={'flex gap-2'}>
                            <BedDouble className={'h-5 w-5 text-primary'}/>5+
                        </div>
                    </SelectItem>
                </SelectContent>
            </Select>
            <Select onValueChange={(value)=> setBathCount(Number(value))}>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Bathroom"/>
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="1">
                        <div className={'flex gap-2'}>
                            <Bath className={'h-5 w-5 text-primary'}/>1+
                        </div>
                    </SelectItem>
                    <SelectItem value="2">
                        <div className={'flex gap-2'}>
                            <Bath className={'h-5 w-5 text-primary'}/>2+
                        </div>
                    </SelectItem>
                    <SelectItem value="3">
                        <div className={'flex gap-2'}>
                            <Bath className={'h-5 w-5 text-primary'}/>3+
                        </div>
                    </SelectItem>
                    <SelectItem value="4">
                        <div className={'flex gap-2'}>
                            <Bath className={'h-5 w-5 text-primary'}/>4+
                        </div>
                    </SelectItem>
                    <SelectItem value="5">
                        <div className={'flex gap-2'}>
                            <Bath className={'h-5 w-5 text-primary'}/>5+
                        </div>
                    </SelectItem>
                </SelectContent>
            </Select>
            <Select onValueChange={(value)=> setPrice(Number(value))}>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Price"/>
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="50000">
                        <div className={'flex gap-2'}>
                            <DollarSign className={'h-5 w-5 text-primary'}/>&#62; 50000
                        </div>
                    </SelectItem>
                    <SelectItem value="100000">
                        <div className={'flex gap-2'}>
                            <DollarSign className={'h-5 w-5 text-primary'}/>&#62; 100000
                        </div>
                    </SelectItem>
                    <SelectItem value="500000">
                        <div className={'flex gap-2'}>
                            <DollarSign className={'h-5 w-5 text-primary'}/>&#62; 500000
                        </div>
                    </SelectItem>
                </SelectContent>
            </Select>
            <Select onValueChange={(value)=> value === "All" ? setPropertyType(null) : setPropertyType(value)}>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Property type"/>
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="All">
                        <div className={'flex gap-2'}>All</div>
                    </SelectItem>
                    <SelectItem value="Single Family House">
                        <div className={'flex gap-2'}>Single Family House</div>
                    </SelectItem>
                    <SelectItem value="Town House">
                        <div className={'flex gap-2'}>Town House</div>
                    </SelectItem>
                    <SelectItem value="Apartment">
                        <div className={'flex gap-2'}>Apartment</div>
                    </SelectItem>
                    <SelectItem value="Studio Apartment">
                        <div className={'flex gap-2'}>Studio Apartment</div>
                    </SelectItem>
                    <SelectItem value="Condominium">
                        <div className={'flex gap-2'}>Condominium</div>
                    </SelectItem>
                    <SelectItem value="Duplex">
                        <div className={'flex gap-2'}>Duplex</div>
                    </SelectItem>
                    <SelectItem value="Multi Family House">
                        <div className={'flex gap-2'}>Multi Family House</div>
                    </SelectItem>
                    <SelectItem value="Loft">
                        <div className={'flex gap-2'}>Loft</div>
                    </SelectItem>
                </SelectContent>
            </Select>
        </div>
    );
}

export default FilterSearch;