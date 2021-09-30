'use strict'

/******************** Config ********************/
// const { recommendations } = require('../../config/config') 

/******************** Models ********************/
const {
    Cliente,
    Factura,
    Factura_Detalle,
    Usuario,
    sequelize,
    Producto
} = require('../models')
// const sequelize = require('sequelize');     
const { Op } = require("sequelize");    

class VentasController { 

    index(req, res) {
        let data = {};
        // res.render('home_view.twig', data );
        res.send('Estás conectado a la API. Recurso: ventas');
    }

    //Todos los Ventas
    async all(req, res) {

        let rpta = {
            message: "Error en el servidor",
            status: 500,
            rows: {}
        }

        try {

            let data = await Factura.findAll({
                include: [{
                        model: Cliente,
                        as: "Cliente",
                    },
                    {
                        model: Factura_Detalle,
                        as: "Factura_Detalle",
                        include: [{
                            model: Producto,
                            as: "Producto",
                        }]
                    },
                    {
                        model: Usuario,
                        as: "Usuario",
                    },
                ]
            });

            if (data.length > 0) {
                rpta.message = `Mostrando ${data.length} registros`;
                rpta.status = 200;
                rpta.rows = data;
            } else {
                rpta.message = "No hay datos";
                rpta.status = 404;
            }
            return res.json(rpta);

        } catch (error) {
            console.log(error);
            throw error
        }
    }

    // Ventas de Hoy
    async today(req, res) {
        let rpta = {
            message: "Error en el servidor",
            status: 500,
            rows: {}
        };

        try {
            // const fechaActual = ;
            const fechaAyer = new Date();
            const fechaManana = new Date();
            fechaAyer.setDate(fechaAyer.getDate() - 1);
            fechaManana.setDate(fechaManana.getDate() + 1);
            
            let data = await Factura.findAll({
                include: [{
                    model: Cliente,
                    as: "Cliente",
                },
                {
                    model: Factura_Detalle,
                    as: "Factura_Detalle",
                    include: [{
                        model: Producto,
                        as: "Producto",
                    }]
                },
                {
                    model: Usuario,
                    as: "Usuario",
                },
            ],
                where: {
                    fecha:{
                    [Op.between]: [fechaAyer, fechaManana]
                    }
                }
            });

            if (data.length > 0) {
                rpta.message = `Mostrando ${data.length} registros`;
                rpta.status = 200;
                rpta.rows = data;
            } else {
                rpta.message = "No has vendido nada el dia de Hoy";
                rpta.status = 404;
            }

            return res.send(rpta);

        } catch (error) {
            console.log(error);
            throw error
        }
    }

    // Ventas en rango de fecha
    async byFec(req, res) {
        let rpta = {
            message: "Error en el servidor",
            status: 500,
            rows: {}
        };

        try {
            const { fec1, fec2 } = req.params;
            
            let data = await Factura.findAll({
                include: [{
                    model: Cliente,
                    as: "Cliente",
                },
                {
                    model: Factura_Detalle,
                    as: "Factura_Detalle",
                    include: [{
                        model: Producto,
                        as: "Producto",
                    }]
                },
                {
                    model: Usuario,
                    as: "Usuario",
                },
            ],
                where: {
                    fecha:{
                    [Op.between]: [fec1, fec2]
                    }
                }
            });

            if (data.length > 0) {
                rpta.message = `Mostrando ${data.length} registros`;
                rpta.status = 200;
                rpta.rows = data;
            } else {
                rpta.message = "No hay registros de venta";
                rpta.status = 404;
            }

            return res.send(rpta);

        } catch (error) {
            console.log(error);
            throw error
        }
    }

    //Agregar nueva Venta
    async add(req, res) {
        let rpta = {
            message: "Error en el servidor",
            status: 500,
            rows: {}
        };

        let transaction;

        try {
            // get transaction
            transaction = await sequelize.transaction();

            // step 1
            const factura = {
                id_usuario: req.body.id_usuario,
                id_cliente: req.body.id_cliente,
                fecha: new Date(),
                monto: req.body.monto,
                credito: req.body.credito,
                nruc: req.body.nruc,
                nombre_cliente: req.body.nombre_cliente,
                fecha_venc: req.body.fecha_venc,
                iva: req.body.iva,
                num_factura: req.body.num_factura,
                anulada: req.body.anulada,
                tcambio: req.body.tcambio
            }

            let resultFactura = await Factura.create(factura, {
                transaction
            });

            // step 2
            if (resultFactura) {

                let detalleFactura = {
                    id_factura: resultFactura.id_factura,
                    id_producto: Object.values(req.body.id_producto),
                    cantidad: Object.values(req.body.cantidad),
                    precio: Object.values(req.body.precio),
                    porcentaje: Object.values(req.body.porcentaje)
                }

                if (Array.isArray(detalleFactura.id_producto)) {
                    await Promise.all(
                        detalleFactura.id_producto.map(async (idProducto, index) => {
                            await Factura_Detalle.create({
                                id_factura: detalleFactura.id_factura,
                                id_producto: idProducto,
                                cantidad: detalleFactura.cantidad[index],
                                precio: detalleFactura.precio[index],
                                porcentaje: detalleFactura.porcentaje[index]
                            }, {
                                transaction
                            });
                        })
                    )

                    // Step 3
                    await Promise.all(
                        detalleFactura.cantidad.map(async (cantidad, index) => {
                            await Producto.decrement({
                                stock: cantidad
                            }, {
                                where: {
                                    id_producto: detalleFactura.id_producto[index]
                                },
                                transaction
                            })
                        })
                    )

                    await transaction.commit();

                    rpta.status = 200
                    rpta.message = "Datos cargados con exito"
                }

            }

            res.json(rpta);

        } catch (err) {
            console.log(err);

            // Rollback transaction only if the transaction object is defined
            await transaction.rollback();

            res.json(rpta);

        }

    }

}

module.exports = new VentasController();