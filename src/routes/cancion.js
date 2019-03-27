var express = require('express');
var router = express.Router();
var sqlite3 = require('sqlite3').verbose();

/* GET cancion especifica. */
router.get('/:id', function (req, res) {
    var db = new sqlite3.Database('./db/projectDB.db', (err) => {
        if (err) {
            res.status(500).send(err.message);
        }
        else {
            var id = +req.params.id;
            db.get(`SELECT * FROM cancion WHERE id = ?`,[id], function (err, row) {
                if (err) {
                    res.status(500).send('El servidor no pudo procesar la solicitud')
                }
                else {
                    if(row === undefined){
                        res.status(404).send('La cancion con URI' + req.originalUrl + ' no existe');
                    }
                    res.send(row);
                }
            });
        }
        db.close();
    });
});

/* POST cancion. */
router.post('/', function (req, res) {
    var db = new sqlite3.Database('./db/projectDB.db', (err) => {
        if (err) {
            res.status(500).send(err.message);
        }
        else {
            var cancion = req.body;
            //MARIO WORK 2.0 añado el atributo idAlbum al momento de crear la cancion
            db.run(`INSERT INTO cancion(nombre,duracion,visitas,audio, idAlbum) VALUES(?,?,?,?,?)`,
                [cancion.nombre, cancion.duracion, cancion.visitas, cancion.audio, cancion.idAlbum], function (err) {

                    if (err){
                         res.status(500).send('El servidor no pudo procesar la solicitud')
                    }
                    else{
                        var uri = req.originalUrl + '/' + this.lastID;
                        res.send('Creación de una nueva cancion con URI ' + uri);
                    }

                });
        }
        db.close();
    });
});

//MARIO WORK 2.0 START

/* POST añadir cancion a una playlist. */
router.post('/:idCancion/anadiraplaylist/:idPlaylist', function (req, res) {
    var db = new sqlite3.Database('./db/projectDB.db', (err) => {
        if (err) {
            res.status(500).send(err.message);
        }
        else {
            var idCancion = +req.params.idCancion;
            var idPlaylist = +req.params.idPlaylist;
            db.run(`INSERT INTO cancionesPlaylist (idCancion,idPlaylist) VALUES(?,?)`,
                [idCancion, idPlaylist], function (err) {

                    if (err){
                         res.status(500).send('El servidor no pudo procesar la solicitud')
                    }
                    else{
                        var uri = req.originalUrl + '/' + this.lastID;
                        res.send('Creación de una nueva cancion con URI ' + uri);
                    }

                });
        }
        db.close();
    });
});

//MARIO WORK 2.0 END


/* PUT cancion. */
router.put('/:id', function (req, res) {
    var db = new sqlite3.Database('./db/projectDB.db', (err) => {
        if (err) {
            res.status(500).send(err.message);
        }
        else {
            var cancion = req.body;
            var id = req.params.id;
            db.run(`UPDATE cancion SET nombre = ?, duracion = ?, visitas = ?, audio = ? WHERE id = ?`,
                [cancion.nombre, cancion.duracion, cancion.visitas, cancion.audio, id], function (err) {

                    if (err){
                         res.status(500).send('El servidor no pudo procesar la solicitud')
                    }
                    else{
                        var uri = req.originalUrl;
                        res.send('Se ha actualizado la cancion con ubicado en la URI ' + uri);
                    }
                });
        }
        db.close();
    });
});
/* DELETE cancion. */
router.delete('/:id', function (req, res) {
    var db = new sqlite3.Database('./db/projectDB.db', (err) => {
        if (err) {
            res.status(500).send(err.message);
        }
        else {
            var id = req.params.id;
            db.run(`DELETE FROM cancion WHERE id = ?`,
                [id], function (err) {

                    if (err){
                         res.status(500).send('El servidor no pudo procesar la solicitud')
                    }
                    else{
                        var uri = req.originalUrl;
                        res.send('Se ha eleminado la cancion ubicada ' + uri);
                    }
                });
        }
        db.close();
    });
});
module.exports = router;