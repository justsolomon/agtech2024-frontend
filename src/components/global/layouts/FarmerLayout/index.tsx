import { Box } from '@chakra-ui/react';
import ActionsMenuBar from '../../ActionsMenuBar';

interface FarmerLayoutProps {
  children: React.ReactNode;
}

const FarmerLayout = ({ children }: FarmerLayoutProps) => {
  return (
    <Box>
      <ActionsMenuBar />

      <Box as="main">{children}</Box>
    </Box>
  );
};

export default FarmerLayout;
