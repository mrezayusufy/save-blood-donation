import { getToken } from "next-auth/jwt";
import { UserSessionType } from "../../src/types/userType";
import axios from 'axios';

export default async (req, res) => {
  const token = await getToken({ req });
  if (token) {
    if (req.method === "GET") {
      const query = req.query;
      const userSession = token.user as UserSessionType;
      const config = {
        headers: {
          Authorization: "Bearer " + userSession.jwt,
        },
      };
      
      const pagination = `&pagination[start]=${query.start ?? 0}&pagination[limit]=${query.limit ?? 10}`;
      const data = await axios.get("http://localhost:3333/api/users?filters[userRole][$eq]=acceptor"+pagination, config).then((res) => res.data)
      res.send(data);
    }
  }
};
