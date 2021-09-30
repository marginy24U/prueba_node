'use strict'

/******************** Config ********************/
// const { recommendations } = require('../../config/config') 

/******************** Models ********************/
const {
    Producto
} = require('../models')
const {
    Op
} = require("sequelize");

class ProductosController {

    index(req, res) {
        let data = {};
        // res.render('home_view.twig', data );
        res.send('Estás conectado a la API. Recurso: productos');
    }

    //Todos los Productos
    async all(req, res) {
        let rpta = {
            message: "Error en el servidor",
            status: 500,
            rows: {}
        }
        try {
            let data = await Producto.findAll({
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
            throw error;
        }

    }

    // Productos con existencia
    async existance(req, res) {
        let rpta = {
            message: "Error en el servidor",
            status: 500,
            rows: {}
        }
        try {
            let data = await Producto.findAll({
                where: {
                    stock: {
                        [Op.gt]: 0
                    },
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
            throw error;
        }
    }

    // Producto por id
    async byId(req, res) {
        let rpta = {
            message: "Error en el servidor",
            status: 500,
            rows: {}
        }
        try {
            const {
                id
            } = req.params;
            let data = await Producto.findAll({
                where: {
                    id_producto: id,
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
            throw error;
        }
    }


    // Agregar nuevo Producto
    async add(req, res) {
        let rpta = {
            message: "Error en el servidor",
            status: 500,
            rows: {}
        };
        try {
            const prodObj = {
                marca: req.body.marca,
                modelo: req.body.modelo,
                stock: req.body.stock,
                minimo: req.body.minimo,
                costo_impo: req.body.costo_impo,
                precio1: req.body.precio1,
                precio2: req.body.precio2,
                precio3: req.body.precio3,
                precio4: req.body.precio4,
                comision1: req.body.comision1,
                comision2: req.body.comision2,
                comision3: req.body.comision3,
                comision4: req.body.comision4,
                linea: req.body.linea,
                descripcion: req.body.descripcion,
                estado: 0
            };

            let data = await Producto.create(prodObj);
            if (data) {
                rpta.message = `Registro creado con éxito`;
                rpta.status = 200;
            }

            return res.send(rpta);

        } catch (error) {
            console.log(error);
            throw error;
        }

    }

    // Actualizar info Producto
    async update(req, res) {
        let rpta = {
            message: "Error en el servidor",
            status: 500,
            rows: {}
        };
        try {
            const id_producto = req.params.id;
            //------- parametros recibidos
            const marca = req.body.marca;
            const modelo = req.body.modelo;
            const stock = req.body.stock;
            const minimo = req.body.minimo;
            const costo_impo = req.body.costo_impo;
            const precio1 = req.body.precio1;
            const precio2 = req.body.precio2;
            const precio3 = req.body.precio3;
            const precio4 = req.body.precio4;
            const comision1 = req.body.comision1;
            const comision2 = req.body.comision2;
            const comision3 = req.body.comision3;
            const comision4 = req.body.comision4;
            const linea = req.body.linea;
            const descripcion = req.body.descripcion;

            let data = await Producto.update({
                marca,
                modelo,
                stock,
                minimo,
                costo_impo,
                precio1,
                precio2,
                precio3,
                precio4,
                comision1,
                comision2,
                comision3,
                comision4,
                linea,
                descripcion
            }, {
                where: {
                    id_producto
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
            throw error;
        }
    }

    // Borrar Producto
    async delete(req, res) {
        let rpta = {
            message: "Error en el servidor",
            status: 500,
            rows: {}
        };

        try {
            const {
                id
            } = req.params;

            let data = await Producto.update({
                estado: 1
            },{
                where: {
                    id_producto: id
                }
            });

            if (data) {
                rpta.message = `Registro Eliminado`;
                rpta.status = 200;
            } else {
                console.log(error);
                throw error;
            }

            return res.send(rpta);

        } catch (error) {
            console.log(error);
            return res.send(rpta)
            // throw error;
        }
    }
}

module.exports = new ProductosController();