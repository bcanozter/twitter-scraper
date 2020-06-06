// index.js

const axios = require('axios')

const test = async () => {
  try {
    return await axios.get("localhost:8000/")
  } catch (error) {
    console.error(error)
  }
}

test()