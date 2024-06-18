import { Box } from '@chakra-ui/react';
import ActionsMenuBar from '../ActionsMenuBar';
import BottomMenuBar from '../BottomMenuBar';

interface DriverLayoutProps {
  children: React.ReactNode;
}

const DriverLayout = ({ children }: DriverLayoutProps) => {
  return (
    <Box>
      <ActionsMenuBar />

      <Box as="main">{children}</Box>

      <BottomMenuBar />
    </Box>
  );
};

export default DriverLayout;
