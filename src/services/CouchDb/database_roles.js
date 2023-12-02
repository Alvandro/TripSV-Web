import couch_connection from "./couchdb_connection";


const database = "tripsv-usuarios"

export const userCouchInfo = async (uuid, user) => {
    const URL = `${database}/${uuid}`
    try {
        const response = await couch_connection.get(URL);
        return response.data;
    } catch (err) {
        const response = await couch_connection.put(`${database}/${uuid}`, user);
        return response.data;
    }

}


export const getUserInfo = async () => {

    const URL = `${database}/_design/sites-admins/_view/administradores?include_docs=true`
    const response = await couch_connection.get(URL);
    return response.data.rows;

}