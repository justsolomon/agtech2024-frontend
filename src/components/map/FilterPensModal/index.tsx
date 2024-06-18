import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import { FormElement } from 'components/global';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { toggleActionModalOpen } from 'redux/slices';
import { PenMarkerInfo } from 'types';

interface FilterPensModalProps {
  applyFilters: (filters: Partial<PenMarkerInfo>) => void;
}

const FilterPensModal = ({ applyFilters }: FilterPensModalProps) => {
  const [animalType, setAnimalType] = useState('Cattle');
  const { isFilterPensModalOpen } = useAppSelector((state) => state.driver);
  const dispatch = useAppDispatch();

  const closeModal = () => {
    dispatch(toggleActionModalOpen('filter'));
  };

  return (
    <Modal size="sm" isOpen={isFilterPensModalOpen} onClose={closeModal}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Filter pens</ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <FormElement
            element="select"
            label="Animal"
            value={animalType}
            setValue={setAnimalType}
            options={['Cattle', 'Sheep', 'Pig', 'Chicken']}
          />
        </ModalBody>

        <ModalFooter>
          <Button
            colorScheme="green"
            mr={3}
            onClick={() => {
              applyFilters({ animalType });
              closeModal();
            }}
          >
            Apply
          </Button>
          <Button
            variant="ghost"
            onClick={() => {
              applyFilters({});
              closeModal();
            }}
          >
            Clear
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default FilterPensModal;
