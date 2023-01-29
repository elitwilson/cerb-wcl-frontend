import axios from "axios";
//import { request, gql } from "graphql-request";

const query = (gql) => {
  var config = {
    method: 'post',
    url: 'http://localhost:3001/gqlquery',
    headers: { 
      'Content-Type': 'application/json'
    },
    data : gql
  };
  
  axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
      console.log(error);
    });
};

export default query;
