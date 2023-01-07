import { useEffect } from "react"
import { useInView } from "react-intersection-observer"
import ImageWrapper from "../modules/imageWrapper"
import TextBubble from "../modules/textBubble"

const Restaurant = ({ data, setCount, dataInd, change, setChange }) => {

    const { bubbles, images, horaires } = data

    const { ref, inView, entry } = useInView({
        /* Optional options */
        rootMargin: "-370px 0px -370px 0px",
    });

    useEffect(() => {

        inView && setCount(dataInd)
        setChange(dataInd)

    }, [inView, change])

    return <div className={`${inView} restaurant`} ref={ref}>

        <div className='bubles'>
            {bubbles.map((bubble, index) => {
                return <TextBubble key={`buble-${index}-${bubble.text}`} bubble={bubble}/>
            })}
        </div>

        <div 
        className='horaire'
        >
            <h3>Le Restaurant est ouvert</h3>
            <div className='text_content' dangerouslySetInnerHTML={{ __html: horaires.text }}></div>
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
export default Restaurant