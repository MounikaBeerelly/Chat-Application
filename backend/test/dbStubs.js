function find() {
}

function updateOne() {
}

function deleteOne() {
}

function insert() {

}


const findSuccess = {
    toArray: (callback) => {
        callback(undefined, [{ firstname: 'dummy', lastname: 'dummy', userName: 'dummy', password: 'dummy' }]);
    }
}

const findError = {
    toArray: (callback) => {
        callback('Connection timedout', undefined);
    }
}

const findInvalid = {
    toArray: (callback) => {
        callback(undefined, []);
    }
}


module.exports = { find, deleteOne, updateOne, insert, findInvalid, findError, findSuccess }

