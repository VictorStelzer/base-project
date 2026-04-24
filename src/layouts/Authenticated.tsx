import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useThemeMode } from '@/hooks/useThemeMode';

const AuthenticatedLayout = () => {
  const { setLayoutType } = useThemeMode();

  useEffect(() => {
    setLayoutType('auth');
  }, [setLayoutType]);

  return (
    <>
      <Outlet />
    </>
  );
};

export default AuthenticatedLayout;
