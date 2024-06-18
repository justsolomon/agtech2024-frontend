import { Box, Stack } from '@chakra-ui/react';
import AppHeader from 'components/global/AppHeader';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <AppHeader />

      <Box as="main">{children}</Box>
    </>
  );
};

export default Layout;
