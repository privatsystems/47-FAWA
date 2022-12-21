import { useEffect, useState } from "react"

const ItemLink = ({ color, back, label, mobLabel,  link }) => {

    const [hover, setHover] = useState(false)
    const [mob, setMob] = useState(false)

    const handleMouseEnter = () => {

        setHover(true)

    }

    const handleMouseLeave = () => {

        setHover(false)

    }

    useEffect(() => {

        window.innerWidth > 800
        ? setMob(false) : setMob(true)

    }, [])

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
        <a href={link} target="_blank" rel="noreferrer">{mob ? mobLabel : label}</a>
    </div>

}
export default ItemLink