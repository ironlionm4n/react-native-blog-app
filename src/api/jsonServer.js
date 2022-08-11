import axios from 'axios'

export default axios.create({
  // must be updated once tunnel session expires
  baseURL: 'https://35f3-2600-1702-2a0-13d0-d8d9-2613-dfc2-ffe4.ngrok.io/'
})
