import bcrypt from "bcrypt";
import axios from "axios";
import Cookie from "js-cookies"
import { request, gql, GraphQLClient } from "graphql-request";

export default async (req, res) => {
  const endpoint = "http://localhost:3333/graphql";
  const strapi = new GraphQLClient(endpoint, { headers: {
    "Content-Type" : "application/json"
  } });
  const createClient = gql`
    mutation createClient($fullname: String!, $phone: String!, $password: String!, $role: String!) {
      createClient(fullname: $fullname, phone: $phone, password: $password, role: $role){
        data: {
          id 
          attributes: {
            fullname
            phone
            password
            role
          }
        }
      }
    }
  `;

  if (req.method === "POST") {
    const { fullname, phone, password, role } = req.body;
    const variables = {
      fullname,
      phone,
      password,
      role,
    };
    try {
      const { data } = await strapi.request(createClient, variables);

      const result = data.data;
      return res
        .status(200)
        .json({ client: result, message: "client created successfully" });
    } catch (error) {
      throw new Error(error);
    }
  } else {
    return res.status(404).json({ message: "Method not allowed" });
  }
};
