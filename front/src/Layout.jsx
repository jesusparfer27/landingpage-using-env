import Footer from "./components/Footer";
import { useState, useEffect } from 'react'

const layout = () => {

    const [landingContent, setLandingContent] = useState([])

    useEffect(() => {
        getData()
    }, [])
    
    const getData = async () => {
        try {
            const response = await fetch('http://localhost:3000/API/v1/landing')
            if (!response.ok) {
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }
            const landingContent = await response.json();
            setLandingContent(landingContent);
            console.log(landingContent)
        } catch {
            console.log(err, "error")
        }
    }

    return ( <>
    <main>
        {
            landingContent.map(({id, appImage, img, icono, color, titulo, contenido, isImageRight}) => {
                console.log(appImage
                )
                return (
                <div key={id} style={{"backgroundColor": color}}>
                    <div className="flexSections">
                        <div className="rightSection">
                           <img src={`http://localhost:3000/${appImage}`} alt="" /> 
                        </div>
                        <div className="leftSection">

                        </div>
                    </div>
                </div>
            )})
        }
    </main>
    <Footer/>
    </>
    );
}
 
export default layout;