import classNames from "class-names"
import gsap from 'gsap'
import { ScrollToPlugin } from 'gsap/dist/ScrollToPlugin'
import { useState } from "react"
import { navigationData } from "../../assets/data/navigationData"

const Item = ({ item, count, setCount, index }) => {

    const [hover, setHover] = useState(false)

    const handleMouseEnter = () => {

        setHover(true)

    }

    const handleMouseLeave = () => {

        setHover(false)

    }

    const handleClick = () => {

        const section = document.querySelector(`.part_content[data-ind='${index + 1}'`)
        let offset
        index + 1 == 1
            ? offset = 30
            : offset = -260

        if (window.innerWidth > 900) {
            index + 1 == 1
                ? offset = 30
                : offset = -260
        } else {
            index + 1 == 1
                ? offset = 30
                : offset = -100
        }

        console.log(offset)

        const tl = gsap.timeline()
            .to(window, {
                duration: 0.5,
                scrollTo: { y: section, offsetY: offset },
                ease: 'Power3.in',
                onComplete: (() => { setCount(index + 1) })
            })

    }

    return <div
        className='navigation_item'
        data-menu={index}
        style={{
            color: count == navigationData[index].index || hover ? navigationData[count - 1].color : navigationData[count - 1].back,
            backgroundColor: count == navigationData[index].index || hover ? navigationData[count - 1].bub : navigationData[count - 1].color,
            cursor: 'pointer'
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        dangerouslySetInnerHTML={{ __html: item.name }}
    ></div>

}
export default Item