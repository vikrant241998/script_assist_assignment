import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { MantineProvider } from "@mantine/core";
import 'bootstrap/dist/css/bootstrap.min.css';
import { theme } from "./theme";
import "./App.scss";
import 'aos/dist/aos.css';
import AOS from 'aos';
AOS.init();



export default function App() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
	
      <MantineProvider theme={theme} withGlobalStyles withNormalizeCSS>
        <Outlet />
      </MantineProvider>
    </>
  );
}




