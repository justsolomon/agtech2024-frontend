import { HStack, Text, VStack } from '@chakra-ui/react';
import { Clock, DotsThreeOutline, User } from '@phosphor-icons/react';
import { Link } from 'react-router-dom';

const BottomMenuBar = () => {
  const items = [
    { title: 'Schedule', path: '', icon: Clock },
    { title: 'My Stats', path: '', icon: User },
    { title: 'More', path: '', icon: DotsThreeOutline },
  ];

  return (
    <HStack
      w="100%"
      bg="white"
      justify="space-around"
      position="absolute"
      zIndex={1000}
      bottom={0}
      spacing={0}
    >
      {items.map(({ title, path, icon }) => {
        const Icon = icon;

        return (
          <VStack
            as={Link}
            key={title}
            spacing={0.5}
            py={2}
            color="green"
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
