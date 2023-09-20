import { format, isAfter } from 'date-fns'
import { fr } from 'date-fns/locale'
import { useEffect, useState } from 'react'

const TableLine = ({ line }) => {
    const { name, horaire, type, date, link } = line;
    const [mob, setMob] = useState(false);
    const today = Date.now();
    const dateEvent = new Date(date);

    useEffect(() => {
        const handleResize = () => {
            setMob(window.innerWidth < 900);
        };
        console.log(link);

        window.addEventListener('resize', handleResize);
        handleResize(); // Initial check on component mount

        return () => {
            window.removeEventListener('resize', handleResize);
        };

    }, []);

    if (isAfter(today, dateEvent)) return null;

    return (<>
        {link ? (
            <a href={link} target="_blank" rel="noreferrer">
                <div className='event_table_line'>
                    <div>
                        {date && format(new Date(date), 'EEEEE dd.MM', { awareOfUnicodeTokens: true, locale: fr })}
                    </div>
                    {!mob && <div>{horaire && horaire}</div>}
                    <div>
                        {name && name}
                        {type && <span className='type'>{type}</span>}
                    </div>
                </div>
            </a>
        ) : (
            <div className='event_table_line'>
                <div>
                    {date && format(new Date(date), 'EEEEE dd.MM', { awareOfUnicodeTokens: true, locale: fr })}
                </div>
                {!mob && <div>{horaire && horaire}</div>}
                <div>
                    {name && name}
                    {type && <span className='type'>{type}</span>}
                </div>
            </div>
        )}
    </>);
};

export default TableLine;





