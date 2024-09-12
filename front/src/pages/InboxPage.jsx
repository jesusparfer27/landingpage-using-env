import { useState, useEffect } from 'react'

export const InboxPage = () => {

    const [emailList, setEmailList] = useState([])

    useEffect(() => {
        getInboxEmails()
    }, [])

    const getInboxEmails = async () => {
        try {
            const host = import.meta.env.VITE_API_HOST
            const port = import.meta.env.VITE_API_PORT

            const response = await fetch(`${host}:${port}/API/v1/inbox`)
            if (!response.ok) {
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }
            const emailList = await response.json();
            setEmailList(emailList.data)
            console.log(emailList.data)
        } catch (e) {
            console.log("error", e)
        }
    }

    return (
        <section>
            {
                emailList.map(({
                    id,
                    remitente_id, 
                    destinatario_id,
                    asunto,
                    contenido,
                    leido,
                    created_at
                }) => (
                    <div key={id}>
                        <p>{remitente_id}</p>
                        <p>{contenido}</p>
                    </div>
                ))
            }
        </section>
    )
}