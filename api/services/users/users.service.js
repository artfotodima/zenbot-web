import feathersMongoose from 'feathers-mongoose';
import createUsersModel from '../../models/users.model';
import userHooks from './users.hooks';

export default function userService(app) {
  const Model = createUsersModel(app);
  const { paginate } = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  app.use('/users', feathersMongoose(options));

  app.service('users').hooks(userHooks);
}
