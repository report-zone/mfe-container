import React from "react";

// Micro frontend imports require ts-ignore as they reside in another repo and vscode cannot find them
//@ts-ignore
const Users = React.lazy(() => import("users/Users"));

export default function UsersContent() {
  return <Users />;
}
