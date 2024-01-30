const Router = require('express').Router();

const Validation = require('../helpers/validationHelper');
const PokemonHelper = require('../helpers/pokemonHelper');
const GeneralHelper = require('../helpers/generalHelper');

const fileName = 'server/api/pokemon.js';

const list = async (request, reply) => {
  try {
    Validation.pokemonListValidation(request.query);

    const { id } = request.query;
    const response = await PokemonHelper.getPokemonList({ id });

    return reply
      .status(200)
      .send({
        message: 'Get Detail Pokemon Success',
        response
      });

  } catch (err) {

    return reply
      .status(400)
      .send({
        error: err.details ? err.details[0].message : err.message
      });
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
    Validation.pokemonCatchValidation(request.body);

    const { name } = request.body;

    const response = await PokemonHelper.catchPokemon(name);

    return reply
      .status(200)
      .send({
        message: 'Catch Pokemon Success',
        response
      });

  } catch (err) {

    return reply
      .status(400)
      .send({
        error: err.details ? err.details[0].message : err.message
      });
  }
}

const myPokemon = async (request, reply) => {
  try {
    const response = await PokemonHelper.getMyPokemon();

    return reply
      .status(200)
      .send({
        message: 'Get My Pokemon Success',
        response
      });
  } catch (err) {
    return reply
      .status(400)
      .send({
        error: err.details ? err.details[0].message : err.message
      });
  }
}

const releaseMyPokemon = async (request, reply) => {
  try {

    const response = await PokemonHelper.releaseMyPokemon();

    return reply
      .status(200)
      .send({
        message: 'Release Pokemon Success',
        response
      });

  } catch (err) {
    return reply
      .status(400)
      .send({
        error: err.details ? err.details[0].message : err.message
      });
  }
}

const renameNickname = async (request, reply) => {
  try {
    const { id } = request.query;
    const { nickname } = request.body;
    Validation.pokemonRenameValidation({ id, nickname });

    const response = await PokemonHelper.rename(id, nickname);

    return reply
      .status(200)
      .send({
        message: 'Rename Pokemon Success',
        response
      });

  } catch (err) {
    return reply
      .status(400)
      .send({
        error: err.details ? err.details[0].message : err.message
      });
  }
}

Router.get('/list', list);
Router.get('/all_pokemon', allList);
Router.post('/catch', catchPokemon);
Router.get('/my-pokemon', myPokemon);
Router.delete('/release-pokemon', releaseMyPokemon);
Router.patch('/rename', renameNickname);

module.exports = Router;
