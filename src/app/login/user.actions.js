import userConstants from './user.constants'
import AlertActions from './alert.actions'
import history from './history'

import config from '../conf'

function authHeader() {
    // return authorization header with jwt token
    let user = JSON.parse(localStorage.getItem('user'));

    if (user && user.token) {
        return { 'Authorization': 'Bearer ' + user.token };
    } else {
        return {};
    }
}

// function getById(id) {
//     const requestOptions = {
//         headers: authHeader(),
//         method: 'GET'
//     }

//     return fetch(`${config.apiUrl}/users/${id}`, requestOptions).then(handleResponse)
// }

// function update(user) {
//     const requestOptions = {
//         body: JSON.stringify(user),
//         headers: { ...authHeader(), 'Content-Type': 'application/json' },
//         method: 'PUT'
//     }

//     return fetch(`${config.apiUrl}/users/${user.id}`, requestOptions).then(handleResponse)
// }

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text)
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout()
                location.reload(true)
            }

            const error = (data && data.message) || response.statusText
            return Promise.reject(error)
        }

        return data
    })
}

export class userActions {
    static login(username, password) {
        return dispatch => {

        const requestOptions = {
            body: JSON.stringify({ password, username  }),
            headers: { 'Content-Type': 'application/json' },
            method: 'POST'
        }
        return fetch(`${config.apiUrl}/users/authenticate`, requestOptions)
            .then(handleResponse)
            .then(user => {
                console.log("user=",user)
                // login successful if there's a jwt token in the response
                if (user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('user', JSON.stringify(user))
                }
                dispatch({ type: userConstants.USERS_LOGIN_SUCCESS, user })
                history.push('/')
            }).catch(error => {
                console.log("error=",error)
                var errorString = error.toString()
                dispatch({ type: userConstants.USERS_LOGIN_FAILURE, errorString } )
                dispatch(AlertActions.error(error.toString()))
            })
        }
    }

    static logout() {
        localStorage.removeItem('user')
        return { type: userConstants.USERS_LOGOUT }
    }

    static register(user) {
        return dispatch => {
            dispatch(request(user))

        const requestOptions = {
            body: JSON.stringify(user),
            headers: { 'Content-Type': 'application/json' },
            method: 'POST'
        }

        fetch(`${config.apiUrl}/users/register`, requestOptions).then(handleResponse)
            .then(
                user => {
                    dispatch(success())
                    history.push('/login')
                    dispatch(AlertActions.success('Registration successful'))
                }).catch(
                error => {
                    dispatch(failure(error.toString()))
                    dispatch(AlertActions.error(error.toString()))
                }
            )
        }

        function request(user) { return { type: userConstants.USERS_REGISTER_REQUEST, user } }
        function success(user) { return { type: userConstants.USERS_REGISTER_SUCCESS, user } }
        function failure(error) { return { type: userConstants.USERS_REGISTER_FAILURE, error } }
    }

    static getAll() {
        return dispatch => {
            dispatch(request())

        const requestOptions = {
            headers: authHeader(),
            method: 'GET'
        }

        fetch(`${config.apiUrl}/users`, requestOptions).then(handleResponse).then(
                    users => dispatch(success(users)),
                    error => dispatch(failure(error.toString()))
                )
        }

        function request() { return { type: userConstants.USERS_GETALL_REQUEST } }
        function success(users) { return { type: userConstants.USERS_GETALL_SUCCESS, users } }
        function failure(error) { return { type: userConstants.USERS_GETALL_FAILURE, error } }
    }

    // prefixed function name with underscore because delete is a reserved word in javascript
    static deleteUser(id) {
        return dispatch => {
            dispatch(request(id))

            const requestOptions = {
                headers: authHeader(),
                method: 'DELETE'
            }

        fetch(`${config.apiUrl}/users/${id}`, requestOptions).then(handleResponse)
                .then(
                    user => dispatch(success(id)),
                    error => dispatch(failure(id, error.toString()))
                )
        }

        function request(id) { return { type: userConstants.USERS_DELETE_REQUEST, id } }
        function success(id) { return { type: userConstants.USERS_DELETE_SUCCESS, id } }
        function failure(id, error) { return { type: userConstants.USERS_DELETE_FAILURE, id, error } }
    }
}

export default userActions