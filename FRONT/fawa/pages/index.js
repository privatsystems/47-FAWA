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


  const [mob, setMob] = useState(false)

  useEffect(() => {

    window.addEventListener('scroll', handleScroll)

  })

  useEffect(() => {

    window?.innerHeight < 800
    ? setMob(true)
    : setMob(false)

  }, [])

  useEffect(() => {
    setHeight(window.innerHeight)
  })

  const handleScroll = () => {

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

    window.removeEventListener('scroll', handleScroll)

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
                  transform: mob ? `scaleY(${(topTopH - wHeight) / wHeight * -1 * 4})` :`scaleY(${(topTopH - wHeight) / wHeight * -1})`,
                  transformOrigin: '50% 0% 0px',
                  height: '25.7vh'
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
                  transform: mob ? `scaleY(${(bottomTopH - wHeight) / wHeight * -1 * 4})` :`scaleY(${(bottomTopH - wHeight) / wHeight * -1})`,
                  height: '25.7vh',
                  transformOrigin: mob ? '100% 100% 0px' : '50% 0% 0px',
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
    const site = await fetch(`https://fawa.privat.systems/home.json`)
      .then((response) => {
        return response.json()
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

