import { useEffect, useRef, useState } from 'react'
import Head from 'next/head'
import Fa from '../components/logo/fa'
import Wa from '../components/logo/wa'
import styles from '../styles/Home.module.css'
import Apropos from '../components/apropos'
import Restaurant from '../components/restaurant'
import axios from 'axios'
import Navigation from '../components/navigation'
import { navigationData } from '../assets/data/navigationData'
import Events from '../components/events'
import Contacts from '../components/contacts'

export default function Home({ data }) {

  const { apropos, restaurant, events, contacts, infos } = data 
  const [topTopH, setTop] = useState(1)
  const [bottomTopH, setBottom] = useState(1)
  const [wHeight, setHeight] = useState(764)
  const [count, setCount] = useState(1)

  const content = useRef()
  const top = useRef()
  const bottom = useRef()

  const partsArray = navigationData

  useEffect(() => {

    window.addEventListener('scroll', handleResize)

  })

  useEffect(() => {
    setHeight(window.innerHeight)
  })

  const handleResize = () => {

    const windowHeight = window.innerHeight

    const wrapperTop = top.current
    const topTop = wrapperTop?.getBoundingClientRect().top * -1
    setTop(topTop)

    const wrapperBottom = bottom.current
    const topBottom = wrapperBottom?.getBoundingClientRect().top
    setBottom(topBottom)

    const container = content.current
    const scroll = container?.getBoundingClientRect().top * -1
    const limit = container?.getBoundingClientRect().height

    if(scroll >= limit - windowHeight - 2) {

      window.scrollTo({top: 3, left: 0})
      count + 1 <= partsArray.length
      ? setCount(count + 1)
      : setCount(1)

    }

    if(scroll < 2) {

      window.scrollTo({top: limit - windowHeight - 3, left: 0})
      count - 1 >= 1
      ? setCount(count - 1)
      : setCount(partsArray.length)

    }

    window.removeEventListener('scroll', handleResize)

  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main id="content" ref={content}>
        <section className="page home smooth-scroll" data-namespace="home" data-menu='home' dir="ltr">
            <div className='part top' ref={top}>
                <div 
                className="sub_wrapper"
                style= {{
                  transform: `scaleY(${(topTopH - wHeight) / wHeight * -1})`,
                  transformOrigin: '50% 0% 0px',
                }}
                >
                  <div><Fa /></div>
                  <div><Wa /></div>
                </div>
            </div>
            <div className='content'>
              {count == 1 && <Apropos data={apropos}/>}
              {count == 2 && <Restaurant data={restaurant}/>}
              {count == 3 && <Events data={events}/>}
              {count == 4 && <Contacts data={contacts}/>}
            </div>
            <div className='part bot' ref={bottom}>
                <div 
                className="sub_wrapper"
                style={{
                  transform: `scaleY(${(bottomTopH - wHeight) / wHeight * -1})`,
                  transformOrigin: '50% 100% 0px',
                }}>
                  <div><Fa /></div>
                  <div><Wa /></div>
                </div>
            </div>
        </section>
      </main>
      <Navigation count={count} infos={infos} setCount={setCount}/>
      <svg width="0" height="0" xmlns="http://www.w3.org/2000/svg" version="1.1">
        <defs>
            <filter id="instagram">
                <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />    
                <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 90 -10" result="goo" />
                <feComposite in="SourceGraphic" in2="goo" operator="atop"/>
            </filter>
        </defs>
      </svg>
    </div>
  )
}

export const getServerSideProps = async () => {

  try{
    // const site = await axios.get(`http://localhost:8080/${locale}/home.json`)
    const site = await axios.get(`https://privat.systems/home.json`)
      .then((response) => {
        console.log(response.data)
        return response.data
    })

    return {
      props: { 
        data: site,
      }
    };

  } catch (error) {
    return (console.error('Home.getServerSideProps.erroooooor', error))
  }
  
}

