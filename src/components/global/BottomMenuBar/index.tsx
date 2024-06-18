import { HStack, Text, VStack } from '@chakra-ui/react';
import { Clock, Compass, DotsThreeOutline } from '@phosphor-icons/react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-use';
import { ROUTES } from 'types';

const BottomMenuBar = () => {
  const location = useLocation();
  const items = [
    { title: 'Schedule', path: ROUTES.DRIVER_SCHEDULE, icon: Clock },
    { title: 'Map', path: ROUTES.DRIVER_MAP, icon: Compass },
    { title: 'More', path: '', icon: DotsThreeOutline },
  ];

  return (
    <HStack
      w="100%"
      bg="white"
      justify="space-around"
      position="fixed"
      zIndex={1000}
      bottom={0}
      spacing={0}
    >
      {items.map(({ title, path, icon }) => {
        const Icon = icon;
        const isActive = location.pathname === path;

        return (
          <VStack
            as={Link}
            key={title}
            spacing={0.5}
            py={2}
            color="green"
            bg={isActive ? 'gray.100' : 'transparent'}
            _hover={{ bg: 'gray.100' }}
            w={`calc(100% / ${items.length})`}
            to={path}
          >
            <Icon weight="bold" size="28px" />
            <Text fontSize="14px">{title}</Text>
          </VStack>
        );
      })}
    </HStack>
  );
};

export default BottomMenuBar;
