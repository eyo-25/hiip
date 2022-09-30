import AppRouter from "./Router/AppRouter";
import { useEffect, useState } from "react";
import { authService, dbService } from "./firebase";
import { IUserObjProps } from "./Utils/interface";

function App() {
  const [userObj, setUserObj] = useState<IUserObjProps | null>(null);
  useEffect(() => {
    authService.onAuthStateChanged(async (user: any) => {
      if (user) {
        setUserObj(user);
        localStorage.setItem("user", JSON.stringify(user));
        dbService
          .collection("user")
          .doc(`${user.uid}`)
          .get()
          .then((result: any) => {
            localStorage.setItem("user", JSON.stringify(result.data()));
          });
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
