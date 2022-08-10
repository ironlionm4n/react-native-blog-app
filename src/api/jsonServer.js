import axios from "axios";

export default axios.create({
    // must be updated once tunnel session expires
    baseURL: 'https://85f1-2600-1702-2a0-13d0-2c9d-7b86-f6ba-53f9.ngrok.io'
})