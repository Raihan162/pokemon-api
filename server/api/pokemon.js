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

const myPokemon = async (request, reply) => {
  try {
    const response = await PokemonHelper.getMyPokemon()

    return reply
      .status(200)
      .send({
        message: 'Get My Pokemon Success',
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

const releaseMyPokemon = async (request, reply) => {
  try {
    const { id } = request.params

    const response = await PokemonHelper.releaseMyPokemon(id)

    return reply
      .status(200)
      .send({
        message: 'Release Pokemon Success',
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
Router.get('/my-pokemon', myPokemon)
Router.delete('/release-pokemon/:id', releaseMyPokemon)

module.exports = Router;
