import React, {useState} from 'react';
import {useRouter} from "next/router";
import Link from "next/link";
import cls from "classnames";
import Image from "next/image";

import styles from '../../styles/coffee-store.module.css';
import {fetchCoffeeStores} from "../../lib/coffee-stores";


export async function getStaticProps(staticProps) {
    const params = staticProps.params;
    console.log('params',params);

    const coffeeStores = await fetchCoffeeStores();
    console.log('coffeeStores',coffeeStores);

    const findCoffeeStoreById = coffeeStores.find(coffeeStore => {
            return coffeeStore.id.toString() === params.id;
        });
    console.log('findCoffeeStoreById',findCoffeeStoreById);

    return {
        props: {
            coffeeStore: findCoffeeStoreById ? findCoffeeStoreById : {}
        },
    };
}

export async function getStaticPaths() {
    const coffeeStores = await fetchCoffeeStores();
    const paths = coffeeStores.map(coffeeStore => {
        return {
            params: {
                id: coffeeStore.id.toString()
            },
        };
    });

    return {
        paths,
        fallback: true,
    };
}


const CoffeeStore = (props) => {
    const { coffeeStore } = props;
    console.log(coffeeStore);

    const router = useRouter();
    const [votingCount, setVotingCount] = useState(0);

    const {id, name, imgUrl, address, postcode, timezone} = coffeeStore;

    const handleUpvoteButton = () => {

    }

    if (router.isFallback) {
        return <div>Loading...</div>;
    }


    return (
        <div className={styles.layout}>
            <div className={styles.container}>
                <div className={styles.col1}>
                    <div className={styles.backToHomeLink}>
                        <Link href="/">← Back to home</Link>
                    </div>
                    <div className={styles.nameWrapper}>
                        <h1 className={styles.name}>{name}</h1>
                    </div>

                    <div className={styles.storeImgWrapper}>
                        <Image
                            src={
                                imgUrl ||
                                "https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
                            }
                            width={600}
                            height={360}
                            className={styles.storeImg}
                            alt={name || 'foto'}
                        />
                    </div>
                </div>

                <div className={cls("glass", styles.col2)}>
                    {address && (
                        <div className={styles.iconWrapper}>
                            <Image
                                src="/static/icons/places.svg"
                                width="24"
                                height="24"
                                alt="places icon"
                            />
                            <p className={styles.text}>{address}</p>
                        </div>
                    )}
                    {postcode && (
                        <div className={styles.iconWrapper}>
                            <Image
                                src="/static/icons/nearMe.svg"
                                width="24"
                                height="24"
                                alt="near me icon"
                            />
                            <p className={styles.text}>Post code: {postcode}</p>
                        </div>
                    )}
                    {timezone && (
                        <div className={styles.iconWrapper}>
                            <Image
                                src="/static/icons/nearMe.svg"
                                width="24"
                                height="24"
                                alt="near me icon"
                            />
                            <p className={styles.text}>{timezone}</p>
                        </div>
                    )}
                    <div className={styles.iconWrapper}>
                        <Image
                            src="/static/icons/star.svg"
                            width="24"
                            height="24"
                            alt="star icon"
                        />
                        <p className={styles.text}>{votingCount}</p>
                    </div>

                    <button className={styles.upvoteButton} onClick={handleUpvoteButton}>
                        Up vote!
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CoffeeStore;