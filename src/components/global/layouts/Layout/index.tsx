import { Box, Stack } from '@chakra-ui/react';
import AppLogo from 'components/global/AppLogo';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Stack as="header" h="60px" align="center" justify="center" px={4}>
        <AppLogo />
      </Stack>

      <Box as="main">{children}</Box>
    </>
  );
};

export default Layout;
