import { format, isAfter } from 'date-fns'
import { fr } from 'date-fns/locale'
import { useState } from 'react'

const TableLine = ({ line, color, back }) => {

    const [hover, setHover] = useState(false)

    const { name, horaire, type, date, prix, link }  = line
    
    const today = Date.now()
    const dateEvent = new Date(date)

    const handleMouseEnter = () => {

        setHover(true)

    }

    const handleMouseLeave = () => {

        setHover(false)

    }

    if(isAfter(today, dateEvent)) return

    return <a href={`${link}`} target="_blank" rel="noreferrer"><div 
    className='event_table_line'
    onMouseEnter={handleMouseEnter}
    onMouseLeave={handleMouseLeave}
    style={{
        borderBottom: `1px solid ${color}`,
        backgroundColor: hover ? color : back,
        color: hover ? back : color,
    }}
    >
        
            <div>{format(new Date(date), 'eeee dd MMMM', {awareOfUnicodeTokens: true, locale: fr})}</div>
            <div>{horaire}</div>
            <div>{type}</div>
            <div>{name}</div>
            <div>{prix}</div>
    </div></a>
}
export default TableLine