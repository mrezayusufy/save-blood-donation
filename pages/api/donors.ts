import { getToken } from "next-auth/jwt";
import { UserSessionType } from "../../src/types/userType";
import axios from 'axios';
import http from "@/src/lib/api";

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
      // pagination[start]=0&pagination[limit]=10
      //  res.send({
      //   limit: query.limit,
      //   start: query.start,
      //  })
      // GET /api/articles?sort[0]=title%3Aasc&sort[1]=slug%3Adesc
      const pagination = `pagination[page]=${query.page ?? 0}&pagination[pageSize]=${query.pageSize ?? 3}`;
      const filters = `filters[userRole][$eq]=donor`;
      const requests = `populate[0]=requests`
      const donors = await http.get(`users?${filters}&${pagination}&${requests}`, config).then((res) => res.data)
      res.send(donors);
    }
  }
};
