import Layout from "@/components/Layout";
import DashboardEvent from "@/components/DashboardEvent";
import { API_URL } from "@/config";
import { parseCookies } from "@/helpers";
import styles from "@/styles/Dashboard.module.css";

export default function DashboardPage({ events }) {
    const deleteEvent = (id) => {
        console.log(id);
    };

    return (
        <Layout title="User Dashboard">
            <div className={styles.dash}>
                <h1>Dashboard</h1>
                <h3>My Events</h3>

                {events.map((event) => (
                    <DashboardEvent
                        key={event.id}
                        event={event}
                        handleDelete={deleteEvent}
                    />
                ))}
            </div>
        </Layout>
    );
}

export async function getServerSideProps({ req }) {
    const { token } = parseCookies(req);

    const res = await fetch(`${API_URL}/api/events/me`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    const events = await res.json();

    return {
        props: {
            events,
        },
    };
}
