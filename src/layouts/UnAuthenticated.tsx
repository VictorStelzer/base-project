import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useThemeMode } from '@/hooks/useThemeMode';
import { Footer, Header } from '@/components';

const NotAuthenticatedLayout = () => {
  const { setLayoutType } = useThemeMode();

  useEffect(() => {
    setLayoutType('unauth');
  }, [setLayoutType]);

  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default NotAuthenticatedLayout;
