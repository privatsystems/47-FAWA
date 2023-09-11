import { useEffect } from 'react'
import '../styles/globals.scss'
import gsap from "gsap"
import { ScrollToPlugin } from 'gsap/dist/ScrollToPlugin'

function MyApp({ Component, pageProps }) {

  useEffect(() => {

    gsap.registerPlugin(ScrollToPlugin);

  }, [])
  console.log('app')
  return <Component {...pageProps} />
}

export default MyApp
