import couchdb_connection from "./couchdb_connection.js";
const database = "tripsv-sitios";
export const count_site = async (estado = 1) => {
    const URL = {
        0: `${database}/_design/sites-revision/_view/revision`,
        1: `${database}/_design/sites-aprobados/_view/aprobados`,
        2: `${database}/_design/sites-denegado/_view/denegado`,
    };

    if (!URL.hasOwnProperty(estado)) {
        throw new Error('Estado no válido');
    }

    const response = await couchdb_connection.get(URL[estado]);
    return response.data.rows.length;
};
