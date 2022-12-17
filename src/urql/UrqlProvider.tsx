import React, { ReactNode } from "react";
import { Provider } from "urql";
import { useClient } from "./useClient";
type Props = {
  children: ReactNode;
  pageProps: any;
};
const UrqlProvider = ({ children, pageProps }: Props) => {
  const client = useClient(pageProps);
  return <Provider value={client}>{children}</Provider>;
};
export default UrqlProvider;