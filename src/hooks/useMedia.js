import { useState, useEffect } from "react";

export default function useMedia(query) {
   const [matches, setMatches] = useState(false);

   useEffect(() => {
      const mql = matchMedia(query);
      setMatches(mql.matches);

      mql.onchange = function (e) {
         setMatches(e.matches);
      }

      return () => {
         mql.onchange = null;
      }
   })

   return matches;
}