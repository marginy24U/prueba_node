'use strict'

/******************** Config ********************/
// const { recommendations } = require('../../config/config') 

/******************** Models ********************/
const {
    Libro,
    Categoria
} = require('../models')

class LibroController {

    index(req, res) {
        let data = {};
        // res.render('home_view.twig', data );
        res.send('Estás conectado a la API. Recurso: Libro');
    }

    //Todos los Registros
    async all(req, res) {

        let rpta = {
            message: "Error en el servidor",
            status: 500,
            rows: {}
        }
        try {
            let data = await Libro.findAll({
                include: {
                    model: Categoria,
                    as: "Categoria",
                },
                where: {
                    estado: 0
                }
                
            });

            if (data.length > 0) {
                rpta.message = `Mostrando ${data.length} registros`;
                rpta.status = 200;
                rpta.rows = data;
            } else {
                rpta.message = "No hay datos";
                rpta.status = 404;
            }
            return res.send(rpta);

        } catch (error) {
            console.log(error);
            throw error
        }
    }


    // Libro por id
    async byId(req, res) {
        let rpta = {
            message: "Error en el servidor",
            status: 500,
            rows: {}
        };

        try {
            const {
                id
            } = req.params;

            let data = await Libro.findAll({
                where: {
                    id_libro: id,
                    estado: 0
                }
            });

            if (data.length > 0) {
                rpta.message = `Mostrando ${data.length} registro`;
                rpta.status = 200;
                rpta.rows = data;
            } else {
                rpta.message = "El campo no existe";
                rpta.status = 404;
            }

            return res.send(rpta);

        } catch (error) {
            console.log(error);
            throw error
        }
    }


    // Agregar nuevo Libro
    async add(req, res) {
        let rpta = {
            message: "Error en el servidor",
            status: 500,
            rows: {}
        };
        try {
            const libObj = {
                titulo: req.body.titulo,
                descripcion: req.body.descripcion,
                stock: req.body.stock,
                minimo: req.body.minimo,
                precio: req.body.precio,
                ubicacion: req.body.ubicacion,
                id_categoria: req.body.id_categoria,
                estado: 0
            };
            let data = await Libro.create(libObj);
            if (data) {
                rpta.message = `Registro creado con éxito`;
                rpta.status = 200;
            }

            return res.send(rpta);

        } catch (error) {
            console.log(error);
            throw error
        }
    }

    // Actualizar info Libro
    async update(req, res) {
        let rpta = {
            message: "Error en el servidor",
            status: 500,
            rows: {}
        };
        try {
            const id_libro = req.params.id;

            const titulo = req.body.titulo;
            const descripcion = req.body.descripcion;
            const stock = req.body.stock;
            const minimo = req.body.minimo;
            const precio = req.body.precio;
            const ubicacion = req.body.ubicacion;
            const id_categoria = req.body.id_categoria;

            let data = await Libro.update({
                titulo,
                descripcion,
                stock,
                minimo,
                precio,
                ubicacion,
                id_categoria
            }, {
                where: {
                    id_libro
                }
            });

            if (data[0] == 1) { // si es 1 se realizo el cambio
                rpta.message = `Datos Actualizados`;
                rpta.status = 200;
                // rpta.rows = results;
            } else {
                throw error;
            }
            return res.send(rpta);

        } catch (error) {
            console.log(error);
            throw error
        }


    }

    // Borrar Libro
    async delete(req, res) {
        let rpta = {
            message: "Error en el servidor",
            status: 500,
            rows: {}
        };

        try {
            const id_libro = req.params.id;

            let data = await Libro.update({
                estado: 1
            },{
                where: {
                    id_libro
                }
            });

            if (data) {
                rpta.message = `Registro Eliminado`;
                rpta.status = 200;
            } else {
                throw error;
            }
            return res.send(rpta);

        } catch (error) {
            console.log(error);
            return res.send(rpta);
        }

    }

}

module.exports = new LibroController();