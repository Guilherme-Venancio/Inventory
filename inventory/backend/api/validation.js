module.exports = app => {
    function existsOrError(value, msg) {
        if (!value) throw msg
        if (Array.isArray(value) && value.length === 0) throw msg
        if (typeof value === 'string' && !value.trim()) throw msg
    }

    function notExistsOrError(value, msg) {
        try {
            existsOrError(value, msg)
        } catch (msg) {
            return
        }
        throw msg
    }

    function equalsOrError(valueA, valueB, msg) {
        if (valueA !== valueB) throw msg
    }

    function validationOrError(valueA, valueB, msg) {
        if ( valueA.length < valueB ) throw msg
    }

    function MoveOrError(valueA, valueB) {
        if(valueA = String){
            valueA = valueB
        }
    }

    return { existsOrError, notExistsOrError, equalsOrError, validationOrError, MoveOrError }
}