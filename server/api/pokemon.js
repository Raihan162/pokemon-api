const Router = require('express').Router();

const Validation = require('../helpers/validationHelper');
const PokemonHelper = require('../helpers/pokemonHelper');
const GeneralHelper = require('../helpers/generalHelper');

const fileName = 'server/api/pokemon.js';

const list = async (request, reply) => {
  try {
    Validation.pokemonListValidation(request.query);

    const { name } = request.query;
    const response = await PokemonHelper.getPokemonList({ name });

    return reply.send(response);
  } catch (err) {
    console.log([fileName, 'list', 'ERROR'], { info: `${err}` });
    return reply.send(GeneralHelper.errorResponse(err));
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

Router.get('/list', list);
Router.get('/all_pokemon', allList)

module.exports = Router;
