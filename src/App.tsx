import React from "react";
//@ts-ignore
const NavigationBar = React.lazy(() => import("navbar/NavigationBar"));
//@ts-ignore
const Header = React.lazy(() => import("header/Header"));
let EventBus: any = null;

export default () => {
  React.useEffect(() => {
    //@ts-ignore
    import("header/EventBus").then((obj) => {
      EventBus = obj.default;
      EventBus.subscribe("NavigationSelectEvent", (data: any) => {
        alert("NavigationSelectEvent: " + data);
      });
      EventBus.subscribe("AppBarSelectEvent", (data: any) => {
        alert("AppBarSelectEvent: " + data);
      });
    });
  }, []);
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <React.Suspense fallback="Loading header...">
        <Header />
      </React.Suspense>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <React.Suspense fallback="Loading navBar">
          <NavigationBar />
        </React.Suspense>
        <React.Suspense fallback="Loading content...">
          <div>Content...</div>
        </React.Suspense>
      </div>
    </div>
  );
};
