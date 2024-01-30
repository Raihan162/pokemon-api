const _ = require('lodash');
const fs = require('fs')
const axios = require('axios')

const GeneralHelper = require('../helpers/generalHelper');

const fileName = `${__dirname}/../../assets/my_pokemon.json`

const getPokemonList = async ({ id }) => {
  try {

    const option = {
      method: 'get',
      baseURL: `${process.env.BASEURL_POKEAPI}`,
      url: `pokemon/${id}`
    }

    const response = await GeneralHelper.commonHttpRequest(option)

    return Promise.resolve({ name: response?.name, weight: response?.weight, species: response?.species, abilities: response?.abilities })

  } catch (error) {
    return Promise.reject(error)
  }
}

const getAllPokemon = async () => {
  try {

    const option = {
      method: 'get',
      baseURL: `${process.env.BASEURL_POKEAPI}`,
      url: 'pokemon/'
    }

    const response = await GeneralHelper.commonHttpRequest(option)

    return Promise.resolve(response?.results)

  } catch (error) {
    return Promise.reject(error)
  }
}

module.exports = {
  getPokemonList,
  getAllPokemon
}
