import { ReactNode, useEffect, useState } from 'react';
import { routerPaths } from '@/routes/path';
import { getProfileAction } from '@/store/auth/slice';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

import { getUserJWTDecode } from '@/lib/utils';

const userProfile = getUserJWTDecode();
const RequireAuth = ({
  allowedRoles,
  children,
}: {
  allowedRoles: any;
  children?: ReactNode;
}) => {
  const { profile } = useSelector((state: any) => state.Auth);
  const location = useLocation();
  const dispatch = useDispatch();
  return (
    <>
      {allowedRoles.includes(userProfile?.role)
        ? // ? <Outlet />
          children
        : //  : (
          //   <Navigate
          //     to={routerPaths.UNAUTHORIZED}
          //     state={{ from: location }}
          //     replace
          //   />
          // )
          null}
      {/* <Outlet /> */}
    </>
  );
};

export default RequireAuth;
