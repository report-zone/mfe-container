import React from "react";

// Micro frontend imports require ts-ignore as they reside in another repo and vscode cannot find them
//@ts-ignore
const Groups = React.lazy(() => import("groups/Groups"));

export default function GroupsContent() {
  return <Groups />;
}
