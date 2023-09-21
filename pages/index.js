import Layout from "@/components/Layout"
import EventItem from "@/components/EventItem"
import { API_URL } from "@/config/index"
import Link from "next/link"

export default function HomePage({events}) {
  return (
    <Layout>
      <h1>Upcoming Events</h1>
      {events.length === 0 && <h3>No events to show</h3>}

      {events.map(event => (
        <EventItem key={event.id} event={event.attributes} />
      )
    )}

    {events.length > 0 && (
      <Link legacyBehavior href="/events"> 
        <a className="btn-secondary">View All Events</a>
      </Link>
    )}

    </Layout>
  )
}

export async function getStaticProps() {
  const res = await fetch(`${API_URL}/api/events?populate=*&_sort=date:ASC&_limit=3`)
  const results = await res.json()
  const events = results.data

  return {
    props: {events},
    revalidate: 1
  }
}
