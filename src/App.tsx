import AppRouter from "./Router/AppRouter";
import { useEffect, useState } from "react";
import { authService } from "./firebase";
import { Container } from "./Component/layout/Container";
import { Footer } from "./Component/Footer";

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
      <Container>
        <AppRouter isLoggedIn={Boolean(userObj)} />
      </Container>
      {userObj ? <Footer /> : null}
    </>
  );
}

export default App;
