import axios from "axios";
//import { request, gql } from "graphql-request";

const query = (gql) => {
  // axios({
  //   url: 'http://localhost:3001/gqlquery',
  //   method: 'post',
  //   data: gql
  // }).then((result) => {
  //   console.log(result.data)
  // });
  // var data = JSON.stringify(gql);
  // console.log(data)
  
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
  // axios
  //   .get("http://localhost:3001/gqlquery")
  //   .then(function (response) {
  //     // handle success
  //     console.log(response);
  //   })
  //   .catch(function (error) {
  //     // handle error
  //     console.log(error);
  //   })
  //   .then(function () {
  //     // always executed
  //   });
};

export default query;
