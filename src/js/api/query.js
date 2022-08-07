import axios from 'axios'
import { request, gql } from 'graphql-request'

const query = (gql) => {
    let token = ''
    console.log(gql)
    axios.get('http://localhost:3001/gettoken') // Don't hardcode this...
    .then(function (response) {
        // handle success
        console.log(response);
        token = response.data.token
    })
    .catch(function (error) {
        // handle error
        console.log(error);
    })
    .then(function () {
        // always executed
    });
}

export default query