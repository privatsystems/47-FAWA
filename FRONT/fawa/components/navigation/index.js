import { navigationData } from "../../assets/data/navigationData"
import Item from "./item"
import ItemLink from "./itemLink"

const Navigation = ({ count, infos, setCount }) => {

    const itemSelect = navigationData.find((e) => count == e.index)

    return <nav className="navigation">
        <div className='parts'>
            {navigationData.map((item, index) => {
                return <Item 
                item={item} 
                count={count} 
                index= {index}
                setCount={setCount}
                key={`item_navigation-${index}-${item.name}`} />
            })}
        </div>

        <div className='links'>
            <ItemLink
            color={itemSelect.color}
            back={itemSelect.back}
            label='11 bis Place Auguste Baron, 75019 Paris'
            mobLabel='Adresse'
            link='https://goo.gl/maps/aSNArD5tnpuW8io17'
            />
            <ItemLink
            color={itemSelect.color}
            back={itemSelect.back}
            label='IG'
            mobLabel='IG'
            link='https://www.instagram.com/fawa__wafa/'
            />
            <ItemLink
            color={itemSelect.color}
            back={itemSelect.back}
            label='FB'
            mobLabel='FB'
            link='https://www.facebook.com/projetfawa?mibextid=LQQJ4d'
            />
        </div>
    </nav>

}
export default Navigation