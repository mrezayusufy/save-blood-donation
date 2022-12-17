import { getToken } from 'next-auth/jwt';
import { getSession } from 'next-auth/react';

export default async (req, res) => {
  const session = await getSession({req});
  res.send(session);
  var secret = process.env.NEXT_PUBLIC_NEXTAUTH_SECRET;
  const response = await getToken({ req: req, secret: secret, raw: true})
  res.send({"response": response});
  
  // res.send({"token":token, "secret": secret})
};
