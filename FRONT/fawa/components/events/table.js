import TableLine from "./tableLine"

const Table = ({ table }) => {

    return <div className='event_table'>
        <h3 style= {{
            color: table.color
        }}>
            Programme des événements à venir
        </h3>
        <div 
        className='event_table_line legend'
        style= {{
            color: table.color,
            borderTop: `1px solid ${table.color}`,
            borderBottom: `1px solid ${table.color}`,
        }}>
            <div>Date</div>
            <div>Horaires</div>
            <div>Événement</div>
            <div>Nom</div>
            <div>Prix</div>
        </div>
        {table.table_content.map((line, index) => {
            return <TableLine 
            key={line.name + line.horaire + index} 
            color={table.color} 
            back= {table.back}
            line={line} />
        })}
    </div>

}
export default Table