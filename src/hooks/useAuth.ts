import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { setUserType } from 'redux/slices';
import { UserType } from 'types';

const useAuth = () => {
  const authState = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const updateUserType = (userType: UserType) => {
    dispatch(setUserType(userType));
  };

  return { ...authState, updateUserType };
};

export default useAuth;
