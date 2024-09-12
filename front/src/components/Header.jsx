import { useModal } from '../context/ModalContext';

const Header = () => {
    const { openModal } = useModal();

    return (
        <header>
            <div className="leftDiv">
                {/* Otros contenidos */}
            </div>
            <button onClick={openModal}>Iniciar sesión</button>
        </header>
    );
};

export default Header;
