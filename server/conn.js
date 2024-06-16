const mysql = require('mysql2/promise');

const conn = mysql.createPool({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'caminhocurto'
});

function genCode() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const length = 4;

    let randomPart = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        randomPart += characters[randomIndex];
    }

    const timestampPart = Date.now().toString(36);
    const hash = randomPart + timestampPart;
    return hash;
}

const saveLink = async (code, url) => {
    const [query] = await conn.query('INSERT INTO links (code, url) VALUES (?, ?)', [code, url]);
    return query;
}

const getLink = async (url) => {
    const [query] = await conn.query('SELECT * FROM links WHERE url = ?', [url]);
    return query;
}

const getCode = async (code) => {
    const [query] = await conn.query('SELECT * FROM links WHERE code = ?', [code]);
    return query;
}

const addLink = async (url) => {
    return getLink(url).then((response) => {
        if (response.length > 0) {
            return response[0].code;
        } else {
            const code = genCode();
            saveLink(code, url);
            return code;
        }
    });
}

module.exports = { addLink, getCode };