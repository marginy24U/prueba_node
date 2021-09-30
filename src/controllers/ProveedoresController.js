'use strict'

/******************** Config ********************/
// const { recommendations } = require('../../config/config') 

/******************** Models ********************/
const { Proveedores } = require('../models')

class ProveedoresController {

    index(req, res) {
        let data = {};
        // res.render('home_view.twig', data );
        res.send('Estás conectado a la API. Recurso: Proveedores');
    }
    
    //Todos los Proveedores
    async all (req, res) {

        let rpta = { 
            message: "Error en el servidor",
            status: 500,
            rows: {}
        }
        try {
            let data =  await Proveedores.findAll({
                where: {
                    estado: 0
                }
            });

            if(data.length > 0 ){
                    rpta.message = `Mostrando ${data.length} registros`;
                    rpta.status = 200;
                    rpta.rows = data;
            }else{
                rpta.message = "No hay datos";
                rpta.status = 404;
            }
            return res.send(rpta);
            
        } catch (error) {
            console.log(error);
            throw error
        }
    }
    
    
    // Proveedores por id
    async byId(req, res) {
        let rpta = {
            message: "Error en el servidor",
            status: 500,
            rows: {} 
        };

        try {
            const { id } = req.params;
            let data =  await Proveedores.findAll({
                where: {
                    id_proveedor: id,
                    estado: 0
                }
            });
            
            if (data.length > 0) {
                rpta.message = `Mostrando ${data.length} registro`;
                rpta.status = 200;
                rpta.rows = data; 
            }else {
                rpta.message = "El campo no existe";
                rpta.status = 404;
            }
            
            return res.send(rpta);
            
        } catch (error) {
            console.log(error);
            throw error
        }
    }


    // Agregar nuevo Proveedor
    async add(req, res) {
        let rpta = {
            message: "Error en el servidor",
            status: 500,
            rows: {} 
        };
        try {
            const provObj = {
                nombre: req.body.nombre,
                descripcion: req.body.descripcion,
                telefono: req.body.telefono,
                nombre_contacto: req.body.nombre_contacto,
                email: req.body.email,
                estado: 0
            };
            
            let data = await Proveedores.create(provObj);
            if(data){
                rpta.message = `Registro creado con éxito`;
                rpta.status = 200;
            }
            
            return res.send(rpta);
            
        } catch (error) {
            console.log(error);
            throw error
        }
    }

    // Actualizar info Proveedor
    async update(req, res) {
        let rpta = {
            message: "Error en el servidor",
            status: 500,
            rows: {} 
        };
        try {
            const id_proveedor = req.params.id;
            
            const nombre = req.body.nombre;
            const descripcion = req.body.descripcion;
            const telefono = req.body.telefono;
            const nombre_contacto = req.body.nombre_contacto;
            const email = req.body.email;
            
            let data = await Proveedores.update({
                nombre,
                descripcion,
                telefono,
                nombre_contacto,
                email
            }, {
                where: { id_proveedor }
            });

            if(data[0] == 1){ // si es 1 se realizo el cambio
                rpta.message = `Datos Actualizados`;
                rpta.status = 200;
                // rpta.rows = results;
            }else{
                throw error;
            }
            return res.send(rpta);
            
        } catch (error) {
            console.log(error);
            throw error
        }
    
    
    }

    // Borrar Proveedor
    async delete(req, res){
        let rpta = {
            message: "Error en el servidor",
            status: 500,
            rows: {} 
        };
        
        try {
            const id_proveedor = req.params.id;
            
            let data = await Proveedores.update({
                estado: 1
            },{
                where: { id_proveedor }
            });

            if(data){
                rpta.message = `Registro Eliminado`;
                rpta.status = 200;
            }else{
                throw error;
            }
            
            return res.send(rpta);
            
        } catch (error) {
            console.log(error);
            // return res.send(rpta);
            throw error
        }
        
    }

}

module.exports = new ProveedoresController();