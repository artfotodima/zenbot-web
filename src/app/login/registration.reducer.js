import userConstants from './user.constants';

export function registration(state = {}, action) {
  switch (action.type) {
    case userConstants.USERS_REGISTER_REQUEST:
      return { registering: true };
    case userConstants.USERS_REGISTER_SUCCESS:
      return {};
    case userConstants.USERS_REGISTER_FAILURE:
      return {};
    default:
      return state
  }
}