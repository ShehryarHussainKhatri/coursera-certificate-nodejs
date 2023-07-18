const axios = require('axios')


const URL = "http://localhost:5000"
const books = async () => {
    const {data} = await axios(`${URL}`)
    console.log(data)
}

const getBookByISBN = async () => {
    const isbn = 10001
    try{
        const {data} = await axios.get(`${URL}/isbn/${isbn}`)
         console.log(data)
    }catch(e){
        console.log(e)
    }
    
}
const getBookByAuthor = async () => {
    const author = "Chinua Achebe"
    try{
        const {data} = await axios.get(`${URL}/author/${author}`)
         console.log(data)
    }catch(e){
        console.log(e)
    }
    
}
const getBookByTitle = async () => {
    const title = "One Thousand and One Nights"
    try{
        const {data} = await axios.get(`${URL}/title/${title}`)
         console.log(data)
    }catch(e){
        console.log(e)
    }
    
}

getBookByTitle()