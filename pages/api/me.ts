import axios from "axios";
import { UserType } from "@/src/types/userType";
import { getToken } from "next-auth/jwt";
import { getSession } from "next-auth/react";

export default async (req, res) => {
  const session: any = await getSession({ req })
  
  if (session) {
    const config = {
      headers: {
        Authorization: `Bearer ${session.user.jwt}`,
      },
    };
    if (req.method === "GET") {
      try {
        const data = await axios
          .get("http://localhost:3333/api/users/me", config)
          .then((response) => response.data)
          .catch((error) => {
            res.send({ message: error.message, status: error.status });
          });
        res.send(JSON.stringify(data, null, 2));
      } catch (error) {
        res.send({ message: error.message });
      }
    }
    if (req.method === "PUT") {
      const user = req.body as UserType;
      try {
        const roleFound = await axios
          .get("http://localhost:3333/api/roles/type/" + user.role)
          .then((res) => res.data)
          .catch((e) => e.message);
        user.userRole = roleFound.type;
        user.role = roleFound.id;
        const response = await axios
          .put(
            "http://localhost:3333/api/users/" + user.id,
            user,
            config
          )
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
    res.send({ message: "Not authorized!" });
    res.status(401);
  }

  res.end();
};
