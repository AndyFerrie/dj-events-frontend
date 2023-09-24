import Layout from "@/components/Layout"
import EventItem from "@/components/EventItem"
import { API_URL } from "@/config/index"
import { PER_PAGE } from "@/config/index"
import Pagination from "@/components/Pagination"

export default function EventsPage({events, page, total}) {

  return (
    console.log(page),
    <Layout>
      <h1>Events</h1>
      {events.length === 0 && <h3>No events to show</h3>}

      {events.map(event => (
        <EventItem key={event.id} event={event.attributes} />
      ))}

      <Pagination page={page} total={total}/>

    </Layout>
  )
}

export async function getServerSideProps({query: {page = 1}}) {

  const eventRes = await fetch(`${API_URL}/api/events?populate=*&_sort=date:ASC&pagination[page]=${page}&pagination[pageSize]=${PER_PAGE}`)
  const results = await eventRes.json()
  const events = results.data

  const total = results.meta.pagination.total

  return {
    props: {events, page, total},
  }
}
