import { Box } from '@chakra-ui/react';
import BottomMenuBar from '../../BottomMenuBar';

interface DriverLayoutProps {
  children: React.ReactNode;
}

const DriverLayout = ({ children }: DriverLayoutProps) => {
  return (
    <Box>
      <Box as="main" h="100vh" w="100vw">
        {children}
      </Box>

      <BottomMenuBar />
    </Box>
  );
};

export default DriverLayout;
