import Link from "next/link"
import Image from "next/image"
import styles from "@/styles/EventItem.module.css"

export default function EventItem({event}) {
  return (
    console.log(event),
    <div className={styles.event}>
        <div className={styles.img}>
            <Image 
                src={event.image.data?.attributes ? event.image.data.attributes.formats.thumbnail.url : '/images/event-default.png'} 
                width={170} 
                height={100} 
            />
        </div>

        <div className={styles.info}>
            <span>
                {new Date(event.date).toDateString()} at {event.time}
            </span>
            <h3>{event.name}</h3>
        </div>

        <div className={styles.link}>
            <Link legacyBehavior href={`/events/${event.slug}`}>
                <a className="btn">Details</a>
            </Link>
        </div>
    </div>
  )
}
