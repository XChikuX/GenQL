import { gql } from "@apollo/client";
import { print } from "graphql";
import { createClient as createWsClient } from "graphql-ws";

const client = createWsClient({
    url: "wss://thedating.club/graphql",
    connectionParams: {
        authorization:
            "Bearer ebe39de7fce83d116fac8896302e6a6cb09c659814a572409376852629f3fea4;01H3GYFQ5W84FDEFTE92S88W0G:2023-06-22T07:32:39.276Z"
    }
});

const CHECK_SUBSCRIPTION = gql`
  subscription {
    check
  }
`;

const AUTH_SUBSCRIPTION = gql`
  subscription {
    heartBeat(pk: "01H3GYFQ5W84FDEFTE92S88W0G") {
      age
      bio
      auth {
        authToken
        derivedKey
        password
      }
      dob
      email
      fname
      height
      gender
    }
  }
`;

client.subscribe(
    {
        query: print(AUTH_SUBSCRIPTION)
    },
    {
        next(data) {
            console.log(data);
        },
        error(err) {
            console.error(err);
        }
    }
);
