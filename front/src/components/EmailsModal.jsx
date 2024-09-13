// EmailsModal.js
import '../css/emails.css'
import { useState, useEffect } from 'react';

export const EmailsModal = ({ type }) => {
    const [emailList, setEmailList] = useState([]);

    useEffect(() => {
        fetchEmailsByType(type); // Llama a la función correcta dependiendo del tipo
    }, [type]);

    const fetchEmailsByType = async (type) => {
        try {
            const host = import.meta.env.VITE_API_HOST;
            const port = import.meta.env.VITE_API_PORT;
            let endpoint = '';

            // Cambia el endpoint según el tipo
            switch (type) {
                case 'inbox':
                    endpoint = '/API/v1/inbox';
                    break;
                case 'archived':
                    endpoint = '/API/v1/archived';
                    break;
                case 'deleted':
                    endpoint = '/API/v1/deleted';
                    break;
                case 'sent':
                    endpoint = '/API/v1/sent';
                    break;
                default:
                    endpoint = '/API/v1/inbox';
            }

            const response = await fetch(`${host}:${port}${endpoint}`);
            if (!response.ok) {
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }
            const emailList = await response.json();
            setEmailList(emailList.data);
            console.log(emailList.data);
        } catch (e) {
            console.log("Error", e);
        }
    };

    return (
        <section className='emailModal'>
    {emailList.map(({ id, remitente_id, destinatario_id, asunto, contenido, leido, created_at, nombre }) => (
        <div key={id}>
            <div className="emailInformation">
                <div className="emailActions">
                    <button className='buttonsModal'>
                        <span className="material-symbols-outlined">delete</span>
                    </button>
                    <button className='buttonsModal'>
                        <span className="material-symbols-outlined">bookmark</span>
                    </button>
                </div>
                <strong className="emailName">{nombre}</strong>
                <p className="emailContent">{contenido}</p>
            </div>
            <hr />
        </div>
    ))}
</section>

    );
};
