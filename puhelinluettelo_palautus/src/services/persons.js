import axios from 'axios'
const Url = 'http://localhost:3001/persons'

const getAll = () => {
    const request = axios.get(Url)
    return request.then(response => response.data)
}

const create = newObject => {
    const request = axios.post(Url, newObject)
    return request.then(response => response.data)
}

const deletePerson = deleteID => {
    const personToDelete = `${Url}/${deleteID}`
    const request = axios.delete(personToDelete)
    console.log(request.then(response => response))
    return(
        request.then(response => response)
    )
}

export default { getAll, create, deletePerson }
