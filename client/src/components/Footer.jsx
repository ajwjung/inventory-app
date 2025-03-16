import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="py-2">
      Created by <Link className="link-offset-1" to="http://github.com/ajwjung/">Amy Jung</Link>
    </footer>
  )
};

export default Footer;