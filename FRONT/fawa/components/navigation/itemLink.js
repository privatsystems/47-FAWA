import { useState } from "react"

const ItemLink = ({ color, back, label, link }) => {

    const [hover, setHover] = useState(false)

    const handleMouseEnter = () => {

        setHover(true)

    }

    const handleMouseLeave = () => {

        setHover(false)

    }

    return <div 
    className={`navigation_item`}
    style={{ 
        color: hover && link ? back : color,
        backgroundColor : hover && link ? color : back,
        cursor: link && 'pointer'
    }}
    onMouseEnter={handleMouseEnter}
    onMouseLeave={handleMouseLeave}
    >
        <a href={link}>{label}</a>
    </div>

}
export default ItemLink