import TableLine from "./tableLine"

const Table = ({ table }) => {

    return <div className='event_table'>
        <h3>
            Programme des événements à venir
        </h3>
        <div className='event_table_line legend'>
            <div>Date</div>
            <div>Horaires</div>
            <div>Événement</div>
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