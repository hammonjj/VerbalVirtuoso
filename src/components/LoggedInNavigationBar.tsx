import Home from "@pages/Home";
import HamburgerMenu from "./Header/HamburgerMenu";


export default function LoggedInNavigationBar() {
  return (
    <div style={{ position: 'relative' }}>
      <HamburgerMenu/>
      <Home/>
    </div>
  )
}