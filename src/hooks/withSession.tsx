import Loader from "@/components/loader";
import { useSession } from "next-auth/react"
import { useRouter } from "next/router";
import { useState, useEffect } from 'react';
import axios from 'axios';

const withSession = (Component) => (props) => {
  const router = useRouter();
  const [role, setRole] = useState(null);
  const [me, setMe] = useState(null);
  const { status, data } = useSession({
    required: true,
    onUnauthenticated() {
      // The user is not authenticated, handle it here.
      router.replace("/auth/signin");

    },
  });
  useEffect(() => {
    (async () => {
      const res = await axios.get("/api/me").then((res) => res.data);
      setRole(res.userRole);
      setMe(res);
    })()
  }, [])
  // if the component has a render property, we are good
  if (status === "loading") return <Loader />;
  return <Component data={data} {...props} role={role} me={me} />
}
export default withSession;