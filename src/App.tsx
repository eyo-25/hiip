import AppRouter from "./Router/AppRouter";
import { useEffect, useState } from "react";
import { authService } from "./firebase";

function App() {
  const [userObj, setUserObj] = useState<object | null>(null);
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setUserObj(user);
      } else {
        setUserObj(null);
      }
    });
  }, []);
  return (
    <>
      <AppRouter isLoggedIn={Boolean(userObj)} userObj={userObj} />
    </>
  );
}

export default App;
