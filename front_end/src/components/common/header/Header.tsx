import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';

import { LoginForm } from '@/components/auth/login/LoginForm';
import { RegisterForm } from '@/components/auth/register/RegisterForm';
import UserPopover from '@/components/auth/user-popover/UserPopover';
import ModeButton from '@/components/themes/ModeButton';
import { ModeToggle } from '@/components/themes/ModeToggle';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';

import Logo from '../logo/Logo';
import MaxWidthWrapper from '../MaxWidthWrapper';

const links = [
  { title: 'Home', path: '/home' },
  { title: 'Libraries', path: '/libraries' },
  { title: 'Login', path: '/sign-in' },
  { title: 'Register', path: '/sign-up' },
];
const Header = () => {
  const { loggedIn, profile } = useSelector((state: any) => state.Auth);
  const [openDialogLogin, setOpenDialogLogin] = useState(false);
  const [openDialogRegister, setOpenDialogRegister] = useState(false);
  return (
    <header className="sticky start-0 top-0 z-20 w-full border-none bg-white/80 shadow backdrop-blur transition-all supports-[backdrop-filter]:bg-white/75 dark:bg-gray-800">
      <MaxWidthWrapper>
        <nav className="w-full">
          <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between py-2">
            <div className="">
              <NavLink
                to={'/'}
                // aria-current="page"
              >
                <Logo />
              </NavLink>
            </div>
            <div className="w-full md:block md:w-auto">
              <div className="mt-4 flex flex-row items-center font-medium md:mt-0 md:flex-row md:space-x-8 md:border-0 md:p-0 rtl:space-x-reverse">
                {loggedIn ? (
                  <>
                    <UserPopover />
                    <div></div>
                  </>
                ) : (
                  <div className="flex gap-1">
                    <Dialog
                      open={openDialogLogin}
                      onOpenChange={setOpenDialogLogin}
                    >
                      <DialogTrigger className="w-fit rounded-sm bg-background p-1 text-sm font-semibold hover:dark:text-inherit">
                        <Button variant={'outline'}>Sign in</Button>
                      </DialogTrigger>
                      <DialogContent>
                        <LoginForm setOpen={setOpenDialogLogin} />
                      </DialogContent>
                    </Dialog>
                    <Dialog
                      open={openDialogRegister}
                      onOpenChange={setOpenDialogRegister}
                    >
                      <DialogTrigger className="w-fit rounded-sm bg-background p-1 text-sm font-semibold hover:dark:text-inherit">
                        <Button>Sign up</Button>
                      </DialogTrigger>
                      <DialogContent>
                        <RegisterForm setOpen={setOpenDialogRegister} />
                      </DialogContent>
                    </Dialog>
                  </div>
                )}
                <ModeButton />
              </div>
            </div>
          </div>
        </nav>
      </MaxWidthWrapper>
    </header>
  );
};

export default Header;
