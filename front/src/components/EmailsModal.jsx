import '../css/emails.css';
import { useState, useEffect } from 'react';

export const EmailsModal = ({ type }) => {
    const [emailList, setEmailList] = useState([]);

    useEffect(() => {
        fetchEmailsByType(type); // Llama a la función correcta dependiendo del tipo
    }, [type]);

    const fetchEmailsByType = async (type) => {
        try {
            let endpoint = '';

            // Cambia el endpoint según el tipo
            switch (type) {
                case 'inbox':
                    endpoint = 'API/v1/inbox';
                    break;
                case 'archived':
                    endpoint = 'API/v1/archived';
                    break;
                case 'deleted':
                    endpoint = 'API/v1/deleted';
                    break;
                case 'sent':
                    endpoint = 'API/v1/sent';
                    break;
                default:
                    endpoint = 'API/v1/inbox';
            }

            // Obtén el token del localStorage
            const token = localStorage.getItem('authToken');
        console.log('Token:', token); // Verifica que el token está presente

        const response = await fetch(`http://localhost:3000/${endpoint}`, {
            headers: {
                'Authorization': `Bearer ${token}` // Incluye el token en los encabezados
            }
        });

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

    const handleDelete = async (id) => {
        try {
            const token = localStorage.getItem('authToken'); // Obtén el token del localStorage

            const response = await fetch(`/API/v1/emails/${id}/delete`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}` // Incluye el token en los encabezados
                }
            });

            if (response.ok) {
                fetchEmailsByType(type); // Actualiza la lista de correos
            } else {
                console.log('Error al eliminar el correo');
            }
        } catch (e) {
            console.log("Error", e);
        }
    };

    const handleArchive = async (id) => {
        try {
            const token = localStorage.getItem('authToken'); // Obtén el token del localStorage

            const response = await fetch(`/API/v1/emails/${id}/archive`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}` // Incluye el token en los encabezados
                }
            });

            if (response.ok) {
                fetchEmailsByType(type); // Actualiza la lista de correos
            } else {
                console.log('Error al archivar el correo');
            }
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
                            <button className='buttonsModal' onClick={() => handleDelete(id)}>
                                <span className="material-symbols-outlined">delete</span>
                            </button>
                            <button className='buttonsModal' onClick={() => handleArchive(id)}>
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
