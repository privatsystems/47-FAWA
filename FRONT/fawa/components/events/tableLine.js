import { format, isAfter } from 'date-fns'
import { fr } from 'date-fns/locale'
import { BrowserView } from 'react-device-detect';

const TableLine = ({ line, color, back }) => {

    const { name, horaire, type, date, link } = line

    const today = Date.now()
    const dateEvent = new Date(date)

    console.log('date', date)

    if (isAfter(today, dateEvent)) return

    return <a href={`${link}`} target="_blank" rel="noreferrer"><div
        className='event_table_line'
    >

        <div>{date && format(new Date(date), 'EEEEE dd.MM', { awareOfUnicodeTokens: true, locale: fr })}</div>
        <BrowserView>
            <div>{horaire && horaire}</div>
        </BrowserView>
        <div>{name && name}{type && <span className='type'>{type}</span>} </div>
        {/* <div>{prix}</div> */}
    </div></a>
}
export default TableLine