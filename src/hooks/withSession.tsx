import Loader from "@/components/loader";
import { useSession } from "next-auth/react"
import Router from "next/router";

const withSession = (Component) => (props) => {
  const session = useSession()
  
  // if the component has a render property, we are good
  if(session.status === "loading") return <Loader/>;
  if(session.status === "unauthenticated") Router.replace("auth/signin")
  return <Component data={session.data} {...props}/>
}
export default withSession;