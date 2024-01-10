import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";
import {createApi} from 'unsplash-js';


const unsplash = createApi({
    accessKey: process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY,
});

const getUrlForCoffeeStores = (latLong, query, limit) => {
    return `https://api.foursquare.com/v3/places/search?query=${query}&ll=${latLong}&limit=${limit}`;
}

const getListCoffeeStorePhoto = async () => {
    const photos = await unsplash.search.getPhotos({
        query: "coffee shop",
        perPage: 40,
    });

    const unsplashResults = photos.response.results;
    return unsplashResults.map(result => result.urls["small"]);
}


export const fetchCoffeeStores = async (latLong='42.302708%2C-71.072105', limit = 12) => {
    const photos = await getListCoffeeStorePhoto();

    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: process.env.NEXT_PUBLIC_FOURSQUARE_API_KEY,
        }
    };

    const response = await fetch(
        getUrlForCoffeeStores(
            latLong,
            'coffee',
            limit
        ), options);

    const data = await response.json();
    return data.results.map((result, idx) => {
        return {
            id: result.fsq_id,
            postcode: result.location.postcode,
            timezone: result.timezone,
            address: result.location.address,
            name: result.name,
            imgUrl: photos.length > 0 ? photos[idx] : null,
        }
    });
}

