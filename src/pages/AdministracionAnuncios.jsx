import React, { useState, useEffect, useContext } from 'react';
import { BotonsubirImg } from "../components/AdministrarAnuncios/SubirBoton.jsx";
import { GridImgPublicidad } from "../components/AdministrarAnuncios/GridImgPublicidad.jsx";
import Banner from "../components/Banner.jsx";
import { IdiomaContext } from "../providers/IdiomaProvider";
import { PublicidadIdiomas } from "../services/idiomas/PublicidadIdiomas.js";
import couchdb_connection, { host } from "../services/CouchDb/couchdb_connection";

export default function AdministracionAnuncios() {
    const [imageCount, setImageCount] = useState(1);
    const [images, setImages] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);
    const nombredb = "tripsv-web-publicidad";//nonbre de la base de datos xd





    const handleImageUpload = async () => {
        try {
            const formData = new FormData();
            formData.append('image', selectedImage);

            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            const image = new Image();

            image.src = URL.createObjectURL(selectedImage);

            image.onload = () => {
                canvas.width = image.width;
                canvas.height = image.height;
                ctx.drawImage(image, 0, 0);
                const base64 = canvas.toDataURL('image/jpeg'); // Cambia 'image/png' por 'image/jpeg' si prefieres JPEG

                // Crea un objeto JSON con la imagen base64
                const imageObject = {
                    _attachments: {
                        [`${Date.now()}.jpeg`]: {
                            content_type: 'image/png', // Cambia a 'image/png' si prefieres PNG
                            data: base64.split(',')[1], // Elimina el encabezado de base64
                        },
                    },
                };

                // Utiliza couchdb_connection para realizar solicitudes POST a la base de datos tripsv-web-publicidad
                couchdb_connection.post(nombredb, imageObject)
                    .then(response => {

                        setImageCount(imageCount + 1);
                    })
                    .catch(error => {

                    });
            };
        } catch (error) {

        }
    };

    //profin jajajajaj
    const handleDeleteImage = async (Id, Rev) => {
        try {
            // Especifica la URL de tu base de datos CouchDB tripsv-web-publicidad y el Id del documento que deseas eliminar
            const deleteUrl = `${nombredb}/${Id}?rev=${Rev}`;

            // Realiza una solicitud DELETE para eliminar el documento
            const response = await couchdb_connection.delete(deleteUrl);

            if (response.status === 200) {

                setImageCount(imageCount + 1);
                // Realiza cualquier otra lógica que necesites después de eliminar el documento
            } else {

            }
        } catch (error) {

        }
    };


    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setSelectedImage(file);
    };

    useEffect(() => {
        if (imageCount !== 0) {
            ObtenerImages();
        }
    }, [imageCount]);




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
                                return { _id: docId, _rev: docData._rev, imageUrl };
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





    const { idioma, setIdioma } = useContext(IdiomaContext);
    return (
        <div className="p-4 h-screen overflow-y-scroll text-center">
            <Banner title={PublicidadIdiomas["titulo"][idioma]} />
            <BotonsubirImg Handlersubir={handleImageUpload} Handlerchange={handleImageChange} img={images} />
            <GridImgPublicidad img={images} Handler={handleDeleteImage} />
        </div>
    )
}