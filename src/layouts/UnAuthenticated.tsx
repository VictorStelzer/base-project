import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useThemeMode } from '@/hooks/useThemeMode';

const NotAuthenticatedLayout = () => {
  const { setLayoutType } = useThemeMode();

  useEffect(() => {
    setLayoutType('unauth');
  }, [setLayoutType]);

  return (
    <>
      <Outlet />
    </>
  );
};

export default NotAuthenticatedLayout;
