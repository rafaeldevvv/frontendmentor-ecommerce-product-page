import { useEffect, useState } from "react";

export default function useIsMobile() {
   const [isMobile, setIsMobile] = useState(true);

   useEffect(() => {
      const mql = matchMedia("(max-width:767px)");
      setIsMobile(mql.matches);

      mql.onchange = function (e) {
         setIsMobile(e.matches);
      };
      return () => {
         mql.onchange = null;
      };
   }, []);

   return isMobile;
}