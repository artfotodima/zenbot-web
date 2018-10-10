import alertConstants from './alert.constants'

export function alert(state = {}, action) {
    switch (action.type) {
    case alertConstants.SUCCESS:
        return {
            message: action.message,
            type: 'alert-success'
        }
    case alertConstants.ERROR:
        return {
            message: action.message,
            type: 'alert-danger'
        }
    case alertConstants.CLEAR:
        return {}
    default:
        return state
    }
}