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

const catchPokemon = async (name) => {

  const probability = Math.random() < 0.5
  const option = {
    method: 'get',
    baseURL: `${process.env.BASEURL_POKEAPI}`,
    url: `pokemon/${name}`
  }

  try {

    if (probability) {
      const dbMyPokemon = await fs.readFileSync(fileName, 'utf-8')
      const currentData = JSON.parse(dbMyPokemon)

      const response = await GeneralHelper.commonHttpRequest(option)
      const addData = {
        id: currentData.length + 1,
        name: response?.name,
        weight: response?.weight,
        nickname: response?.name
      }

      await fs.writeFileSync(fileName, JSON.stringify([...currentData, addData]))

      return Promise.resolve(addData)
    } else {
      throw ('Catch Pokemon Failed')
    }

  } catch (error) {

    console.log(error)
    return Promise.reject(error)

  }
}

module.exports = {
  getPokemonList,
  getAllPokemon,
  catchPokemon
}
