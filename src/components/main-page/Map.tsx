import { Box, createTheme } from "@mui/material";
import { useEffect } from "react";
import { useLocation } from "react-router";

const info =
  "https://makemap.2gis.ru/widget?data=eJxVkF9vmzAUxb-L9xjU2mD-RdoDc1pKSlOIukXZ1IcMe4krgqkxIU2U796Lsz0MyRI6x_d3j88ZKc2FFjwVai-MlqJD019nZD5agaboXmxMrwVyUKtVK7SxPtjS1KOP57rs43SG87stzr2yW6Tf8DovD4aFeH0qDzzN8fo7eG9lF6cJgLjoKi1bI1UDgOIhmUTzyXMnZ2XD2YDXD8utYROcH8reMFqweCi2Kqpm4dD4bJ7dLfslSxSe3_5dMi5LE5wnsKQYtaOdXbAYtPa_-eB9ld3zXbXnu9-rH6eMvZVNzAjsHIM-ZYtraLNgA_xTOBPL5Gnx-DIcqhn9Cg-oVK00RP-C3Yj8cUE5ZQ0XRzQl-N93cdD2WuiHrevaZqFkYywBSpfNxtiyQ3JDMQ1x4PjkhhCfxPErzEsOQOLRy6uD9pu2UJ28dnZG9cagqb3seZHnBzQIgjB2UD3aFhcF1Atd1_eoC_GU2gOLAhSqV3W92glR_7Sq0b24fAJyp6A1";

// https://makemap.2gis.ru/
export function Map() {
  const location = useLocation();
  let theme = createTheme({});

  // изменилась интеграция
  /* useEffect(() => {
    (function (e, t) {
      var r = document.getElementById(e) as HTMLIFrameElement;
      r.src = info;
      r.contentWindow?.document?.open();
      r.contentWindow?.document.write(atob(t));
      r.contentWindow?.document?.close();
    })("map_132371296", info);
  }, []); */

  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.substring(1));

      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);

  return (
    <div
      id="map-wrapper"
      style={{
        margin: "24px 0px",
      }}
    >
    <Box
      component="iframe"
        id="map_867675396"
        src={info}
        title="карта проезда"
        frameBorder="0"
        width="100%"
        height="300px"
        sandbox="allow-modals allow-forms allow-scripts allow-same-origin allow-popups allow-top-navigation-by-user-activation"
        sx={{
          [theme.breakpoints.down("md")]: {
            height: "200px",
          },
        }}
        ></Box>
      <div
        style={{
          padding: "12px 20px 24px",
          textAlign: "center",
        }}
      >
        Астана, Проспект Туран, 40/2, НП 7, ЖК "Alma Park"
      </div>
    </div>
  );
}
