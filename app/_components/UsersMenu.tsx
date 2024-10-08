import React from 'react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import {UserResource} from "@clerk/types";
import {SignOutButton} from "@clerk/nextjs";
import Link from "next/link";

type UsersMenuType = {
    user: UserResource
}

function UsersMenu({user}: UsersMenuType) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild className={'cursor-pointer'}>
                <Image src={user.imageUrl} alt={'user icon'}
                       width={45} height={45}
                       className={'rounded-full'}/>
            </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator/>
                    <DropdownMenuItem>
                        <Link href={'/user'}>Profile</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <Link href={'/user/my-ads'}>My ads</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <SignOutButton>Logout</SignOutButton>
                    </DropdownMenuItem>
                </DropdownMenuContent>
        </DropdownMenu>
    );
}

export default UsersMenu;