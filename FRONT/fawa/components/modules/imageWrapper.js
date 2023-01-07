import classNames from "classnames"
import Image from "next/image"
import { useCallback, useRef } from "react"
import { gsap } from 'gsap'


const ImageWrapper = ({ image, index }) => {

    let threshold
    (index % 2) == 0
    ? threshold = 0
    : threshold = 0.3

    const observer = useRef()
    const options = {
        root: null,
        rootMargin: '100px',
        threshold: 0.4
    }

    const refImage = useCallback( 

        (node) => {

            observer.current = new IntersectionObserver((entries) => {

                if (entries[0].isIntersecting) {

                    console.log(entries[0])
                    
                    if(!entries[0]?.target.classList.contains('appeared')) {

                        entries[0]?.target.classList.add('appeared')

                        gsap.timeline()
                        .to(entries[0]?.target, {
                            duration: 0.5,
                            opacity: 1,
                        },)

                        .from(entries[0]?.target, {
                            duration: 2.5,
                            ease:"elastic.out(1, 0.3)",
                            y: 40,
                            delay: threshold,
                            onComplete: () => {
                                entries[0]?.target.classList.remove('appeared')
                            }
                        }, '-=0.3')
                        
                        // observer.current.unobserve(node) 
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
    >
        <Image
        src={image.src}
        width={image.dimensions.width}
        height={image.dimensions.height}
        alt=''
        ref={refImage}
        />
        <div dangerouslySetInnerHTML={{ __html: image.caption}}></div>
    </div>

}
export default ImageWrapper