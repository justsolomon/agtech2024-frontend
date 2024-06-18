import { Box, Button, HStack, Text } from '@chakra-ui/react';
import { useAuth } from 'hooks';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from 'types';

const UserTypeSelect = () => {
  const { updateUserType } = useAuth();
  const navigate = useNavigate();

  const continueAsFarmer = () => {
    updateUserType('farmer');
    navigate(ROUTES.FARMER_MAP);
  };

  const continueAsDriver = () => {
    updateUserType('driver');
    navigate(ROUTES.DRIVER_SCHEDULE);
  };

  return (
    <Box px={4} mt={12}>
      <Text textAlign="center" fontWeight="semibold" fontSize="18px">
        Continue as:
      </Text>

      <HStack w="fit-content" mx="auto" mt={2}>
        <Button colorScheme="green" onClick={continueAsFarmer}>
          Farmer
        </Button>
        <Button colorScheme="green" onClick={continueAsDriver}>
          Driver
        </Button>
      </HStack>
    </Box>
  );
};

export default UserTypeSelect;
