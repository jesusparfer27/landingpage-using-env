import { useState, useEffect } from 'react'; // Importa React para asegurarte de que useState esté definido
import './landing.css'; // Importar el archivo CSS

const Layout = () => {
    const [landingContent, setLandingContent] = useState([]);
    const [sectionAdvantages, setSectionAdvantages] = useState([]);
    const [footerContent, setFooterContent] = useState([])
    const [commentsContent, setCommentsContent] = useState([])

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        try {
            const response = await fetch('http://localhost:3000/API/v1/landing');
            if (!response.ok) {
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }
            const respuesta = await response.json();

            setLandingContent(respuesta.sections);
            setSectionAdvantages(respuesta.appAdvantages);
            setFooterContent(respuesta.footer)
            setCommentsContent(respuesta.comments)
            console.log(respuesta)
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
                                                {iconImage && (
                                                    <img
                                                        src={`http://localhost:3000/${iconImage}`}
                                                        alt="Icon"
                                                        className={isIconImageWhite ? 'iconWhite' : 'iconBlack'}
                                                        style={{ maxWidth: '100%' }}
                                                    />
                                                )}
                                                <h1 className={isTextAndImagesInWhite ? 'textWhite' : ''}>{titulo}</h1>
                                                <p className={`${isTextAndImagesInWhite ? 'textWhite' : ''} ${!isPMarginIn ? 'no-margin' : ''}`}>
                                                    {contenido}
                                                </p>

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
                                                {iconImage && (
                                                    <img
                                                        src={`http://localhost:3000/${iconImage}`}
                                                        alt="Icon"
                                                        className={isIconImageWhite ? 'iconWhite' : 'iconBlack'}
                                                        style={{ maxWidth: '100%' }}
                                                    />
                                                )}
                                                <h1 className={isTextAndImagesInWhite ? 'textWhite' : ''}>{titulo}</h1>
                                                <p className={`${isTextAndImagesInWhite ? 'textWhite' : ''} ${!isPMarginIn ? 'no-margin' : ''}`}>
                                                    {contenido}
                                                </p>
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
                                        <div className="leftSection" >
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
                            <div className="advantagesBlocks" key={id} style={{ backgroundColor: color }}>
                                <div className="advantageImg">
                                    <img className="advantagesImgBlock" src={`http://localhost:3000/${advantagesImages}`} alt="" />
                                </div>
                                <strong className="textAppAdvantages">{content}</strong>
                            </div>
                        ))
                    }
                </section>
                <section className="commentSection">
                    {
                        commentsContent.map(({
                            id,
                            imageComment,
                            comment,
                        }) => (
                            <div className="commentBlock" key={id}>
                                <p className="commentText">{comment}</p>
                                <img src={`http://localhost:3000/${imageComment}`} alt="" />

                            </div>
                        ))
                    }
                </section>
            </main>
        </>
    );
};

export default Layout;
