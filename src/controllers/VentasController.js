'use strict'

/******************** Config ********************/
// const { recommendations } = require('../../config/config') 

/******************** Models ********************/
const { 
    Factura, 
    Factura_Detalle, 
    sequelize, 
    Producto  
} = require('../models') 
// const sequelize = require('sequelize');         

class UsuariosController {

    index(req, res) {
        let data = {};
        // res.render('home_view.twig', data );
        res.send('Estás conectado a la API. Recurso: ventas');
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
            

            let resultFactura = await Factura.create(factura,{transaction});
            
            // step 2
            if(resultFactura){
                
                let detalleFactura = {
                    id_factura: resultFactura.id_factura,
                    id_producto: Object.values(req.body.id_producto),
                    cantidad: Object.values(req.body.cantidad),
                    precio:  Object.values(req.body.precio),
                    porcentaje: Object.values( req.body.porcentaje)
                }

                if(Array.isArray(detalleFactura.id_producto)){
                    await Promise.all(
                        detalleFactura.id_producto.map(async (idProducto, index) => {
                            await Factura_Detalle.create({
                                id_factura: detalleFactura.id_factura,
                                id_producto: idProducto,
                                cantidad: detalleFactura.cantidad[index],
                                precio: detalleFactura.precio[index],
                                porcentaje: detalleFactura.porcentaje[index]
                            }, { transaction });
                        })
                    )
                    
                    // Step 3
                    await Promise.all(
                        detalleFactura.cantidad.map(async (cantidad,index)=>{
                            await Producto.decrement({
                                stock:cantidad
                            },{
                                where:{
                                    id_producto : detalleFactura.id_producto[index]
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

module.exports = new UsuariosController();