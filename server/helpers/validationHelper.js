const Joi = require('joi');
const Boom = require('boom');

const pokemonListValidation = (data) => {
  const schema = Joi.object({
    id: Joi.number().required().description('Pokemon id')
  });

  if (schema.validate(data).error) {
    throw Boom.badRequest(schema.validate(data).error);
  }
};

const pokemonCatchValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().required().description('Pokemon name; i.e. Bulbasaur')
  });

  if (schema.validate(data).error) {
    throw Boom.badRequest(schema.validate(data).error);
  }
};

const pokemonRenameValidation = (data) => {
  const schema = Joi.object({
    id: Joi.number().required().description('Pokemon id'),
    nickname: Joi.string().required().description('Pokemon nickname')
  });

  if (schema.validate(data).error) {
    throw Boom.badRequest(schema.validate(data).error);
  }
};

module.exports = { 
  pokemonListValidation,
  pokemonCatchValidation,
  pokemonRenameValidation
};
