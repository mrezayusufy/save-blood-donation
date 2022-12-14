import axios from "axios";

export default async (req, res) => {
  if (req.method === "POST") {
    const body = req.body;
    try {
      // find the role
      const role = await axios.get("http://localhost:3333/api/roles/type/"+body.role).then((res) => res.data).catch((e) => e.message);
      // register new user
      const response = await axios.post(
            "http://localhost:3333/api/auth/local/register",
            {
              username: body.phone,
              phone: body.phone,
              email: body.phone + "@save.af",
              fullname: body.fullname,
              password: body.password,
              role: role.id,
              userRole: role.type,
            }
          )
          .then((response) => response.data)
          .catch((error) => {
            res.send({ message: error.message});
          });
          console.log(response);
          res.send(response);
    } catch (error) {
      throw new Error(error.message);
    }
  }
}