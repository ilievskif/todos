import Axios from "axios";

export default function getResp(gqlQuery) {
  const resp = Axios({
    url: "http://localhost:8888/v1/graphql",
    method: "post",
    headers: {
      "Content-Type": "application/json",
      "x-hasura-admin-secret": "myadminsecretkey",
    },
    data: {
      query: gqlQuery,
    },
  });
  return resp;
}