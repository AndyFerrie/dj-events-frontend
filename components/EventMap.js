import Image from "next/image";
import { useState, useEffect } from "react";
import Map, { Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { setKey, fromAddress } from "react-geocode";

export default function EventMap({ event }) {
    const [lat, setLat] = useState(null);
    const [lng, setLng] = useState(null);
    const [loading, setLoading] = useState(true);
    const [viewport, setViewport] = useState({
        latitude: 40.712772,
        longitude: -73.935242,
        zoom: 14,
    });

    useEffect(() => {
        fromAddress(event.attributes.address)
            .then(({ results }) => {
                const { lat, lng } = results[0].geometry.location;
                setLat(lat);
                setLng(lng);
                setViewport({ ...viewport, latitude: lat, longitude: lng });
                setLoading(false);
            })
            .catch(console.error);
    }, []);

    setKey(process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY);

    if (loading) return false;

    return (
        <Map
            mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN}
            initialViewState={...viewport}
            style={{ width: 800, height: 500 }}
            mapStyle="mapbox://styles/mapbox/streets-v12"
        >
            <Marker longitude={lng} latitude={lat} anchor="bottom">
                <Image src="/images/pin.svg" width={30} height={30} />
            </Marker>
        </Map>
    );
}
