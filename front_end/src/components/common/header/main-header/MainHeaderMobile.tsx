import { useState } from 'react';
import { routerPaths } from '@/routes/path';
import { Folder, PlusCircle, Search, Send } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
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
import { Separator } from '@/components/ui/separator';
import Constants from '@/lib/Constants';
import { getUserJWTDecode } from '@/lib/utils';

import { FormInput } from '../../custom_input/CustomInput';
import MaxWidthWrapper from '../../MaxWidthWrapper';

const userProfile = getUserJWTDecode();
const MainHeaderMobile = (props: any) => {
  const { isAdmin } = props;
  const { loggedIn, profile } = useSelector((state: any) => state.Auth);
  const navigate = useNavigate();
  const [openDialogLogin, setOpenDialogLogin] = useState(false);
  const [openDialogRegister, setOpenDialogRegister] = useState(false);
  const [showSubmit, setShowSubmit] = useState(false);
  const form = useForm();
  const onTextChanged = (value: any) => {
    setShowSubmit(value.length > 0);
  };

 
  return (
    <>
      <div className="mb-2 w-full py-2 md:hidden">
        <div className="mb-2 flex w-full justify-between">
          <div className="col-span-1 flex items-center">
            <Button variant={'ghost'}>
              <Link to={routerPaths.HOME}>
                <Logo />
              </Link>
            </Button>
  
          </div>
          <div className="col-span-1 flex justify-end gap-2">
            {loggedIn ? (
              <>
                <UserPopover />
                <div></div>
              </>
            ) : (
              <>
                <Dialog>
                  <DialogTrigger className="w-fit rounded-sm bg-background p-1 text-sm font-semibold hover:dark:text-inherit">
                    Sign in
                  </DialogTrigger>
                  <DialogContent>
                    <LoginForm />
                  </DialogContent>
                </Dialog>
                <Dialog>
                  <DialogTrigger className="w-fit rounded-sm bg-background p-1 text-sm font-semibold hover:dark:text-inherit">
                    Sign up
                  </DialogTrigger>
                  <DialogContent>
                    <RegisterForm />
                  </DialogContent>
                </Dialog>
              </>
            )}
          </div>
        </div>
        <MaxWidthWrapper className="w-full p-0">
    
        </MaxWidthWrapper>
      </div>
    </>
  );
};

export default MainHeaderMobile;
