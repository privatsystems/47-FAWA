import { useCallback, useEffect, useRef, useState } from 'react'
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
import { useInView } from 'react-intersection-observer';

export default function Home({ data }) {

  const { apropos, restaurant, events, contacts, infos } = data 
  const [count, setCount] = useState(1)
  const [change, setChange] = useState(1)


  const content = useRef()
  const top = useRef()
  const bottom = useRef()

  const options = {
    root: null,
    rootMargin: '100px',
     threshold: 0.01
}

  const refSection = useCallback( 
    (node) => {
    observer.current = new IntersectionObserver((entries) => {
        // entries[0].target.dataset.ind == 3 && console.log('3', entries[0])
        // console.log('3', entries[0])
        if (entries[0].isIntersecting) {

          if(!entries[0]?.target.classList.contains('select')) {
                
                const index = entries[0]?.target.dataset.ind
                document.querySelector('.part_content.select')?.classList.remove('select')
                setCount(index)
                document.querySelector(`.navigation_item[data-menu="${index}"]`)?.classList.add('select')
                entries[0]?.target.classList.add('select')
                
            }
        }
    }, options)
    if (node) 
        observer.current.observe(node)
    
  },[])

  useEffect(() => {

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
    
  
  }, []);

  const handleScroll = () => {

    const windowHeight = window.innerHeight

    const container = content.current
    const scroll = container?.getBoundingClientRect().top * -1
    const limit = container?.getBoundingClientRect().height

    if(scroll >= limit - windowHeight - 2) {

      window.scrollTo({top: 6, left: 0})

    }

    if(scroll < 2) {

      window.scrollTo({top: limit - windowHeight - 6, left: 0})

    }

  }

  const [mob, setMob] = useState(false)

  useEffect(() => {

    window?.innerWidth < 800
    ? setMob(true)
    : setMob(false)

  }, [])


  return (
    <div className={styles.container}>
      
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
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
                  <div><Fa /></div>
                  <div><Wa /></div>
                </div>
            </div>
            <div className='content'>
              <div className='part_content' data-ind={1}><Apropos data={apropos} setCount={setCount} setChange={setChange} change={change} dataInd={1} /></div>
              <div className='part_content' data-ind={2}><Restaurant data={restaurant} setCount={setCount} setChange={setChange} change={change} dataInd={2} /></div>
              <div className='part_content' data-ind={3}><Events data={events} setCount={setCount} setChange={setChange} change={change} dataInd={3} /></div>
              <div className='part_content' data-ind={4}><Contacts data={contacts} setCount={setCount} setChange={setChange} change={change} dataInd={4} /></div>
            </div>
            <div className='part bot' ref={bottom}>
                <div 
                className="sub_wrapper"
                >
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
                <feGaussianBlur in="SourceGraphic" stdDeviation="7" result="blur" />    
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

