import React from 'react';
import Header from "@/app/_components/Header";

type ProviderProps = {
    children: React.ReactNode
}

function Provider({children}: ProviderProps) {
    return (
        <div>
            <Header/>
            <div>
                {children}
            </div>
        </div>
    );
}

export default Provider;