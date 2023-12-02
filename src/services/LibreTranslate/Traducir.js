
export default async function traducir(idiomaOrigen, idioma, titulo, descripcion) {
    //Unir titulo y descripcion y separalos por un #
    const infoSitio = `${titulo} + ${descripcion}`

    if (idiomaOrigen === idioma) {
        return infoSitio.split("+");
    }
    try {
        const res = await fetch("https://libretranslate.de/translate", {
            method: "POST",
            body: JSON.stringify({
                q: infoSitio,
                source: "auto",
                target: idioma,
                format: "text",
                api_key: ""
            }),
            headers: { "Content-Type": "application/json" }
        });
        //separado por # la traduccion
        const traduccion = await res.json();
        return traduccion.translatedText.split("+");
    } catch (e) {
        return [titulo, descripcion]
    }
}