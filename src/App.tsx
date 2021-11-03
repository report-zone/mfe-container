import React from "react";

import UsersContent from "./components/UsersContent";
import GroupsContent from "./components/GroupsContent";

// Micro frontend imports require ts-ignore as they reside in another repo and vscode cannot find them
//@ts-ignore
const NavigationBar = React.lazy(() => import("navbar/NavigationBar"));
//@ts-ignore
const Header = React.lazy(() => import("header/Header"));

let EventBus: any = null;

export default () => {

  const [content,setContent] = React.useState(<UsersContent/>);

  React.useEffect(() => {
    // Micro frontend imports require ts-ignore as they reside in another repo and vscode cannot find them
    //@ts-ignore
    import("header/EventBus").then(({default:EventBus}) => {
      EventBus.subscribe("NavigationSelectEvent", (data: any) => {
        console.log("NavigationSelectEvent: " + data);
        switch(data){
          case "Users":
            setContent(<UsersContent/>)
            break;
          case "Groups":
            setContent(<GroupsContent/>)
          break;
          default:
            break;
        }
      });
      EventBus.subscribe("AppBarSelectEvent", (data: any) => {
        console.log("AppBarSelectEvent: " + data);
      });
    });
  }, []);
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <React.Suspense
        fallback={
          <div
            style={{ fontSize: "36px", backgroundColor: "red", color: "green", height:"48px" }}
          >
            Loading Container...
          </div>
        }
      >
        <Header />
      </React.Suspense>
      <div style={{ display: "flex", flexDirection: "row", width: "100%" }}>
        <React.Suspense
          fallback={
            <div
              style={{
                fontSize: "36px",
                backgroundColor: "blue",
                color: "yellow",
                width: "300px",
                height:"100vh"
              }}
            >
              Loading Navbar...
            </div>
          }
        >
          <NavigationBar />
        </React.Suspense>
        <React.Suspense
          fallback={
            <div
              style={{
                fontSize: "36px",
                backgroundColor: "red",
                color: "green",
                width: "90%",
              }}
            >
              Loading Content...
            </div>
          }
        >
          {content}
        </React.Suspense>
      </div>
    </div>
  );
};
