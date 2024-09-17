// InboxPage.jsx
import { NavLink, Routes, Route } from 'react-router-dom';
import { EmailsModal } from '../components/EmailsModal'; // Componente para mostrar correos
import '../css/inbox.css';

export const InboxPage = () => {
    return (
        <main className="inboxPage">
            <nav className="columnNav">
                <NavLink 
                    to="inbox"
                    className={({ isActive }) => (isActive ? 'active' : '')}
                >
                    <span className="material-symbols-outlined">inbox</span>
                    Recibidos
                </NavLink>
                <NavLink 
                    to="starred"
                    className={({ isActive }) => (isActive ? 'active' : '')}
                >
                    <span className="material-symbols-outlined">star</span>
                    Destacados
                </NavLink>
                <NavLink 
                    to="sent"
                    className={({ isActive }) => (isActive ? 'active' : '')}
                >
                    <span className="material-symbols-outlined">send</span>
                    Enviados
                </NavLink>
                <NavLink 
                    to="archived"
                    className={({ isActive }) => (isActive ? 'active' : '')}
                >
                    <span className="material-symbols-outlined">bookmark</span>
                    Archivados
                </NavLink>
                <NavLink 
                    to="deleted"
                    className={({ isActive }) => (isActive ? 'active' : '')}
                >
                    <span className="material-symbols-outlined">folder_delete</span>
                    Eliminados
                </NavLink>
            </nav>
            <section className="contentSection">
                <Routes>
                    <Route path="inbox" element={<EmailsModal type="inbox" />} />
                    <Route path="starred" element={<EmailsModal type="starred" />} />
                    <Route path="sent" element={<EmailsModal type="sent" />} />
                    <Route path="archived" element={<EmailsModal type="archived" />} />
                    <Route path="deleted" element={<EmailsModal type="deleted" />} />
                </Routes>
            </section>
        </main>
    );
};
