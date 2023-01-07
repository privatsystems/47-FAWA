import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import TextBubble from "../modules/textBubble"

const Contacts = ({ data, setCount, dataInd, change, setChange }) => {

    const { bubbles, emails, text } = data

    const { ref, inView, entry } = useInView({
        /* Optional options */
        rootMargin: "-370px 0px -370px 0px",
    });

    useEffect(() => {

        inView && setCount(dataInd)
        setChange(dataInd)

    }, [inView, change])

    return <div className='contacts' ref={ref}>

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