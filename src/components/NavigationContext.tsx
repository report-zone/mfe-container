import * as React from "react";

const NavigationContext: any = React.createContext({});

function useNavigation() {
  const context = React.useContext(NavigationContext);
  if (context === undefined) {
    throw new Error("useCount must be used within a CountProvider");
  }
  return context;
}

function navigationReducer(state: any, action: any) {
  return { selected: action.selected };
}

function NavigationProvider({ children }: any) {
  const [state, dispatch] = React.useReducer(navigationReducer, {
    selected: "Users",
  });
  // NOTE: you *might* need to memoize this value
  // Learn more in http://kcd.im/optimize-context
  const value = { state, dispatch };
  return (
    <NavigationContext.Provider value={value}>
      {children}
    </NavigationContext.Provider>
  );
}

export { NavigationProvider, useNavigation };
