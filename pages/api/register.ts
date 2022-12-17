import axios from "axios";

export default async (req, res) => {
  if (req.method === "POST") {
    const body = req.body;
    try {
      // register new user
      const response = await axios.post(
            "http://localhost:3333/api/auth/local/register", {
              phone: body.phone,
              fullname: body.fullname,
              password: body.password,
              role: body.role,
            })
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