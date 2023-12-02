import { useEffect, useState } from 'react';
import couchdb_connection, { host } from "../../services/CouchDb/couchdb_connection.js";

const nombredb = `tripsv-web-publicidad`;

function ImgRandom() {
    const [images, setImages] = useState([]);
    const ObtenerImages = async () => {
        try {
            // Realiza una solicitud GET a CouchDB para obtener los documentos de tripsv-web-publicidad
            const response = await couchdb_connection.get(`${nombredb}/_all_docs`);
            const documentIds = response.data.rows.map(row => row.id);

            // Obtiene los documentos en paralelo
            const documentPromises = documentIds.map(async docId => {
                const docResponse = await couchdb_connection.get(`${nombredb}/${docId}`);
                const docData = docResponse.data;

                // Verifica si el documento contiene la propiedad "_attachments"
                if (docData._attachments) {
                    // Itera sobre las claves de los adjuntos
                    for (const attachmentKey in docData._attachments) {
                        if (docData._attachments.hasOwnProperty(attachmentKey)) {
                            const attachment = docData._attachments[attachmentKey];

                            // Verifica si el adjunto es una imagen
                            if (attachment.content_type.startsWith('image/')) {
                                const attachmentName = attachmentKey;
                                // Crea el enlace a la imagen a partir de la información del adjunto
                                const imageUrl = `${host}${nombredb}/${docId}/${attachmentName}`;

                                // Devuelve un objeto con _id, _rev y el enlace de la imagen
                                return { imageUrl };
                            }
                        }
                    }
                }

                // Si no hay imagen, devuelve null
                return null;
            });

            // Espera a que todas las promesas se resuelvan y filtra los resultados no nulos
            const documentArray = (await Promise.all(documentPromises)).filter(doc => doc !== null);

            setImages(documentArray); // Actualiza el estado con el vector de objetos que contienen _id, _rev e imageUrl

        } catch (error) {

        }
    };


    useEffect(() => {
        ObtenerImages();
    }, []);

    return images;
}


export default ImgRandom;
