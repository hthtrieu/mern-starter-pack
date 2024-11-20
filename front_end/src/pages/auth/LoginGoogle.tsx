import React, { useEffect } from 'react';
import { routerPaths } from '@/routes/path';
import { getProfileAction, loginActionSuccess } from '@/store/auth/slice';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';

// import LoadingPopup from '@/components/common/loading/loading-popup/LoadingPopup';
import LoadingSpinner from '@/components/common/loading/loading-spinner/LoadingSpinner';
import Constants from '@/lib/Constants';

const LoginGoogle = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  useEffect(() => {
    if (searchParams.get(Constants.ACCESS_TOKEN)) {
      dispatch(
        loginActionSuccess({
          data: {
            accessToken: searchParams.get(Constants.ACCESS_TOKEN),
            refreshToken: searchParams.get(Constants.REFRESH_TOKEN) || '',
          },
        }),
      );
      dispatch({
        type: getProfileAction.type,
        payload: {
          onSuccess: () => {},
          onError: () => {},
        },
      });
      navigate(routerPaths.HOME);
    }
  }, [searchParams.get(Constants.ACCESS_TOKEN)]);
  return (
    <div className="min-h-screen">
      <LoadingSpinner className={''} />
    </div>
  );
};

export default LoginGoogle;
