import { Stack } from '@chakra-ui/react';
import AppLogo from '../AppLogo';

const AppHeader = () => {
  return (
    <Stack as="header" h="60px" align="center" justify="center" px={4}>
      <AppLogo />
    </Stack>
  );
};

export default AppHeader;
