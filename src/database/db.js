const sqlite3 = require('sqlite3').verbose();
// mais infos verbose()

const db = new sqlite3.Database('./src/database/db.db');

// db.serialize(() => {
//     db.run(`
//         CREATE TABLE IF NOT EXISTS places (
//             id INTEGER PRIMARY KEY AUTOINCREMENT,
//             image TEXT,
//             name TEXT,
//             address TEXT,
//             address2 TEXT,
//             state TEXT,
//             city TEXT,
//             items TEXT
//         );
//     `);
    
    // const query = `
    //     INSERT INTO places (
    //         image, 
    //         name,
    //         address,
    //         address2,
    //         state,
    //         city,
    //         items
    //     ) VALUES (?,?,?,?,?,?,?)
    // `;
    // const values = [
    //     'https://images.unsplash.com/photo-1567393528677-d6adae7d4a0a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80',
    //     'Paperside',
    //     'João Câmara, RN',
    //     'Número 358,',
    //     'RN',
    //     'João Câmara',
    //     'Papéis e Papelão'
    // ];
    // // function a(){}
    // // se: a() : executa imediatamente
    // // se a : callback
    
    // db.run(query, values, function (err) {
    //     if (err) return console.log(err);

    //     console.log("Cadastrado com sucesso");
    //     // não pode usar o arrow function
    //     console.log(this);
    // });

//     // `SELECT name FROM places`
//     // db.all(`SELECT * FROM places`, function(err, rows) {
//     //        console.log('seus registros: ', rows); 
//     // });

//     // db.run(`DELETE FROM places WHERE id = ?`, [1], function(err){
//     //     if (err) return console.log(err);
//     //     console.log('DELETADO');
//     // });

// });

// 49min33s]

module.exports = db;