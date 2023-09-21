import Layout from "@/components/Layout"
import { API_URL } from "@/config"
import styles from "@/styles/Event.module.css"
import Link from "next/link"
import Image from "next/image"
import { FaPencilAlt, FaTimes } from "react-icons/fa"

export default function EventPage({event}) {
  const deleteEvent = (e) => {
    console.log('delete')
  }

  return (
    <Layout>
        <div className={styles.event}>

          <div className={styles.controls}>
            <Link legacyBehavior href={`/events/edit/${event.id}`}>
              <a>
                <FaPencilAlt /> Edit Event
              </a>
            </Link>
            <a href="#" className={styles.delete} onClick={deleteEvent}> 
              <FaTimes /> Delete Event
            </a>
          </div>

          <span>
            {new Date(event.date).toDateString()} at {event.time}
          </span>
          <h1>{event.name}</h1>
          {event.image && (
            <div className={styles.image}>
              <Image src={event.image.data.attributes.formats.medium.url} width={960} height={600}></Image>
            </div>
          )}

          <h3>Peformers:</h3>
          <p>{event.performers}</p>
          <h3>Description</h3>
          <p>{event.description}</p>
          <h3>Venue: {event.venue}</h3>
          <p>{event.address}</p>

          <Link legacyBehavior href='/events'>
            <a className={styles.back}>
              {'<'} Go Back
            </a>
          </Link>
        </div>
    </Layout>
  )
}

export async function getStaticPaths() {
  const res = await fetch(`${API_URL}/api/events`)
  const results = await res.json()
  const events = results.data

  const paths = events.map(event => ({
    params: {slug: event.attributes.slug}
  }
  ))

  return {
    paths,
    fallback: true,
  }
}

export async function getStaticProps({params: {slug}}) {
  const res = await fetch(`${API_URL}/api/events?populate=*&filters[slug][$eq]=${slug}`)
  const results = await res.json()
  const event = results.data[0].attributes

  return {
    props: {
      event: event
    },
    revalidate: 1
  }
}

// export async function getServerSideProps({query: {slug}}) {
//   const res = await fetch(`${API_URL}/api/events/${slug}`)
//   const events = await res.json()

//   return {
//     props: {
//       event: events[0]
//     }
//   }
// }
