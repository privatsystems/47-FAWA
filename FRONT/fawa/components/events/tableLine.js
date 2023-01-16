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
    >
        
            <div>{format(new Date(date), 'EEEEE dd.MM', {awareOfUnicodeTokens: true, locale: fr})}</div>
            <div>{horaire}</div>
            <div>{name}<span className='type'>{type}</span> </div>
            <div>{prix}</div>
    </div></a>
}
export default TableLine