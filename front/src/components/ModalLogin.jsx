import { useState } from 'react';
import { useModal } from '../context/ModalContext';
import { useNavigate } from 'react-router-dom'; // Para redirigir después de iniciar sesión
import '../css/modal.css';

const ModalLogin = () => {
    const { closeModal } = useModal();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleClickOutside = (e) => {
        if (e.target.className === 'modalOverlay') {
            closeModal();
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3000/API/v1/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();
            if (data.success) {
                // Redirige al endpoint /inbox si el login es exitoso
                navigate('/inbox');
                closeModal();
            } else {
                // Muestra un error si las credenciales son incorrectas
                setError(data.msg);
            }
        } catch (error) {
            setError('Error al iniciar sesión. Inténtalo de nuevo más tarde.');
        }
    };

    return (
        <div className="modalOverlay" onClick={handleClickOutside}>
            <article className="modalContainer">
                <h3>Log In</h3>
                <form onSubmit={handleLogin}>
                    <div className="emailInput">
                        <p>Introduce your email</p>
                        <input
                            type="text"
                            className={`logInInput ${error ? 'inputError' : ''}`}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="passwordInput">
                        <p>Introduce your password</p>
                        <input
                            type="password"
                            className={`logInInput ${error ? 'inputError' : ''}`}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    {error && <p className="errorText">{error}</p>}
                    <button type="submit">Login</button>
                </form>
            </article>
        </div>
    );
};

export default ModalLogin;
