import { useEffect, useState } from "react"
import { useInView } from "react-intersection-observer"
import ImageWrapper from "../modules/imageWrapper"
import TextBubble from "../modules/textBubble"

const Apropos = ({ data, setCount, dataInd, change, setChange }) => {

    const { bubbles, images } = data

    const [ root, setRoot ] = useState("-370px 0px -370px 0px")

    useEffect(() => {

        window.innerWidth > 900
        ? setRoot("-370px 0px -370px 0px")
        : setRoot("-300px 0px -300px 0px")

    })

    const { ref, inView, entry } = useInView({
        /* Optional options */
        rootMargin: root,
    });

    useEffect(() => {

        inView && setCount(dataInd)
        setChange(dataInd)

    }, [inView, change])

    return <div className={`${inView} apropos`} ref={ref}>

        <div className='bubles'>
            {bubbles.map((bubble, index) => {
                return <TextBubble key={`buble-${index}-${bubble.text}`} bubble={bubble}/>
            })}
        </div>

        <div className='images'>
            {images.map((image, index) => {
                return <ImageWrapper 
                key={`illl-${index}${image.src}`} 
                image={image}
                index={index}
                />
            })}
        </div>

    </div>

}
export default Apropos