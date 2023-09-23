import moment from 'moment/moment'
import { FaImage } from 'react-icons/fa'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useState } from "react"
import { useRouter } from "next/router"
import Link from "next/link"
import Image from 'next/image'
import Layout from "@/components/Layout"
import { API_URL } from "@/config/index"
import styles from "@/styles/Form.module.css"
import slugify from 'slugify'

export default function EditEventPage({event}) {
  const [values, setValues] = useState({
    name: event.data.attributes.name,
    performers: event.data.attributes.performers,
    venue: event.data.attributes.venue,
    address: event.data.attributes.address,
    date: event.data.attributes.date,
    time: event.data.attributes.time,
    description: event.data.attributes.description,
    slug: event.data.attributes.slug,
  })

  const [imagePreview, setImagePreview] = useState(event.data.attributes.image.data ? event.data.attributes.image.data.attributes.formats.thumbnail.url : null)

  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    const hasEmptyFields = Object.values(values).some((element) => element === '')

    if (hasEmptyFields) {
      toast.error('Please fill in all fields')
    }

    const res = await fetch(`${API_URL}/api/events/${event.data.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({data:values})
    })

    if(!res.ok) {
      if (res.status === 400) {
        toast.error('Something went wrong. Check event does not already exist.')
      } else {
        toast.error('Something Went Wrong')
      }
    } else {
      const result = await res.json()
      const event = result.data.attributes
      router.push(`/events/${event.slug}`)
    }
  }

  const createSlug = (e) => {
    const slug = slugify(`${values.name}-${moment(values.date).format('yyyy-MM-DD')}-${values.venue}`, {lower: true})
    setValues({...values, ['slug']: slug})
    console.log(slug)
  }

  const handleInputChange = (e) => {
    const {name, value} = e.target
    setValues({...values, [name]: value})
  }

  return (
    <Layout title='Add New Event'>
        <Link href='/events'>Go Back</Link>
        <h1>Edit Event</h1>
        <ToastContainer />

        <form onClick={createSlug} onSubmit={handleSubmit} className={styles.form}>
        
          <div className={styles.grid}>

            <div>
              <label htmlFor='name'>Event Name</label>
                <input 
                  type='text' 
                  id='name' 
                  name='name' 
                  value={values.name} 
                  onChange={handleInputChange}
                />
            </div>

            <div>
              <label htmlFor='performers'>Performers</label>
                <input
                  type='text'
                  name='performers'
                  id='performers'
                  value={values.performers}
                  onChange={handleInputChange}
                />
            </div>

            <div>
              <label htmlFor='venue'>Venue</label>
                <input
                  type='text'
                  name='venue'
                  id='venue'
                  value={values.venue}
                  onChange={handleInputChange}
                />
            </div>

            <div>
              <label htmlFor='address'>Address</label>
                <input
                  type='text'
                  name='address'
                  id='address'
                  value={values.address}
                  onChange={handleInputChange}
                />
            </div>

            <div>
              <label htmlFor='date'>Date</label>
                <input
                  type='date'
                  name='date'
                  id='date'
                  value={moment(values.date).format('yyyy-MM-DD')}
                  onChange={handleInputChange}
                />
            </div>

            <div>
              <label htmlFor='time'>Time</label>
                <input
                  type='text'
                  name='time'
                  id='time'
                  value={values.time}
                  onChange={handleInputChange}
                />
            </div>
          </div>

          <div>
            <label htmlFor='description'>Event Description</label>
              <textarea
                type='text'
                name='description'
                id='description'
                value={values.description}
                onChange={handleInputChange}
              ></textarea>
          </div>

          <input type='submit' value='Update Event' className='btn' />
          
        </form>

        <h2>Event Image</h2>
        {imagePreview ? (
          <Image src={imagePreview} height={100} width={170}/>
          ) : (
            <div>
              <p>No Image uploaded</p>
            </div>
        )}

        <div>
          <button className="btn-secondary">
            <FaImage /> Set Image
          </button>
        </div>
    </Layout>
  )
}

export async function getServerSideProps({params: {id}}) {
  const res = await fetch(`${API_URL}/api/events/${id}?populate=*`)
  const event = await res.json()  

  console.log(event)
  console.log(event.data.attributes.image.data)

  return {
    props: {
      event
    }
  }
}
