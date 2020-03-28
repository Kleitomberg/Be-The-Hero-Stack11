const express = require('express');
const {celebrate, Segments, Joi} = require ('celebrate');

//importação do controllers
const ongcontroller = require('./controllers/ongcontroller');
const incidentcontroller = require('./controllers/incidentcontroller');
const profilecontroller = require('./controllers/profilecontroller');
const sessioncontroller = require('./controllers/sessioncontroller');

const routes = express.Router();

//ROTA DE LOGIN
routes.post('/sessions', sessioncontroller.create);

//ROTA DE LISTAGEM de ongs cadastradas
routes.get('/ongs', ongcontroller.index);

//ROTA DE CADASTRO DE ONGS + Validação
routes.post('/ongs', celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        whatsapp: Joi.string().required().min(10).max(11),
        city: Joi.string().required(),
        uf: Joi.string().required().length(2),
    }),
}), ongcontroller.create);

//ROTA DE LISTAGEM de casos por ongs
routes.get('/profile', celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required(), 
    }).unknown(),
}), profilecontroller.index);

//ROTA DE CADASTRO DE casos
routes.post('/incidents', incidentcontroller.create);

//ROTA DE LISTAGEM de caso
routes.get('/incidents', celebrate({
    [Segments.QUERY] : Joi.object({
       page: Joi.number(), 
    })
}), incidentcontroller.index);


//ROTA para deletar casos
routes.delete('/incidents/:id', celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.number().required(),
  })
}), incidentcontroller.delete);


module.exports = routes;
