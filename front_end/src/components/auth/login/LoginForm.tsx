import { routerPaths } from '@/routes/path';
import { getProfileAction, loginAction } from '@/store/auth/slice';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';

import { FormInput } from '@/components/common/custom_input/CustomInput';
import GoogleIcon from '@/components/common/icons/GoogleIcon';
import LoadingPopup from '@/components/common/loading/loading-popup/LoadingPopup';
import LoadingSpinner from '@/components/common/loading/loading-spinner/LoadingSpinner';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Form } from '@/components/ui/form';
// import { Link } from "react-router-dom"
import { Separator } from '@/components/ui/separator';
import { toast } from '@/components/ui/use-toast';
import Constants from '@/lib/Constants';

const BACKEND_URL = import.meta.env.VITE_API_URL;

export function LoginForm(props: any) {
  const { isLoading } = useSelector((state: any) => state.Auth);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { setOpen } = props;
  const formSchema = z.object({
    username: z.string().min(2, {
      message: t('login.invalidUsername'),
    }),
    password: z.string().min(6, {
      message: t('login.invalidPassword'),
    }),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    dispatch(
      loginAction({
        data: values,
        onSuccess: () => {
          setOpen(false);
          navigate(routerPaths.HOME);
          toast({
            title: 'Login success',
            description: 'Welcome back!',
            variant: 'default',
          });
          dispatch({
            type: getProfileAction.type,
            payload: {
              onSuccess: () => {},
              onError: () => {},
            },
          });
        },
        onError: (message: string) => {
          setOpen(true);
          toast({
            title: 'Login failed',
            description: message ? message : 'Please login again!',
            variant: 'destructive',
          });
        },
      }),
    );
  }
  const gotoForgotPassword = () => {
    setOpen(false);
    navigate(routerPaths.FORGOT_PASSWORD);
  };
  const googleAuth = () => {
    window.open(`${BACKEND_URL}/auth/login-google`, '_self');
  };
  return (
    <>
      <LoadingPopup open={isLoading} />

      <Card className="">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>Login to your account</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="space-y-1">
                <FormInput
                  control={form.control}
                  fieldName="username"
                  label="Username"
                  placeholder="Username"
                  type={Constants.INPUT_TYPE.TEXT}
                  required={true}
                />
              </div>
              <div className="space-y-1">
                <FormInput
                  control={form.control}
                  fieldName="password"
                  label="Password"
                  placeholder="Password"
                  required={true}
                  type={Constants.INPUT_TYPE.PASSWORD}
                />
                <Button
                  variant={'link'}
                  type="button"
                  onClick={gotoForgotPassword}
                >
                  Forgot password?
                </Button>
              </div>
              <div className="space-y-1">
                <Button
                  type="submit"
                  variant="default"
                  className="m-auto w-full"
                >
                  Login
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>

        <CardFooter className="flex w-full flex-col">
          <div className="flex w-full items-center justify-between">
            <Separator className="w-1/3" />
            <span>or</span>
            <Separator className="w-1/3" />
          </div>
          <div className="w-full">
            <Button
              type="button"
              variant={'outline'}
              onClick={() => {
                googleAuth();
              }}
              className="m-auto my-2 w-full bg-white text-rose-500 dark:bg-red-400 dark:text-white"
            >
              <GoogleIcon /> <span className="ml-2">Sign in with Google</span>
            </Button>
          </div>
        </CardFooter>
      </Card>
      {/* // )} */}
    </>
  );
}
