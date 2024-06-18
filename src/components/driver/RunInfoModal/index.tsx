import {
  HStack,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  VStack,
} from '@chakra-ui/react';
import { ActiveRun, ModalProps } from 'types';

interface RunInfoModalProps extends ModalProps {
  run: ActiveRun;
  id: string;
}

const RunInfoModal = ({ id, run, ...restProps }: RunInfoModalProps) => {
  return (
    <Modal {...restProps}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Run Info</ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <VStack w="100%" spacing={3}>
            <HStack w="100%" justify="space-between">
              <Text fontWeight="bold">Run ID</Text>
              <Text color="gray.600">{id}</Text>
            </HStack>
            <HStack w="100%" justify="space-between">
              <Text fontWeight="bold">Feed Type</Text>
              <Text color="gray.600">{run.data.feedType}</Text>
            </HStack>
            <HStack w="100%" justify="space-between">
              <Text fontWeight="bold">Total Feed Weight Dispensed</Text>
              <Text color="gray.600">{`${run.data.weightUsed}kg`}</Text>
            </HStack>

            <VStack w="100%" align="flex-start" mt={6} spacing={8}>
              <Heading as="h2" fontSize="24px">
                Pen Dumps
              </Heading>
              {run.penDumps.map(
                (
                  {
                    number,
                    feedTonnage,
                    feedTonnageDispensed,
                    startTime,
                    endTime,
                  },
                  index,
                ) => (
                  <VStack w="100%" key={index} spacing={3}>
                    <HStack w="100%" justify="space-between">
                      <Text fontWeight="bold">Pen Number</Text>
                      <Text color="gray.600">{number}</Text>
                    </HStack>
                    <HStack w="100%" justify="space-between">
                      <Text fontWeight="bold">Feed Weight Required</Text>
                      <Text color="gray.600">{`${feedTonnage}kg`}</Text>
                    </HStack>
                    <HStack w="100%" justify="space-between">
                      <Text fontWeight="bold">Feed Weight Dispensed</Text>
                      <Text color="gray.600">{`${feedTonnageDispensed}kg`}</Text>
                    </HStack>
                    <HStack w="100%" justify="space-between">
                      <Text fontWeight="bold">Dump Start Time</Text>
                      <Text color="gray.600">
                        {new Date(startTime).toLocaleString('en-CA')}
                      </Text>
                    </HStack>
                    <HStack w="100%" justify="space-between">
                      <Text fontWeight="bold">Dump End Time</Text>
                      <Text color="gray.600">
                        {new Date(endTime).toLocaleString('en-CA')}
                      </Text>
                    </HStack>
                  </VStack>
                ),
              )}
            </VStack>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default RunInfoModal;
