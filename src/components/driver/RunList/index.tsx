import {
  HStack,
  Spinner,
  Stack,
  Text,
  VStack,
  useDisclosure,
} from '@chakra-ui/react';
import { ActiveRun } from 'types';
import RunInfoModal from '../RunInfoModal';
import { useState } from 'react';

interface RunListProps {
  runs: ActiveRun[];
  isLoading: boolean;
}

const RunList = ({ runs, isLoading }: RunListProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const disclosure = useDisclosure();

  if (isLoading) {
    return (
      <Stack w="100%" align="center">
        <Spinner />
      </Stack>
    );
  }

  if (!runs.length && !isLoading) {
    return (
      <Stack w="100%" align="flex-start">
        <Text>No runs available</Text>
      </Stack>
    );
  }

  return (
    <>
      <VStack>
        {runs.map((run, index) => (
          <HStack
            w="100%"
            px={4}
            py={3}
            justify="space-between"
            bg="gray.100"
            borderRadius={6}
            cursor="pointer"
            _hover={{
              bg: 'green.500',
              color: 'white !important',
            }}
            transition="all 0.1s"
            key={index}
            onClick={() => {
              setActiveIndex(index);
              disclosure.onOpen();
            }}
          >
            <VStack align="flex-start" spacing={1}>
              <Text fontWeight="600" fontSize="18px">{`Run #${
                index + 1
              }`}</Text>
              <Text color="gray.700">{`Feed dispensed: ${run.data.weightUsed} kg  |  Feed type: ${run.data.feedType}`}</Text>
            </VStack>
          </HStack>
        ))}
      </VStack>

      <RunInfoModal
        run={runs[activeIndex]}
        id={`#${activeIndex + 1}`}
        {...disclosure}
      />
    </>
  );
};

export default RunList;
