import { useRef } from "react"
import ImageWrapper from "../modules/imageWrapper"
import TextBubble from "../modules/textBubble"

const Apropos = ({ data }) => {

    const { bubbles, images } = data

    return <div className='apropos'>

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
                />
            })}
        </div>

    </div>

}
export default Apropos