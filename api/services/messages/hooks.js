import auth from '@feathersjs/authentication';
import local from '@feathersjs/authentication-local';
import { restrictToOwner } from 'feathers-authentication-hooks';
import {
  fastJoin, disallow, iff, isProvider, keep
} from 'feathers-hooks-common';
import feathersErrors from '@feathersjs/errors';
import _ from 'lodash';

function joinResolvers(context) {
  const { app } = context;
  const users = app.service('users');

  return {
    joins: {
      author: () => async message => {
        const author = message.sentBy ? await users.get(message.sentBy) : null;
        message.author = author;
        return message;
      }
    }
  };
}

function validate() {
  return context => {
    const { data } = context;

    const Validator = require('feathers-validator');
    const validator = new Validator(data, {
      text: 'required'
    });
    const errors = validator.errors();

    if (!_.isEmpty(errors)) {
      throw new feathersErrors.BadRequest('Incomplete oauth registration', errors);
    }
    return context;
  };
}

const joinAuthor = [
  fastJoin(joinResolvers, {
    author: true
  }),
  local.hooks.protect('author.password')
];

const messagesHooks = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [
      validate(),
      context => {
        const { data, params } = context;

        context.data = {
          text: data.text,
          sentBy: params.user ? params.user._id : null, // Set the id of current user
          createdAt: new Date()
        };
      }
    ],
    update: disallow(),
    patch: [
      auth.hooks.authenticate('jwt'),
      restrictToOwner({ ownerField: 'sentBy' }),
      iff(isProvider('external'), keep('text'))
    ],
    remove: disallow()
  },
  after: {
    all: [],
    find: joinAuthor,
    get: joinAuthor,
    create: joinAuthor,
    update: [],
    patch: joinAuthor,
    remove: []
  }
};

export default messagesHooks;
