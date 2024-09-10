import Footer from "./components/Footer";
import React, { useState, useEffect } from 'react'; // Importa React para asegurarte de que useState esté definido
import './landing.css'; // Importar el archivo CSS

const Layout = () => {
    const [landingContent, setLandingContent] = useState([]);
    const [sectionAdvantages, setSectionAdvantages] = useState([]);

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
            const sectionAdvantages = await response.json()
            setLandingContent(landingContent);
            setSectionAdvantages(sectionAdvantages);
            console.log(sectionAdvantages)
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
                    iconImage,
                    color,
                    titulo,
                    contenido,
                    isImageRight,
                    imgAppStore,
                    isTextAndImagesInWhite,
                    isIconImageWhite,
                    isMockupAtTop,
                    isPMarginIn // Asumimos que isPMarginIn es parte del JSON
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
                                            <div className="appImageContainer">
                                                {appImage && (
                                                    <img
                                                        src={`http://localhost:3000/${appImage}`}
                                                        alt="App"
                                                        className="roboto-regular"
                                                        style={{ maxWidth: '100%' }}
                                                    />
                                                )}
                                            </div>
                                            <div className="textContent roboto-regular">
                                                <h1 className={isTextAndImagesInWhite ? 'textWhite' : ''}>{titulo}</h1>
                                                <p className={`${isTextAndImagesInWhite ? 'textWhite' : ''} ${!isPMarginIn ? 'no-margin' : ''}`}>
                                                    {contenido}
                                                </p>
                                                {iconImage && (
                                                    <img
                                                        src={`http://localhost:3000/${iconImage}`}
                                                        alt="Icon"
                                                        className={isIconImageWhite ? 'iconWhite' : 'iconBlack'}
                                                        style={{ maxWidth: '100%' }}
                                                    />
                                                )}
                                            </div>
                                            <div className="appStoreContainer">
                                                {imgAppStore && (
                                                    <img
                                                        src={`http://localhost:3000/${imgAppStore}`}
                                                        alt="App Store"
                                                        className="roboto-regular"
                                                        style={{ maxWidth: '100%' }}
                                                    />
                                                )}
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className="rightSection">
                                            <div className="appImageContainer">
                                                {appImage && (
                                                    <img
                                                        src={`http://localhost:3000/${appImage}`}
                                                        alt="App"
                                                        className="roboto-regular"
                                                        style={{ maxWidth: '100%' }}
                                                    />
                                                )}
                                            </div>
                                            <div className="textContent roboto-regular">
                                                <h1 className={isTextAndImagesInWhite ? 'textWhite' : ''}>{titulo}</h1>
                                                <p className={`${isTextAndImagesInWhite ? 'textWhite' : ''} ${!isPMarginIn ? 'no-margin' : ''}`}>
                                                    {contenido}
                                                </p>
                                                {iconImage && (
                                                    <img
                                                        src={`http://localhost:3000/${iconImage}`}
                                                        alt="Icon"
                                                        className={isIconImageWhite ? 'iconWhite' : 'iconBlack'}
                                                        style={{ maxWidth: '100%' }}
                                                    />
                                                )}
                                            </div>
                                            <div className="appStoreContainer">
                                                {imgAppStore && (
                                                    <img
                                                        src={`http://localhost:3000/${imgAppStore}`}
                                                        alt="App Store"
                                                        className="roboto-regular"
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
                <section className="advantagesSection">
                    {
                        sectionAdvantages.map(({
                            id,
                            advantagesImages,
                            content,
                            color
                        }) => (
                            <div className="advantagesBlocks" key={id} style={`backgroundColor: ${color}`}>
                                <img className="advantagesImg" src={advantagesImages} alt="" />
                                <strong>{content}</strong>
                            </div>
                        ))
                    }
                </section>
            </main>
            <Footer />
        </>
    );
};

export default Layout;
