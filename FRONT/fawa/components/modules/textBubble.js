import { useCallback, useRef } from "react"
import { gsap } from 'gsap'


const TextBubble = ({ bubble }) => {

    // const options = {
    //     root: null,
    //     rootMargin: '100px',
    //      threshold: 0.2
    // }
    // const observer = useRef()
    // const refImage = useCallback( 
    //     (node) => {
    //         observer.current = new IntersectionObserver((entries) => {
    //             if (entries[0].isIntersecting) {
                    
    //                 if(!entries[0]?.target.classList.contains('appeared')) {
    //                     entries[0]?.target.classList.add('appeared')
    //                     gsap.timeline()
    //                     .to(entries[0]?.target, {
    //                         duration: 0.5,
    //                         opacity: 1,
    //                         y: 100
    //                     },)
    //                     .from(entries[0]?.target, {
    //                         duration: 2.5,
    //                         ease:"elastic.out(1, 0.3)",
    //                         y: 100
    //                     }, '-= 0.3')
    //                     observer.current.unobserve(node) 
    //                 }
    //             }
    //         }, options)
    //         if (node) 
    //             observer.current.observe(node)
    // },[])

    return <div 
    className="buble_text"
    // ref={refImage}
    >
        <div dangerouslySetInnerHTML={{ __html: bubble.text}}></div>
    </div>

}
export default TextBubble