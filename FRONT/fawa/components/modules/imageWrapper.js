import classNames from "classnames"
import Image from "next/image"
import { useCallback, useRef } from "react"


const ImageWrapper = ({ image }) => {

    const observer = useRef()
    const options = {
        root: null,
        rootMargin: '100px',
         threshold: 0.6
    }

    
    const refImage = useCallback( 
        (node) => {
            observer.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting) {
                    
                    if(!entries[0]?.target.classList.contains('appeared')) {
                        entries[0]?.target.classList.add('appeared')
                        observer.current.unobserve(node) 
                    }
                }
            }, options)
            if (node) 
                observer.current.observe(node)
    },[])

    const widthClasse = classNames({
        large: image.format == '100%',
        med: image.format == '50%'
    })

    return <div 
    className={`illustration_wrapper ${widthClasse}`}
    style={{
        '--tw': image.dimensions.width,
        '--th': image.dimensions.height,
    }}
    ref={refImage}>
        <Image
        src={image.src}
        width={image.dimensions.width}
        height={image.dimensions.height}
        alt=''
        />
        <div style={{ color: image.color }} dangerouslySetInnerHTML={{ __html: image.caption}}></div>
    </div>

}
export default ImageWrapper