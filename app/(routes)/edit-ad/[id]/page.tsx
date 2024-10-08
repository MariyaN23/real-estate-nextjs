"use client"
import React, {useEffect, useState} from 'react';
import {Label} from "@/components/ui/label"
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {FormikHelpers, useFormik} from "formik";
import {usePathname, useRouter} from "next/navigation";
import {supabase} from "@/utils/client";
import {toast} from "sonner";
import {useUser} from "@clerk/nextjs";
import UploadFile, {listingImage} from "@/app/(routes)/edit-ad/_components/UploadFile";
import {Textarea} from "@/components/ui/textarea";
import {Loader} from "lucide-react";
import PublishAdAlert from "@/app/(routes)/edit-ad/_components/PublishAdAlert";
import {CoordinatesType} from "@/app/_components/ListingMapView";

type FormikValuesType = {
    type: string
    propertyType: string
    bedroom: number
    bathroom: number
    builtIn: number
    parking: string
    lotSize: number
    area: number
    price: number
    hoa: number
    description: string
    profileImage: string | undefined
    fullName: string | null | undefined
}

export type AdType = FormikValuesType & {
    listingImagesTable: listingImage[]
    id: number
    address: string
    coordinates: CoordinatesType
    createdBy: string
}

function EditAd() {
    const params = usePathname()
    const idFromParams = params.split('/')[2]
    const {user} = useUser()
    const router = useRouter()
    const [adInfo, setAdInfo] = useState<AdType>()
    const [images, setImages] = useState<FileList | null | undefined>()
    const [loading, setLoading] = useState(false)
    const checkIsItUsersRecord = async () => {
        if (user) {
            const {data, error} = await supabase
                .from('listing')
                .select('*, listingImagesTable(listing_id, url)')
                .eq('createdBy', user.primaryEmailAddress?.emailAddress)
                .eq('id', idFromParams)
            if (data) {
                setAdInfo(data[0])
            }
            if (!data?.length) {
                router.replace('/')
            }
        }
    }
    useEffect(() => {
        user && checkIsItUsersRecord()
    }, [user])
    const onSubmitFormHandler = async (formValues: FormikValuesType) => {
        setLoading(true)
        const {data, error} = await supabase
            .from('listing')
            .update(formValues)
            .eq('id', idFromParams)
            .select()
        if (data) {
            toast("Your ad updated and published")
            setLoading(false)
        }
        if (images?.length) {
            for (const img of images) {
                setLoading(true)
                const file = img
                const fileName = Date.now().toString()
                const fileExt = fileName.split('.').pop()
                const {data, error} = await supabase.storage
                    .from('listingImages')
                    .upload(fileName, file, {
                        contentType: `image/${fileExt}`,
                        upsert: false
                    })
                if (error) {
                    toast("Error while uploading images")
                } else {
                    const imageURL = process.env.NEXT_PUBLIC_IMAGE_URL + fileName
                    const {data, error} = await supabase
                        .from('listingImagesTable')
                        .insert([
                            {
                                url: imageURL,
                                listing_id: idFromParams
                            }
                        ])
                        .select()
                }
            }
            setLoading(false)
        }
        if (error) {
            toast("Error while updating ad")
        }
    }
    const formik = useFormik({
        initialValues: {
            type: '',
            propertyType: '',
            bedroom: 0,
            bathroom: 0,
            builtIn: 0,
            parking: '',
            lotSize: 0,
            area: 0,
            price: 0,
            hoa: 0,
            description: '',
            profileImage: user?.imageUrl,
            fullName: user?.fullName
        },
        onSubmit: async (values, formikHelpers: FormikHelpers<FormikValuesType>) => {
            await onSubmitFormHandler(values)
        }
    })
    return (<section className={'mt-24 my-10 px-10 md:px-36'}>
            <h2 className={'font-bold text-2xl'}>Enter more details</h2>
            <form onSubmit={formik.handleSubmit}>
                <div className={'p-4 rounded-lg shadow-md'}>
                    <div className={'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'}>
                        <div className={'flex flex-col gap-2'}>
                            <h2 className={'text-lg text-slate-500'}>Rent or sell?</h2>
                            <RadioGroup onValueChange={(e) => formik.values.type = e}>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="rent" id="rent"/>
                                    <Label htmlFor="rent">Rent</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="sell" id="sell"/>
                                    <Label htmlFor="sell">Sell</Label>
                                </div>
                            </RadioGroup>
                        </div>
                        <div className={'flex flex-col gap-2'}>
                            <h2 className={'text-lg text-slate-500'}>Property type</h2>
                            <Select onValueChange={(e) => formik.values.propertyType = e}
                                    defaultValue={adInfo?.propertyType}>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue
                                        placeholder={adInfo?.propertyType ? adInfo?.propertyType : "Select property type"}/>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Single Family House">Single Family House</SelectItem>
                                    <SelectItem value="Town House">Town House</SelectItem>
                                    <SelectItem value="Apartment">Apartment</SelectItem>
                                    <SelectItem value="Studio Apartment">Studio Apartment</SelectItem>
                                    <SelectItem value="Condominium">Condominium</SelectItem>
                                    <SelectItem value="Duplex">Duplex</SelectItem>
                                    <SelectItem value="Multi Family House">Multi Family House</SelectItem>
                                    <SelectItem value="Loft">Loft</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <div className={'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-5'}>
                        <div className={'flex flex-col gap-2'}>
                            <h2 className={'text-lg text-slate-500'}>Bedroom</h2>
                            <Input placeholder={'Ex. 2'} name={'bedroom'} type={'number'} min={'0'}
                                   defaultValue={adInfo?.bedroom}
                                   onChange={formik.handleChange}/>
                        </div>
                        <div className={'flex flex-col gap-2'}>
                            <h2 className={'text-lg text-slate-500'}>Bathroom</h2>
                            <Input placeholder={'Ex. 1'} name={'bathroom'} type={'number'} min={'0'}
                                   defaultValue={adInfo?.bathroom}
                                   onChange={formik.handleChange}/>
                        </div>
                        <div className={'flex flex-col gap-2'}>
                            <h2 className={'text-lg text-slate-500'}>Built In</h2>
                            <Input placeholder={'Ex. 1990'} name={'builtIn'} type={'number'} min={'0'}
                                   defaultValue={adInfo?.builtIn}
                                   onChange={formik.handleChange}/>
                        </div>
                    </div>
                    <div className={'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-5'}>
                        <div className={'flex flex-col gap-2'}>
                            <h2 className={'text-lg text-slate-500'}>Parking</h2>
                            <Input placeholder={'Ex. Yes'} name={'parking'}
                                   defaultValue={adInfo?.parking}
                                   onChange={formik.handleChange} maxLength={10}/>
                        </div>
                        <div className={'flex flex-col gap-2'}>
                            <h2 className={'text-lg text-slate-500'}>Lot size (sq.m)</h2>
                            <Input placeholder={'Ex. 100'} name={'lotSize'} type={'number'} min={'0'}
                                   defaultValue={adInfo?.lotSize}
                                   onChange={formik.handleChange}/>
                        </div>
                        <div className={'flex flex-col gap-2'}>
                            <h2 className={'text-lg text-slate-500'}>Area (sq.m)</h2>
                            <Input placeholder={'Ex. 100'} name={'area'} type={'number'} min={'0'}
                                   defaultValue={adInfo?.area}
                                   onChange={formik.handleChange}/>
                        </div>
                    </div>
                    <div className={'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-5'}>
                        <div className={'flex flex-col gap-2'}>
                            <h2 className={'text-lg text-slate-500'}>Selling Price ($)</h2>
                            <Input placeholder={'Ex. 100000'} name={'price'} type={'number'} min={'0'}
                                   defaultValue={adInfo?.price}
                                   onChange={formik.handleChange}/>
                        </div>
                        <div className={'flex flex-col gap-2'}>
                            <h2 className={'text-lg text-slate-500'}>HOA (per month, $)</h2>
                            <Input placeholder={'Ex. 100'} name={'hoa'} type={'number'} min={'0'}
                                   defaultValue={adInfo?.hoa}
                                   onChange={formik.handleChange}/>
                        </div>
                    </div>
                    <div className={'grid grid-cols-1 mt-5 mb-10'}>
                        <div className={'flex flex-col gap-2'}>
                            <h2 className={'text-lg text-slate-500'}>Description</h2>
                            <Textarea placeholder={'Information about your property'}
                                      name={'description'}
                                      className={'min-h-40'}
                                      defaultValue={adInfo?.description}
                                      onChange={formik.handleChange}/>
                        </div>
                    </div>
                    <div>
                        <h2 className={'text-lg text-slate-500 mb-5'}>Upload your property images</h2>
                        <UploadFile setImages={(value) => setImages(value)}
                                    imagesList={adInfo?.listingImagesTable}
                        />
                    </div>
                    <div className={'flex gap-7 justify-end mt-2'}>
                        <Button disabled={loading} type={'submit'} variant={'outline'}>
                            {loading ? <Loader className={'animate-spin'}/> : 'Save'}
                        </Button>
                        <PublishAdAlert idFromParams={idFromParams}/>
                    </div>
                </div>
            </form>
        </section>
    )
}

export default EditAd;