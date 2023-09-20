import { format, isAfter } from 'date-fns'
import { fr } from 'date-fns/locale'
import { useEffect, useState } from 'react'

const TableLine = ({ line, color, back }) => {

    const { name, horaire, type, date, link } = line

    const [mob, setMob] = useState(false)

    const today = Date.now()
    const dateEvent = new Date(date)

    useEffect(() => {

        window.innerWidth < 900
            ? setMob(true)
            : setMob(false)
    }, [])

    if (isAfter(today, dateEvent)) return

    return <div className='event_table_line'>
        {link ? <a href={`${link}`} target="_blank" rel="noreferrer">
            <div>{date && format(new Date(date), 'EEEEE dd.MM', { awareOfUnicodeTokens: true, locale: fr })}</div>
            {!mob && <div>{horaire && horaire}</div>}
            <div>{name && name}{type && <span className='type'>{type}</span>}</div>
            {/* <div>{prix}</div> */}
        </a>
            : <>
                <div>{date && format(new Date(date), 'EEEEE dd.MM', { awareOfUnicodeTokens: true, locale: fr })}</div>
                {!mob && <div>{horaire && horaire}</div>}
                <div>{name && name}{type && <span className='type'>{type}</span>}</div>
                {/* <div>{prix}</div> */}
            </>}
    </div>
}
export default TableLine