import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";


const getUrlForCoffeeStores = (latLong, query, limit) => {
    return `https://api.foursquare.com/v3/places/search?query=${query}&ll=${latLong}&limit=${limit}`;
}


export const fetchCoffeeStores = async () => {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: process.env.NEXT_PUBLIC_FOURSQUARE_API_KEY,
        }
    };
    const response = await fetch(getUrlForCoffeeStores('42.302708%2C-71.072105', 'coffee', 9), options);
    const data = await response.json();
    return data.results;
}