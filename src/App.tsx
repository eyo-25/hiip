import AppRouter from "./Router/AppRouter";
import { useEffect, useState } from "react";
import { authService } from "./firebase";

function App() {
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState<object | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setUserObj({ user });
      } else {
        setUserObj(null);
      }
      setInit(true);
    });
  }, []);
  return (
    <>
      <AppRouter isLoggedIn={Boolean(userObj)} />
    </>
  );
}

export default App;
