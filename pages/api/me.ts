// This is an example of how to read a JSON Web Token from an API route
import { getToken } from "next-auth/jwt";
import axios from "axios";
import { UserSessionType, UserType } from '@/src/types/userType';

export default async (req, res) => {
  const token = await getToken({ req });
  const userSession = token.user as UserSessionType;
  const config = {
    headers: {
      Authorization: "Bearer " + userSession.jwt,
    },
  };

  if (token) {
    if (req.method === "GET") {
      const data = await axios
        .get("http://localhost:3333/api/users/me", config)
        .then((response) => response.data)
        .catch((error) => {
          res.send({ message: error.message, status: error.status });
        });
      res.send(JSON.stringify(data, null, 2));
    }
    if (req.method === "PUT") {
      const user = req.body as UserType;
      try {        
        const roleFound = await axios.get("http://localhost:3333/api/roles/type/"+user.role).then((res) => res.data).catch((e) => e.message);
        user.userRole = roleFound.type;
        user.role = roleFound.id;
        const response = await axios.put("http://localhost:3333/api/users/" + userSession.id, user, config )
          .then((response) => response.data)
          .catch((error) => {
            res.send({ message: error.message, status: error.status });
          });
          res.send(response);
      } catch (error) {
        throw new Error(error.message);
      }
    }
  } else {
    // Not Signed in
    res.send({message: "Not authorized!"})
    res.status(401);
  }

  res.end();
};
