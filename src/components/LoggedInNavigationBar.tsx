import Home from "@pages/Home";
import HamburgerMenu from "./Header/HamburgerMenu";
import { useEffect, useState } from "react";
import { isMobileDevice } from "@utils/helpers";


export default function LoggedInNavigationBar() {
  const [isMobile, setIsMobile] = useState(isMobileDevice());

  useEffect(() => {
    function handleResize() {
      setIsMobile(isMobileDevice());
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  return (
    <div > {/* style={{ position: 'relative' }} */}
      <HamburgerMenu isMobileDevice={isMobile} />
      <Home isMobileDevice={isMobile} />
    </div>
  )
}