import couchdb_connection from "./couchdb_connection.js";


// Nombre de la base de datos
const database = "tripsv-sitios";
const database_image = "tripsv-imagenes";


/**
 * Obtener todos los sitios
 * @param estado 0: aprobados, 1: denegados, 2: revision
 * @returns {Promise<*>}
 */
export const getAllSites = async (estado = 0) => {
    const URL = {
        0: `${database}/_design/sites-revision/_view/revision?include_docs=true`,
        1: `${database}/_design/sites-aprobados/_view/aprobados?include_docs=true`,
        2: `${database}/_design/sites-denegado/_view/denegado?include_docs=true`,
    };

    if (!URL.hasOwnProperty(estado)) {
        throw new Error('Estado no válido');
    }

    const response = await couchdb_connection.get(URL[estado]);
    return await Promise.all(
        response.data.rows.map(async (siteRow) => {
            // Obtener las imágenes del sitio
            const imagenes = await getImage(`${database_image}/${siteRow.id}`);

            // Devolver un objeto de sitio con las imágenes
            return {
                ...siteRow.doc,
                imagenes,
            };
        })
    );
};


// mandar un sitio
export const sendSite = async (site) => {
    const response = await couchdb_connection.post(`${database}`, site);
    return response.data;
}

// mandar multiples imagenes desde react native

// mandar multiples imagenes desde react native
export const sendImages = async (imagenes, id) => {
    // Preparo y saco la informacion de las imagenes
    const imagen = imagenes.map((imagenes, index) => {
        return {
            name: `${index}${id}.${imagenes.name.split(".").pop()}`,
            type: imagenes.type,
            blob: imagenes.binaryData
        }
    })

    //Lectura de imagenes y envio de las mismas asociadas con un id
    let revDoc = null;
    for (const image of imagen) {

        const response = await couchdb_connection.put(`${database_image}/${id}/${image.name}`,
            image.blob,
            {
                headers: {
                    'Content-Type': image.type,
                    'processData': false,
                    'If-Match': revDoc
                },
            });
        // Verifico si se subio la imagen
        if (response.status !== 201) {
            return false;
        }
        // Guardo el rev del documento
        revDoc = response.data.rev;

    }
    return true;
}


//Eliminar un documento atraves de su id y rev
export const deleteSite = async (id, rev) => {
    const response = await couchdb_connection.delete(`${database}/${id}?rev=${rev}`);
    return response.data;
}

export const getImage = async (imageUrl) => {

    const response = await couchdb_connection.get(imageUrl);
    try {
        // Verificar que la solicitud se haya realizado correctamente (código de respuesta 200)
        if (response.status === 200) {
            // Obtener el documento JSON de la respuesta
            const documentoCouchDB = response.data;

            // Acceder al objeto _attachments que contiene los archivos adjuntos
            const attachments = documentoCouchDB._attachments;
            const imagenes = []
            // Iterar a través de las claves (nombres de archivos adjuntos) en _attachments
            for (const key in attachments) {
                if (attachments.hasOwnProperty(key)) {
                    const attachment = attachments[key];
                    if (attachment.length) {
                        // Crear una URL para la imagen y mostrarla en la consola
                        const imageUrls = `https://couchdbbackend.esaapp.com/${database_image}/${documentoCouchDB._id}/${key}`;
                        imagenes.push(imageUrls)
                    }
                }
            }
            return imagenes;
        } else {

        }
    } catch (error) {

    }
    return false;
};





