import { format, isAfter, addDays } from 'date-fns'
import { fr } from 'date-fns/locale'
import { useEffect, useState } from 'react'

const TableLine = ({ line }) => {
    const { name, horaire, type, date, link, prix, datef } = line;

    const today = Date.now();
    const dateEvent = addDays(new Date(date), 1);
    const dateEnd = addDays(new Date(datef), 1);

    const [mob, setMob] = useState(false);
    useEffect(() => {
        const handleResize = () => {
            setMob(window.innerWidth < 900);
        };

        window.addEventListener('resize', handleResize);
        handleResize(); // Initial check on component mount

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    if (datef) {
        if (isAfter(today, dateEnd)) return null;
    } else {
        if (isAfter(today, dateEvent)) return null;
    }


    return (<>
        {link ? (
            <a href={link} target="_blank" rel="noreferrer">
                <div className='event_table_line'>
                    {!datef && date && <div>{format(new Date(date), 'EEEEE dd.MM', { awareOfUnicodeTokens: true, locale: fr })}</div>}
                    {datef && <div>{format(new Date(date), 'EEEEE dd.MM', { awareOfUnicodeTokens: true, locale: fr })} /<br />{format(new Date(datef), 'EEEEE dd.MM', { awareOfUnicodeTokens: true, locale: fr })}</div>}
                    {!mob && <div>{horaire && horaire}</div>}
                    <div>
                        {name && name}
                        {type && <span className='type'>{type}</span>}
                    </div>
                    {prix && <div>{prix}</div>}
                </div>
            </a>
        ) : (
            <div className='event_table_line'>
                {!datef && date && <div>{format(new Date(date), 'EEEEE dd.MM', { awareOfUnicodeTokens: true, locale: fr })}</div>}
                {datef && <div>{format(new Date(date), 'EEEEE dd.MM', { awareOfUnicodeTokens: true, locale: fr })} /<br />{format(new Date(datef), 'EEEEE dd.MM', { awareOfUnicodeTokens: true, locale: fr })}</div>}
                {!mob && <div>{horaire && horaire}</div>}
                <div>
                    {name && name}
                    {type && <span className='type'>{type}</span>}
                </div>
                {prix && <div>{prix}</div>}
            </div>
        )}
    </>);
};

export default TableLine;





