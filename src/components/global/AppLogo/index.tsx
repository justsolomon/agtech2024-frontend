import { Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { ROUTES } from 'types';

const AppLogo = () => {
  return (
    <Text
      as={Link}
      to={ROUTES.HOME}
      fontWeight="bold"
      color="green"
      fontSize="24px"
    >
      FeedFlow
    </Text>
  );
};

export default AppLogo;
