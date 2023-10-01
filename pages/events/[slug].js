import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "@/components/Layout";
import EventMap from "@/components/EventMap";
import { API_URL } from "@/config";
import styles from "@/styles/Event.module.css";
import Link from "next/link";
import Image from "next/image";

export default function EventPage({ event }) {
    return (
        <Layout>
            <div className={styles.event}>
                <span>
                    {new Date(event.attributes.date).toDateString()} at{" "}
                    {event.attributes.time}
                </span>
                <h1>{event.attributes.name}</h1>
                <ToastContainer />
                {event.attributes.image.data?.attributes && (
                    <div className={styles.image}>
                        <Image
                            src={
                                event.attributes.image.data.attributes.formats
                                    .medium.url
                            }
                            width={960}
                            height={600}
                        ></Image>
                    </div>
                )}

                <h3>Peformers:</h3>
                <p>{event.attributes.performers}</p>
                <h3>Description</h3>
                <p>{event.attributes.description}</p>
                <h3>Venue: {event.attributes.venue}</h3>
                <p>{event.attributes.address}</p>

                <EventMap event={event} />

                <Link legacyBehavior href="/events">
                    <a className={styles.back}>{"<"} Go Back</a>
                </Link>
            </div>
        </Layout>
    );
}

export async function getStaticPaths() {
    const res = await fetch(`${API_URL}/api/events`);
    const results = await res.json();
    const events = results.data;

    const paths = events.map((event) => ({
        params: { slug: event.attributes.slug },
    }));

    return {
        paths,
        fallback: true,
    };
}

export async function getStaticProps({ params: { slug } }) {
    const res = await fetch(
        `${API_URL}/api/events?populate=*&filters[slug][$eq]=${slug}`
    );
    const results = await res.json();

    const event = results.data[0];

    return {
        props: {
            event: event,
        },
        revalidate: 1,
    };
}
