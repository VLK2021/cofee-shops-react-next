import React from 'react';
import {useRouter} from "next/router";
import Link from "next/link";



const CoffeeStore = () => {
    const router = useRouter();

    return (
        <div>
            CoffeeStore {router.query.id}  <br/>
            <Link href={'/'}>Back to home</Link>
        </div>
    );
};

export default CoffeeStore;