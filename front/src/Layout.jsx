import Footer from "./components/Footer";
import { useState, useEffect } from 'react';
import './landing.css'; // Importar el archivo CSS

const Layout = () => {
    const [landingContent, setLandingContent] = useState([]);

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        try {
            const response = await fetch('http://localhost:3000/API/v1/landing');
            if (!response.ok) {
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }
            const landingContent = await response.json();
            setLandingContent(landingContent);
            console.log(landingContent);
        } catch (err) {
            console.log(err, "error");
        }
    };

    return (
        <>
            <main>
                {landingContent.map(({
                    id,
                    appImage,
                    mockupImg,
                    icono,
                    iconImage,
                    color,
                    titulo,
                    contenido,
                    isImageRight,
                    imgAppStore,
                    isTextAndImagesInWhite,
                    isIconImageWhite,
                    isMockupAtTop
                }) => (
                    <div key={id} className="section" style={{ backgroundColor: color }}>
                        <div className={`flexSections ${isImageRight ? 'right' : 'left'}`}>
                            <div className="sectionContent">
                                {isImageRight ? (
                                    <>
                                        <div className="leftSection">
                                            <img
                                                className="mockupImg"
                                                style={{
                                                    marginBottom: isMockupAtTop ? '2rem' : '0',
                                                    marginTop: !isMockupAtTop ? '2rem' : '0',
                                                    top: isMockupAtTop ? '0' : 'auto',
                                                }}
                                                src={`http://localhost:3000/${mockupImg}`}
                                                alt="Mockup"
                                            />
                                        </div>
                                        <div className="rightSection">
                                            <div className="appImageContainer"> {/* Nuevo contenedor para appImage */}
                                                {appImage && (
                                                    <img
                                                        src={`http://localhost:3000/${appImage}`}
                                                        alt="App"
                                                        className="roboto-regular" // Aplica la fuente Roboto aquí si es necesario
                                                        style={{ maxWidth: '100%' }}
                                                    />
                                                )}
                                            </div>
                                            <div className="textContent roboto-regular"> {/* Aplica la fuente Roboto aquí */}
                                                <h1 className={isTextAndImagesInWhite ? 'textWhite' : ''}>{titulo}</h1>
                                                <p className={isTextAndImagesInWhite ? 'textWhite' : ''}>{contenido}</p>
                                                {iconImage && (
                                                    <img
                                                        src={`http://localhost:3000/${iconImage}`}
                                                        alt="Icon"
                                                        className={isIconImageWhite ? 'iconWhite' : 'iconBlack'}
                                                        style={{ maxWidth: '100%' }}
                                                    />
                                                )}
                                            </div>
                                            <div className="appStoreContainer"> {/* Contenedor para aplicar gap */}
                                                {imgAppStore && (
                                                    <img
                                                        src={`http://localhost:3000/${imgAppStore}`}
                                                        alt="App Store"
                                                        className="roboto-regular" // Aplica la fuente Roboto aquí si es necesario
                                                        style={{ maxWidth: '100%' }}
                                                    />
                                                )}
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className="rightSection">
                                            <div className="appImageContainer"> {/* Nuevo contenedor para appImage */}
                                                {appImage && (
                                                    <img
                                                        src={`http://localhost:3000/${appImage}`}
                                                        alt="App"
                                                        className="roboto-regular" // Aplica la fuente Roboto aquí si es necesario
                                                        style={{ maxWidth: '100%' }}
                                                    />
                                                )}
                                            </div>
                                            <div className="textContent roboto-regular"> {/* Aplica la fuente Roboto aquí */}
                                                <h1 className={isTextAndImagesInWhite ? 'textWhite' : ''}>{titulo}</h1>
                                                <p className={isTextAndImagesInWhite ? 'textWhite' : ''}>{contenido}</p>
                                                {iconImage && (
                                                    <img
                                                        src={`http://localhost:3000/${iconImage}`}
                                                        alt="Icon"
                                                        className={isIconImageWhite ? 'iconWhite' : 'iconBlack'}
                                                        style={{ maxWidth: '100%' }}
                                                    />
                                                )}
                                            </div>
                                            <div className="appStoreContainer"> {/* Contenedor para aplicar gap */}
                                                {imgAppStore && (
                                                    <img
                                                        src={`http://localhost:3000/${imgAppStore}`}
                                                        alt="App Store"
                                                        className="roboto-regular" // Aplica la fuente Roboto aquí si es necesario
                                                        style={{ maxWidth: '100%' }}
                                                    />
                                                )}
                                            </div>
                                        </div>
                                        <div className="leftSection">
                                            <img
                                                className="mockupImg"
                                                style={{
                                                    marginBottom: isMockupAtTop ? '2rem' : '0',
                                                    marginTop: !isMockupAtTop ? '2rem' : '0',
                                                    top: isMockupAtTop ? '0' : 'auto',
                                                }}
                                                src={`http://localhost:3000/${mockupImg}`}
                                                alt="Mockup"
                                            />
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </main>
            <Footer />
        </>
    );
};

export default Layout;
