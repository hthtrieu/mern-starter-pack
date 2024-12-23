import { ReactNode, useEffect } from 'react';
import { loginSuccessWithOauthAction } from '@/store/auth/slice';
import { useDispatch } from 'react-redux';
import { Outlet } from 'react-router-dom';

import { ModeToggle } from '@/components/themes/ModeToggle';

import Footer from '../common/footer/Footer';
import Header from '../common/header/Header';
// import LocalesToggle from '../common/locales_toggle/LocalesToggle';
import MainHeader from '../common/header/main-header/MainHeader';
import MainHeaderMobile from '../common/header/main-header/MainHeaderMobile';
import MaxWidthWrapper from '../common/MaxWidthWrapper';
import { Separator } from '../ui/separator';

type MainLayoutProps = {
  children?: ReactNode;
};

const MainLayout = ({ children }: MainLayoutProps) => {
  const dispatch = useDispatch();
  // const loginSuccessWithOauth = () => {
  //   dispatch({
  //     type: loginSuccessWithOauthAction.type,
  //     payload: {},
  //   });
  // };
  // useEffect(() => {
  //     loginSuccessWithOauth()
  // }, [])

  return (
    <>
      <Header />
      <main className="min-h-screen">
        <MaxWidthWrapper className="">
          <Outlet />
          {/* <ModeToggle /> */}
        </MaxWidthWrapper>
      </main>
    </>
  );
};

export default MainLayout;
