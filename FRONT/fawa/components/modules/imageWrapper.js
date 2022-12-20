import classNames from "classnames"
import Image from "next/image"


const ImageWrapper = ({ image }) => {

    const widthClasse = classNames({
        large: image.format == '100%',
        med: image.format == '50%'
    })

    return <div 
    className={`illustration_wrapper ${widthClasse}`}
    style={{
        '--tw': image.dimensions.width,
        '--th': image.dimensions.height,
    }}>
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