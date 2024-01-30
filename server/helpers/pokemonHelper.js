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

      console.log(GeneralHelper.fibonacci(4), '<<<< FIBO')
      const filteredData = currentData?.filter((data) => data.name === name)
      console.log(filteredData)

      if (filteredData.length === 0) {
        const response = await GeneralHelper.commonHttpRequest(option)
        const addData = {
          id: currentData.length + 1,
          name: response?.name,
          weight: response?.weight,
          nickname: response?.name
        }

        await fs.writeFileSync(fileName, JSON.stringify([...currentData, addData]))

        return Promise.resolve(addData)
      } else if (filteredData.length >= 1) {
        const response = await GeneralHelper.commonHttpRequest(option)
        const addData = {
          id: currentData.length + 1,
          name: response?.name,
          weight: response?.weight,
          nickname: `${response?.name}-${GeneralHelper.fibonacci(filteredData.length) }`
        }

        await fs.writeFileSync(fileName, JSON.stringify([...currentData, addData]))

        return Promise.resolve(addData)
      } 

    } else {
      throw ('Catch Pokemon Failed')
    }

  } catch (error) {

    console.log(error)
    return Promise.reject(error)

  }
}

const getMyPokemon = async () => {
  try {
    const dbMyPokemon = await fs.readFileSync(fileName, 'utf-8')
    const currentData = JSON.parse(dbMyPokemon)
    if (currentData.length === 0) {
      throw { message: 'Data My Pokemon Empty' }
    }
    return Promise.resolve(currentData)
  } catch (error) {
    console.log(error)
    return Promise.reject(error)
  }
}

const releaseMyPokemon = async () => {
  try {
    const randNum = Math.floor(Math.random() * 10)

    if (GeneralHelper.isPrime(randNum)) {

      const dbMyPokemon = await fs.readFileSync(fileName, 'utf-8')
      const currentData = JSON.parse(dbMyPokemon)

      const checkData = currentData?.filter((data) => data.id === randNum)
      if (checkData.length === 0) {
        throw { message: 'Id does`t exist in My Pokemon' }
      }

      const deleteData = currentData?.filter((data) => data.id !== randNum)

      await fs.writeFileSync(fileName, JSON.stringify(deleteData))

      return getMyPokemon()
    } else {
      throw { message: 'Release pokemon failed.' }
    }

  } catch (error) {
    console.log(error)
    return Promise.reject(error)
  }
}

module.exports = {
  getPokemonList,
  getAllPokemon,
  catchPokemon,
  getMyPokemon,
  releaseMyPokemon
}
