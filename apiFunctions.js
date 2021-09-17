import 'regenerator-runtime/runtime'
import { createRolodexList } from './rolodexFunctions'

const storedUserData = JSON.parse(localStorage.getItem('userData'))

export const getListOfUsers = async () => {
    if (localStorage.length === 0) {
        const URL = 'https://jsonplaceholder.typicode.com/users'
        let res = await fetch(URL)
        let json = await res.json()

        localStorage.setItem('userData', JSON.stringify(json))
        createRolodexList(storedUserData)
    } else {
        createRolodexList(storedUserData)
    }

}