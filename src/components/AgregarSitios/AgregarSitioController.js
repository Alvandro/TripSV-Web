import traducir from "../../services/LibreTranslate/Traducir.js"
import { sendImages, sendSite } from "../../services/CouchDb/database_sitios.js";

const readBinaryData = (image) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const binaryData = e.target.result;
            const imageInfo = {
                binaryData: binaryData,
                type: image.type,
                name: image.name
            };
            resolve(imageInfo);
        };
        reader.onerror = (error) => {
            reject(error);
        };
        reader.readAsArrayBuffer(image);
    });
};

const leerImagen = (imagen) => {
    return readBinaryData(imagen);
}
export async function GuardaDato(userEmail, imagenes, titulo, descripcion, ubicacion, precios, selectedOption, servicios, categorias, horario) {

    let telefono = document.getElementById("telefono").value;

    if (
        !userEmail ||
        !imagenes.length ||
        imagenes.length <= 2 ||
        !titulo ||
        !descripcion ||
        !ubicacion ||
        !selectedOption ||
        !servicios.length ||
        !categorias.length ||
        !horario
    ) {

        return false;
    } else {

        // Traducir el nombre y la descripcion
        const ingles = await traducir("es", "en", titulo, descripcion);
        const chino = await traducir("es", "zh", titulo, descripcion);
        const hindi = await traducir("es", "hi", titulo, descripcion);
        const frances = await traducir("es", "fr", titulo, descripcion);
        const arabe = await traducir("es", "ar", titulo, descripcion);
        const bengali = await traducir("es", "bn", titulo, descripcion);
        const ruso = await traducir("es", "ru", titulo, descripcion);
        const portugues = await traducir("es", "pt", titulo, descripcion);
        const urdu = await traducir("es", "ur", titulo, descripcion);
        const aleman = await traducir("es", "de", titulo, descripcion);


        const sitio = {

            estado: 0,
            email: userEmail,
            titulo: {
                en: ingles[0] || titulo,
                es: titulo,
                ch: chino[0] || titulo,
                hindi: hindi[0] || titulo,
                fr: frances[0] || titulo,
                ara: arabe[0] || titulo,
                beng: bengali[0] || titulo,
                rus: ruso[0] || titulo,
                port: portugues[0] || titulo,
                urd: urdu[0] || titulo,
                de: aleman[0] || titulo
            },
            descripcionLugar: {
                en: ingles[1] || descripcion,
                es: descripcion,
                ch: chino[1] || descripcion,
                hindi: hindi[1] || descripcion,
                fr: frances[1] || descripcion,
                ara: arabe[1] || descripcion,
                beng: bengali[1] || descripcion,
                rus: ruso[1] || descripcion,
                port: portugues[1] || descripcion,
                urd: urdu[1] || descripcion,
                de: aleman[1] || descripcion,
            },
            telefono: telefono,
            ubicacion: ubicacion,
            departamento: selectedOption,
            precio: precios,
            servicios: servicios,
            categorias: categorias,
            horario: horario,
            fecha: new Date().toISOString().slice(0, 10)
        }


        // Enviar documento
        const responseSite = await sendSite(sitio);
        if (!responseSite) {
            // ToastAndroid.show("Error al subir el sitio", ToastAndroid.SHORT);

            return false;
        } else {


        }
        let id = responseSite.id;

        // Enviar imagenes
        const imagenUpload = imagenes.map(async (x) => {
            return await leerImagen(x).then(x => x);
        })

        const enviarImage = async (image) => {
            return await sendImages(image, id);
        }

        Promise.all(imagenUpload)
            .then((imageInfos) => {
                enviarImage(imageInfos)
            })
            .catch((error) => {

            })

        return true;

    }

}


const enviarDatos = async () => {

    const data = await GuardaDato();

}