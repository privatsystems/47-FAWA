import { useEffect, useRef, useState } from 'react'
import Head from 'next/head'
import Fa from '../components/logo/fa'
import Wa from '../components/logo/wa'
import styles from '../styles/Home.module.css'
import Apropos from '../components/apropos'
import Restaurant from '../components/restaurant'
import Navigation from '../components/navigation'
import { navigationData } from '../assets/data/navigationData'
import Events from '../components/events'
import Contacts from '../components/contacts'
import FaMob from '../components/logo/faMob'
import WaMob from '../components/logo/waMob'
import { detect } from 'detect-browser';


export default function Home({ data }) {

  const { apropos, restaurant, events, contacts, infos, seo } = data
  const [count, setCount] = useState(1)
  const [mob, setMob] = useState(false)
  const [browser, setBrowser] = useState('none')

  const content = useRef()
  const top = useRef()
  const bottom = useRef()


  useEffect(() => {

    setBrowser(detect())

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }

  }, []);

  useEffect(() => {

    testMob()
    window.addEventListener('resize', testMob)

    return () => {
      window.removeEventListener('resize', testMob)
    }
  }, [])

  const testMob = () => {

    window.innerWidth < 800
      ? setMob(true)
      : setMob(false)

  }

  const sectionRefs = {
    1: useRef(null),
    2: useRef(null),
    3: useRef(null),
    4: useRef(null),
  };

  const handleScroll = () => {

    const windowHeight = window.innerHeight;

    for (let i = 1; i <= 4; i++) {
      const sectionRef = sectionRefs[i].current;
      if (sectionRef) {
        const { top, bottom } = sectionRef.getBoundingClientRect();
        if (top < windowHeight / 2 && bottom > windowHeight / 2) {
          setCount(i);
          break;
        }
      }
    }

    const container = content.current
    const scroll = container?.getBoundingClientRect().top * -1
    const limit = container?.getBoundingClientRect().height

    if (window.innerWidth > 900) {
      if (scroll >= limit - windowHeight - 2) {

        window.scrollTo({ top: 6, left: 0 })

      }

      if (scroll < 2) {

        window.scrollTo({ top: limit - windowHeight - 6, left: 0 })

      }
    } else {
      if (scroll >= limit - windowHeight - 2) {

        window.scrollTo({ top: 6, left: 0 })

      }

      if (scroll < 2) {

        window.scrollTo({ top: limit - windowHeight - 6, left: 0 })

      }
    }




  }


  return (
    <div className={browser.name + ' ' + browser.os}>

      <Head>
        <title>{seo.title_site + " | " + seo.base_site}</title>
        <meta
          name="format-detection"
          content="telephone=no, date=no, email=no, address=no"
        />
        <meta name="og:title" content={seo.title_site + "|" + seo.base_site} />
        <meta name="description" content={seo.description} />
        <meta name="og:description" content={seo.description} />
        <meta property="og:url" content="https://fawa-wafa.org" />
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:site_name" content={seo.title_site} />
        <meta property="og:image" content={seo.image_seo.value} />
        <meta property="og:type" content='website' />
      </Head>

      <main id="content" className={count} ref={content}
        style={{
          '--color': navigationData[count - 1].color,
          '--back': navigationData[count - 1].back,
          '--bub': navigationData[count - 1].bub,
          '--small': navigationData[count - 1].small,
        }}>
        <section className="page home smooth-scroll" data-namespace="home" data-menu='home' dir="ltr">
          <div className='part top' ref={top}>
            <div
              className="sub_wrapper"
            >
              {!mob && <div><Fa /></div>}
              {mob && <div><FaMob /></div>}
              {!mob && <div><Wa /></div>}
              {mob && <div><WaMob /></div>}
            </div>
          </div>
          <div className='content'>
            <div className='part_content' data-ind={1} ref={sectionRefs[1]}><Apropos data={apropos} /></div>
            <div className='part_content' data-ind={2} ref={sectionRefs[2]} ><Restaurant data={restaurant} /></div>
            <div className='part_content' data-ind={3} ref={sectionRefs[3]} ><Events data={events} /></div>
            <div className='part_content' data-ind={4} ref={sectionRefs[4]} ><Contacts data={contacts} /></div>
          </div>
          <div className='part bot' ref={bottom}>
            <div
              className="sub_wrapper"
            >
              {!mob && <div><Fa /></div>}
              {mob && <div><FaMob /></div>}
              {!mob && <div><Wa /></div>}
              {mob && <div><WaMob /></div>}
            </div>
          </div>
        </section>
      </main>
      <Navigation count={count} infos={infos} setCount={setCount} />
      <svg width="0" height="0" xmlns="http://www.w3.org/2000/svg" version="1.1">
        <defs>
          <filter id="instagram">
            <feGaussianBlur in="SourceGraphic" stdDeviation="7" result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 90 -10" result="goo" />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
        </defs>
      </svg>
    </div>
  )
}

export const getServerSideProps = async () => {

  try {
    const site = await fetch(`https://back.fawa-wafa.org/home.json`)
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

