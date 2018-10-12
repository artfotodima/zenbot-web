import auth from '@feathersjs/authentication';
import local from '@feathersjs/authentication-local';
import feathersErrors from '@feathersjs/errors';
import { restrictToOwner } from 'feathers-authentication-hooks';
import { discard } from 'feathers-hooks-common';
import _ from 'lodash';

function unique(field) {
  return async (value, data, { hook }) => {
    const result = await hook.service.find({ query: { [field]: value } });
    if (result.total !== 0) {
      throw new Error('Already exist');
    }
  };
}

function validate() {
  return context => {
    const { data } = context;

    if (data.facebook && !data.email) {
      throw new feathersErrors.BadRequest('Incomplete oauth registration', data);
    }

    const Validator = require('feathers-validator');
    const validator = new Validator(data, {
      email: 'required|email',
      password: 'required|min:6|confirmed',
      password_confirmation: 'required|min:6'
    });
    unique(data.email);
    const errors = validator.errors();

    if (!_.isEmpty(errors)) {
      throw new feathersErrors.BadRequest('Incomplete oauth registration', errors);
    }
    return context;
  };
}

const userHooks = {
  before: {
    find: auth.hooks.authenticate('jwt'),
    get: auth.hooks.authenticate('jwt'),
    create: [
      validate(),
      discard('password_confirmation'),
      local.hooks.hashPassword()
    ],
    update: [
      auth.hooks.authenticate('jwt'),
      restrictToOwner({ ownerField: '_id' })
    ],
    patch: [
      auth.hooks.authenticate('jwt'),
      restrictToOwner({ ownerField: '_id' })
    ],
    remove: [
      auth.hooks.authenticate('jwt'),
      restrictToOwner({ ownerField: '_id' })
    ]
  },
  after: {
    // Make sure the password field is never sent to the client
    // Always must be the last hook
    all: local.hooks.protect('password'),
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};

export default userHooks;
