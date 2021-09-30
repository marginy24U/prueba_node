'use strict'

/******************** Config ********************/
// const { recommendations } = require('../../config/config') 

/******************** Models ********************/
const { Usuario } = require('../models') 
const { Op } = require("sequelize");

class UsuariosController {

    index(req, res) {
        let data = {};
        // res.render('home_view.twig', data );
        res.send('Estás conectado a la API. Recurso: usuarios');
    }
    
    //Todos los Usuarios
    async all (req, res) {

        let rpta = { 
            message: "Error en el servidor",
            status: 500,
            rows: {}
        }
        
        try {
            let data =  await Usuario.findAll({
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
    
    
    // Usuarios por id
    async byId(req, res) {
        let rpta = {
            message: "Error en el servidor",
            status: 500,
            rows: {} 
        };

        try {
            const { id } = req.params;
            let data =  await Usuario.findAll({
                where: {
                    id_usuario: id,
                    estado: 0
                }
            });
            
            if (data.length > 0) {
                rpta.message = `Mostrando ${data.length} registros`;
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

    // Usuarios Auth
    async Auth(req, res) {
        let rpta = {
            message: "Error en el servidor",
            status: 500,
            rows: {} 
        };

        try {
            const { nick, pass } = req.params;
            let data =  await Usuario.findAll({
                where: {
                    nick: nick,
                    pass: pass,
                    estado: {
                        [Op.or]: [0, 2]
                      }
                }
            });
            
            if (data.length > 0) {
                rpta.message = `Bienvenido`;
                rpta.status = 200;
                rpta.rows = data; 
            }else {
                rpta.message = "No hay coincidencias";
                rpta.status = 404;
            }
            
            return res.send(rpta);
            
        } catch (error) {
            console.log(error);
            throw error
        }
    }

    // Agregar nuevo Usuario
    async add(req, res) {
        let rpta = {
            message: "Error en el servidor",
            status: 500,
            rows: {} 
        };
        
        try {
            const userObj = {
                nombre: req.body.nombre,
                apellido: req.body.apellido,
                nick: req.body.nick,
                pass: req.body.pass,
                cargo: req.body.cargo,
                permiso: req.body.permiso,
                estado: 0
            };
            
            let data = await Usuario.create(userObj);
            if(data){
                rpta.message = `Usuario creado con éxito`;
                rpta.status = 200;
            }
            
            return res.send(rpta);
                        
        } catch (error) {
            console.log(error);
            throw error
        }
    }

    // Actualizar info Usuarios
    async update(req, res) {
        let rpta = {
            message: "Error en el servidor",
            status: 500,
            rows: {} 
        };
        try {
            const id_usuario = req.params.id;
            
            const nombre = req.body.nombre;
            const apellido = req.body.apellido;
            const nick = req.body.nick;
            const cargo = req.body.cargo;
            const permiso = req.body.permiso;
            
            let data = await Usuario.update({ 
                nombre,
                apellido,
                nick,
                cargo,
                permiso
             }, {
                where: {
                    id_usuario
                }
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

    // Actualizar Password
    async updatePass(req, res) {
        let rpta = {
            message: "Error en el servidor",
            status: 500,
            rows: {} 
        };
        try {
            const id_usuario = req.params.id;            
            const pass = req.body.pass;
            
            let data = await Usuario.update({ 
                pass
             }, 
             {
                where: {
                    id_usuario
                }
            });
            
            if(data[0] == 1){ // si es 1 se realizo el cambio
                rpta.message = `Contraseña Actualizada`;
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

    // Borrar Usuarios
    async delete(req, res){
        let rpta = {
            message: "Error en el servidor",
            status: 500,
            rows: {} 
        };
        
        try {
            const id_usuario = req.params.id;
            let data = await Usuario.update({
                estado: 1
            },{
                where: { id_usuario }
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
        }
        
    }

}

module.exports = new UsuariosController();