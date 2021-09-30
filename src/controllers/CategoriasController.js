'use strict'

/******************** Config ********************/
// const { recommendations } = require('../../config/config') 

/******************** Models ********************/
const {
    Categoria
} = require('../models');
const {
    Op
} = require("sequelize");

class CategoriasController {

    index(req, res) {
        let data = {};
        // res.render('home_view.twig', data );
        res.send('Estás conectado a la API. Recurso: categorias');
    }

    //Todas las categorias
    async all(req, res) {
        let rpta = {
            message: "Error en el servidor",
            status: 500,
            rows: {}
        };

        try {
            let data = await Categoria.findAll({
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

    //Categoria por id
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
            let data = await Categoria.findAll({
                where: {
                    id_categoria: id,
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


    //Agregar nuevo categoria
    async add(req, res) {
        let rpta = {
            message: "Error en el servidor",
            status: 500,
            rows: {}
        };
        try {
            const categoriaObj = {
                nombre: req.body.nombre,
                descripcion: req.body.descripcion,
                estado: 0
            };

            let data = await Categoria.create(categoriaObj);
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

    //Actualizar info categoria
    async update(req, res) {
        let rpta = {
            message: "Error en el servidor",
            status: 500,
            rows: {}
        };
        try {
            const id_categoria = req.params.id;

            //datos a modificar
            const nombre = req.body.nombre;
            const descripcion = req.body.descripcion;

            let data = await Categoria.update({
                nombre,
                descripcion
            }, {
                where: {
                    id_categoria
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

    //Borrar categoria
    async delete(req, res) {
        let rpta = {
            message: "Error en el servidor",
            status: 500,
            rows: {}
        };
        try {
            const id_categoria = req.params.id;

            let data = await Categoria.update({
                estado: 1
            }, {
                where: {
                    id_categoria
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
            return res.send(rpta)
        }

    }

}

module.exports = new CategoriasController();