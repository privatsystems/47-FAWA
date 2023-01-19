import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import TextBubble from "../modules/textBubble"

const Contacts = ({ data, setCount, dataInd, change, setChange }) => {

    const { bubbles, emails, text } = data

    const [ root, setRoot ] = useState("-370px 0px -370px 0px")

    useEffect(() => {

        window.innerWidth > 800
        ? setRoot("-370px 0px -370px 0px")
        : setRoot("-300px 0px -300px 0px")

    })

    const { ref, inView, entry } = useInView({
        /* Optional options */
        rootMargin: root,
    });

    useEffect(() => {

        console.log('inviex', dataInd)
        inView && setCount(dataInd)
        setChange(dataInd)

    }, [inView, change])

    return <div className={`${inView} contacts`} ref={ref}>

        <div className='bubles'>
            {bubbles.map((bubble, index) => {
                return <TextBubble key={`buble-${index}-${bubble.text}`} bubble={bubble}/>
            })}
        </div>

        <div className='contacts_content'>
            <h3>Contactez Nous !</h3>
            <div className='content_text'>
                <div>
                    {emails.map((email, index) => {
                        return <p key={`${email.label}-${email.id}`}>{email.label}<br/><a href={`mailto:${email.email}`}>{email.email}</a></p>
                    })}
                </div>
                <div dangerouslySetInnerHTML={{ __html: text }}/>
            </div>
        </div>
    </div>

}
export default Contacts