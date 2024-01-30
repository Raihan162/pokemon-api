const Router = require('express').Router();

const Validation = require('../helpers/validationHelper');
const PokemonHelper = require('../helpers/pokemonHelper');
const GeneralHelper = require('../helpers/generalHelper');

const fileName = 'server/api/pokemon.js';

const list = async (request, reply) => {
  try {
    // Validation.pokemonListValidation(request.query);

    const { id } = request.params;
    const response = await PokemonHelper.getPokemonList({ id });

    return reply
      .status(200)
      .send({
        message: 'Get Detail Pokemon Success',
        response
      });

  } catch (err) {
    console.log([fileName, 'list', 'ERROR'], { info: `${err}` });
    // return reply.send(GeneralHelper.errorResponse(err));
    return reply
      .status(400)
      .send({
        error: err.message
      })
  }
}

const allList = async (request, reply) => {
  try {

    const response = await PokemonHelper.getAllPokemon()

    return reply
      .status(200)
      .send({
        message: 'Get All Pokemon Success',
        response
      })

  } catch (error) {

    return reply
      .status(400)
      .send({
        error: error
      })
  }
}

const catchPokemon = async (request, reply) => {
  try {
    const { name } = request.body

    const response = await PokemonHelper.catchPokemon(name)

    return reply
      .status(200)
      .send({
        message: 'Catch Pokemon Success',
        response
      })

  } catch (error) {

    return reply
      .status(400)
      .send({
        error: error
      })
  }
}

Router.get('/list/:id', list);
Router.get('/all_pokemon', allList)
Router.post('/catch', catchPokemon)

module.exports = Router;
