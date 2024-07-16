import { routerPaths } from '@/routes/path';
import { Link } from 'react-router-dom';

// import image from '@/assets/images/logo.png';

const Logo = () => {
  return (
    <Link to={routerPaths.HOME}>
      Logo
      {/* <img src={""} alt="logo" className="h-8 w-8 object-cover" /> */}
    </Link>
  );
};

export default Logo;
