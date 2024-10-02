"use client"
import React, {useEffect} from 'react';
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
}

function EditAd() {
    const params = usePathname()
    const {user} = useUser()
    const router = useRouter()
    const checkIsItUsersRecord = async () => {
        if (user) {
            const {data, error} = await supabase
                .from('listing')
                .select('*')
                .eq('createdBy', user.primaryEmailAddress?.emailAddress)
                .eq('id', params.split('/')[2])
            if (!data?.length) {
                router.replace('/')
            }
        }
    }
    useEffect(() => {
        user && checkIsItUsersRecord()
    }, [user])
    const onSubmitFormHandler = async (formValues: FormikValuesType) => {
        const {data, error} = await supabase
            .from('listing')
            .update(formValues)
            .eq('id', params.split('/')[2])
            .select()
        if (data) {
            toast("Your ad updated and published")
            console.log(data)
        }
        if (error) {
            toast("Error while updating ad")
        }
    }
    const formik = useFormik({
        initialValues: {
            type: 'rent',
            propertyType: '',
            bedroom: 0,
            bathroom: 0,
            builtIn: 0,
            parking: '',
            lotSize: 0,
            area: 0,
            price: 0,
            hoa: 0,
            description: ''
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
                            <RadioGroup defaultValue="rent" onValueChange={(e) => formik.values.type = e}>
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
                            <Select onValueChange={(e) => formik.values.propertyType = e}>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Select property type"/>
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
                                   onChange={formik.handleChange}/>
                        </div>
                        <div className={'flex flex-col gap-2'}>
                            <h2 className={'text-lg text-slate-500'}>Bathroom</h2>
                            <Input placeholder={'Ex. 1'} name={'bathroom'} type={'number'} min={'0'}
                                   onChange={formik.handleChange}/>
                        </div>
                        <div className={'flex flex-col gap-2'}>
                            <h2 className={'text-lg text-slate-500'}>Built In</h2>
                            <Input placeholder={'Ex. 1990'} name={'builtIn'} type={'number'} min={'0'}
                                   onChange={formik.handleChange}/>
                        </div>
                    </div>
                    <div className={'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-5'}>
                        <div className={'flex flex-col gap-2'}>
                            <h2 className={'text-lg text-slate-500'}>Parking</h2>
                            <Input placeholder={'Ex. Free parking available'} name={'parking'}
                                   onChange={formik.handleChange}/>
                        </div>
                        <div className={'flex flex-col gap-2'}>
                            <h2 className={'text-lg text-slate-500'}>Lot size (sq.m)</h2>
                            <Input placeholder={'Ex. 100'} name={'lotSize'} type={'number'} min={'0'}
                                   onChange={formik.handleChange}/>
                        </div>
                        <div className={'flex flex-col gap-2'}>
                            <h2 className={'text-lg text-slate-500'}>Area (sq.m)</h2>
                            <Input placeholder={'Ex. 100'} name={'area'} type={'number'} min={'0'}
                                   onChange={formik.handleChange}/>
                        </div>
                    </div>
                    <div className={'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-5'}>
                        <div className={'flex flex-col gap-2'}>
                            <h2 className={'text-lg text-slate-500'}>Selling Price ($)</h2>
                            <Input placeholder={'Ex. 100000'} name={'price'} type={'number'} min={'0'}
                                   onChange={formik.handleChange}/>
                        </div>
                        <div className={'flex flex-col gap-2'}>
                            <h2 className={'text-lg text-slate-500'}>HOA (per month, $)</h2>
                            <Input placeholder={'Ex. 100'} name={'hoa'} type={'number'} min={'0'}
                                   onChange={formik.handleChange}/>
                        </div>
                    </div>
                    <div className={'grid grid-cols-1 mt-5'}>
                        <div className={'flex flex-col gap-2'}>
                            <h2 className={'text-lg text-slate-500'}>Description</h2>
                            <Input placeholder={'Information about your property'}
                                   name={'description'}
                                   className={'max-w-100 h-16'}
                                   onChange={formik.handleChange}/>
                        </div>
                    </div>
                    <div className={'flex gap-7 justify-end mt-5'}>
                        <Button type={'submit'} variant={'outline'}>Save</Button>
                        <Button type={'submit'}>Save and Publish</Button>
                    </div>
                </div>
            </form>
        </section>
    )
}

export default EditAd;