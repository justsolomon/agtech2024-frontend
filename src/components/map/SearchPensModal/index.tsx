import {
  Box,
  Divider,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Text,
  VStack,
} from '@chakra-ui/react';
import { ArrowBendDownLeft, MagnifyingGlass } from '@phosphor-icons/react';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { toggleActionModalOpen } from 'redux/slices';
import { PenMarkerInfo } from 'types';

interface SearchPensModalProps {
  penMarkers: PenMarkerInfo[];
  goToPen: (pen: PenMarkerInfo) => void;
}

const SearchPensModal = ({ penMarkers, goToPen }: SearchPensModalProps) => {
  const [query, setQuery] = useState('');
  const { isSearchPensModalOpen } = useAppSelector((state) => state.driver);
  const dispatch = useAppDispatch();

  const searchResults = penMarkers.filter(
    (pen) =>
      pen.number.toString().includes(query) ||
      pen.animalType.toLowerCase().includes(query.toLowerCase()),
  );

  const closeModal = () => {
    dispatch(toggleActionModalOpen('search'));
  };

  return (
    <Modal size="sm" isOpen={isSearchPensModalOpen} onClose={closeModal}>
      <ModalOverlay />
      <ModalContent>
        <ModalBody as={VStack} px={1}>
          <InputGroup size="lg">
            <InputLeftElement pointerEvents="none">
              <MagnifyingGlass color="green" weight="bold" size="22px" />
            </InputLeftElement>
            <Input
              placeholder="Search pens"
              border="none"
              boxShadow="none"
              fontSize="16px"
              _focusVisible={{ boxShadow: 'none' }}
              onChange={(e) => {
                setQuery(e.target.value);
              }}
            />
          </InputGroup>

          {query.length > 0 && searchResults.length > 0 && (
            <VStack w="100%" px={4} pb={3}>
              <Box w="100%" mb={2}>
                <Divider />
              </Box>

              {searchResults.map((pen) => (
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
                  onClick={() => {
                    goToPen(pen);
                    closeModal();
                  }}
                >
                  <VStack align="flex-start" spacing={0} fontWeight="600">
                    <Text>{`Pen ${pen.number}`}</Text>
                    <Text fontSize="14px">{`Animal type: ${pen.animalType}`}</Text>
                  </VStack>

                  <ArrowBendDownLeft />
                </HStack>
              ))}
            </VStack>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default SearchPensModal;
