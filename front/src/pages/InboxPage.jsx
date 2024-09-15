// InboxPage.jsx
import { NavLink, Routes, Route } from 'react-router-dom';
import { EmailsModal } from '../components/EmailsModal'; // Importa tu componente EmailsModal
import '../css/inbox.css';

export const InboxPage = () => {
    return (
        <main className="inboxPage">
            <nav className="columnNav">
                <NavLink 
                    to="/inbox" 
                    className={({ isActive }) => (isActive ? 'active' : '')}
                >
                    <span className="material-symbols-outlined">inbox</span>
                    Recibidos
                </NavLink>
                <NavLink 
                    to="/archived" 
                    className={({ isActive }) => (isActive ? 'active' : '')}
                >
                    <span className="material-symbols-outlined">bookmark</span>
                    Archivados
                </NavLink>
                <NavLink 
                    to="/deleted" 
                    className={({ isActive }) => (isActive ? 'active' : '')}
                >
                    <span className="material-symbols-outlined">folder_delete</span>
                    Eliminados
                </NavLink>
                <NavLink 
                    to="/sent" 
                    className={({ isActive }) => (isActive ? 'active' : '')}
                >
                    <span className="material-symbols-outlined">send</span>
                    Enviados
                </NavLink>
            </nav>
            <section className="contentSection">
                <Routes>
                    <Route path="/inbox" element={<EmailsModal type="inbox" />} />
                    <Route path="/archived" element={<EmailsModal type="archived" />} />
                    <Route path="/deleted" element={<EmailsModal type="deleted" />} />
                    <Route path="/sent" element={<EmailsModal type="sent" />} />
                </Routes>
            </section>
        </main>
    );
};
