const _ = require('lodash');
const axios = require('axios');

import {
  GraphQLID,
  GraphQLInt,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLNonNull
} from 'graphql';

var uuid = require('uuid');

const ReverseType = new GraphQLObjectType({
  name: "Reverse",
  description: "before Reverse string",
  fields: () => ({
    stringInput: {type: GraphQLString}
  })
});
const RequestType = new GraphQLObjectType({
  name: "Request",
  description: "before Request",
  fields: () => ({
    URL: {type: GraphQLString},
    POSTGET:{type: GraphQLString},
    DATA:{type:GraphQLString}
  })
});
// This is the Root Query
const ReverseQueryRootType = new GraphQLObjectType({
  name: 'ReverseSchema',
  description: "Reverse Schema Query Root",
  fields: () => ({
    reservation: {
      type: ReservationType,
      args:{
        stringInput: {type: GraphQLString}
      },
      resolve(parentValue, args) {
        return args;
      }
    }
  })
});

// Mutations
const ReverseMutations = new GraphQLObjectType({
  name: 'ReverseMutations',
  fields: () => ({
    ReverseMutations: {
      type: new GraphQLNonNull(ReverseType),
      description: "Reverse a string!",
      args: {
        stringInput: {type: GraphQLString}
      },
      resolve(parentValue, {stringInput}) {
        var s = "";
        for (var i = stringInput.length - 1; i >= 0; i--){
            s += stringInput[i];
        }
        return {stringInput:s};
      }
    },
    URLRequest: {
      type: new GraphQLNonNull(RequestType),
      description: "Reverse a string!",
      args: {
          URL: {type: GraphQLString},
          POSTGET:{type: GraphQLString}
      },
      resolve(parentValue, {URL,POSTGET}) {
        var result="";
        
        if(POSTGET === 'GET'){
          result = axios.get(URL).then((response) => {
              console.log('Get made', response.data)
              
              return JSON.stringify(response.data);
          })
          .catch((error) => {
              console.log(error.response)
          });
        }
        else {
           result = axios.post(URL).then((response) => {
              console.log('Post made', response.data)
              return JSON.stringify(response.data);
          })
          .catch((error) => {
              console.log(error.response)
          });
        }
        console.log(result);
        return {URL:result};
      }
    }
  })
});

// Schema
const ReservationsSchema = new GraphQLSchema({
  name: "ReservationSchema",
  query: ReverseMutations,
  mutation: ReverseMutations
});
export default ReservationsSchema;