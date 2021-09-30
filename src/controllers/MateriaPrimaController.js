'use strict'

/******************** Config ********************/
// const { recommendations } = require('../../config/config') 

/******************** Models ********************/
const { Materia_Prima } = require('../models');

class MateriaPrimaController {

    index(req, res) {
        let data = {};
        // res.render('home_view.twig', data );
        res.send('Estás conectado a la API. Recurso: Materia Prima');
    }
    
    //Todos los campos de Materia
    async all (req, res) {

        let rpta = { 
            message: "Error en el servidor",
            status: 500,
            rows: {}
        }
        try {
            let data =  await Materia_Prima.findAll({
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
    
    
    // Materia Prima por id
    async byId(req, res) {
        let rpta = {
            message: "Error en el servidor",
            status: 500,
            rows: {} 
        };

        try {
            const { id } = req.params;
            let data =  await Materia_Prima.findAll({
                where: {
                    id_materia: id,
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


    // Agregar nuevo campo Materia
    async add(req, res) {
        let rpta = {
            message: "Error en el servidor",
            status: 500,
            rows: {} 
        };
        try {
            const matObj = {
                nombre: req.body.nombre,
                descripcion: req.body.descripcion,
                unidad: req.body.unidad,
                stock: req.body.stock,
                minimo: req.body.minimo,
                ubicacion: req.body.ubicacion,
                estado: 0
            };
            
            let data = await Materia_Prima.create(matObj);
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

    // Actualizar info Materia
    async update(req, res) {
        let rpta = {
            message: "Error en el servidor",
            status: 500,
            rows: {} 
        };
        try {
            const id_materia = req.params.id;
            
            const nombre = req.body.nombre;
            const descripcion = req.body.descripcion;
            const unidad = req.body.unidad;
            const stock = req.body.stock;
            const minimo = req.body.minimo;
            const ubicacion = req.body.ubicacion;
            
            let data = await Materia_Prima.update({
                nombre,
                descripcion,
                unidad,
                stock,
                minimo,
                ubicacion
            }, {
                where: { id_materia }
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

    // Borrar registro Materia
    async delete(req, res){
        let rpta = {
            message: "Error en el servidor",
            status: 500,
            rows: {} 
        };
        
        try {
            const id_materia = req.params.id;
            
            let data = await Materia_Prima.update({
                estado: 1
            },{
                where: { id_materia }
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
            return res.send(rpta);
            // throw error
        }
        
    }

}

module.exports = new MateriaPrimaController();