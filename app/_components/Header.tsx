"use client"
import React, {useEffect} from 'react';
import Image from "next/image";
import logo from '../images/logoipsum.svg'
import {Button} from "@/components/ui/button";
import {Plus} from "lucide-react";
import Link from "next/link";
import {usePathname} from "next/navigation";
import {UserButton, useUser} from "@clerk/nextjs";

function Header() {
    const path = usePathname()
    const {isSignedIn, user} = useUser()
    useEffect(() => {

    }, [])
    return (
        <header className={'p-6 px-10 flex justify-between shadow-sm fixed top-0  w-full z-10 bg-white'}>
            <div className={'flex gap-12 items-center'}>
                <Image src={logo} alt={logo} priority={true}/>
                <ul className={'hidden md:flex gap-10'}>
                    <Link href={'/'}><li className={`hover:text-primary font-medium text-sm cursor-pointer ${path === '/' && 'text-primary'}`}>For sale</li></Link>
                    <li className={'hover:text-primary font-medium text-sm cursor-pointer'}>For rent</li>
                    <li className={'hover:text-primary font-medium text-sm cursor-pointer'}>Agent finder</li>
                </ul>
            </div>
            <div className={'flex gap-2'}>
                <Button className={'flex gap-2'}><Plus/>Post Your Ad</Button>
                {isSignedIn
                    ? <UserButton/>
                    : <Link href={'sign-in'}><Button variant={'outline'}>Login</Button></Link>
                }
            </div>
        </header>
    );
}

export default Header;