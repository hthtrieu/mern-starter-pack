import { useEffect, useState } from 'react';
import { routerPaths } from '@/routes/path';
import { Folder, PlusCircle, Search, Send } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import { LoginForm } from '@/components/auth/login/LoginForm';
import { RegisterForm } from '@/components/auth/register/RegisterForm';
import UserPopover from '@/components/auth/user-popover/UserPopover';
import Logo from '@/components/common/logo/Logo';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Form } from '@/components/ui/form';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { logoutAction } from '@/store/auth/slice';
import Constants from '@/lib/Constants';
import { getUserJWTDecode } from '@/lib/utils';

import { FormInput } from '../../custom_input/CustomInput';
import MaxWidthWrapper from '../../MaxWidthWrapper';

const userProfile = getUserJWTDecode();
const MainHeader = (props: any) => {
  const { isAdmin, className } = props;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loggedIn, profile } = useSelector((state: any) => state.Auth);
  const [openDialogLogin, setOpenDialogLogin] = useState(false);
  const [openDialogRegister, setOpenDialogRegister] = useState(false);
  return (
    <div className="hidden h-20 md:block md:w-full">
      <div className="flex h-full w-full items-center justify-between">
        <div className="row-span-1 flex w-fit items-center md:col-span-1">
          <Logo />
        </div>
        <div className="w-3/6">
        
        </div>
        <div className="flex w-1/6 justify-end gap-1">
          {loggedIn ? (
            <>
              <UserPopover />
              <div></div>
            </>
          ) : (
            <>
              <Dialog open={openDialogLogin} onOpenChange={setOpenDialogLogin}>
                <DialogTrigger className="w-fit rounded-sm bg-background p-1 text-sm font-semibold hover:dark:text-inherit">
                  Sign in
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
                  Sign up
                </DialogTrigger>
                <DialogContent>
                  <RegisterForm setOpen={setOpenDialogRegister} />
                </DialogContent>
              </Dialog>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MainHeader;
