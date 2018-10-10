import alertConstants from './alert.constants'

export class AlertActions {
    static success(message) {
        return { type: alertConstants.SUCCESS, message }
    }

    static error(message) {
        return { type: alertConstants.ERROR, message }
    }

    static clear() {
        return { type: alertConstants.CLEAR }
    }
}

export default AlertActions