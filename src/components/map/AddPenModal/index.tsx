import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  VStack,
} from '@chakra-ui/react';
import { FormElement } from 'components/global';
import { useState } from 'react';
import { ModalProps, PenMarkerInfo } from 'types';

interface AddPenModalProps extends ModalProps {
  addPen: (markerInfo: PenMarkerInfo) => void;
}

const AddPenModal = ({ addPen, ...restProps }: AddPenModalProps) => {
  const [number, setNumber] = useState('');
  const [animalType, setAnimalType] = useState('Cattle');
  const [animalCount, setAnimalCount] = useState('');
  const [feedType, setFeedType] = useState('');
  const [feedTonnage, setFeedTonnage] = useState('');

  const clearForm = () => {
    setNumber('');
    setAnimalType('');
    setAnimalCount('');
    setFeedType('');
    setFeedTonnage('');
  };

  return (
    <Modal size="sm" {...restProps}>
      <ModalOverlay />
      <ModalContent
        as="form"
        onSubmit={(e) => {
          e.preventDefault();
          addPen({
            number: parseInt(number),
            animalType,
            animalCount: parseInt(animalCount),
            feedType,
            feedTonnage: parseInt(feedTonnage),
          } as PenMarkerInfo);

          restProps.onClose();
          clearForm();
        }}
      >
        <ModalHeader>Add pen</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={4}>
            <FormElement
              label="Pen number"
              type="number"
              value={number}
              setValue={setNumber}
              isRequired
            />
            <FormElement
              element="select"
              label="Animal"
              value={animalType}
              setValue={setAnimalType}
              options={['Cattle', 'Sheep', 'Pig', 'Chicken']}
              isRequired
            />
            <FormElement
              label="Animal count"
              value={animalCount}
              setValue={setAnimalCount}
              isRequired
            />
            <FormElement
              element="select"
              label="Feed type"
              value={feedType}
              setValue={setFeedType}
              options={['Grass', 'Hay', 'Silage', 'Grain', 'Corn']}
              isRequired
            />
            <FormElement
              type="number"
              label="Feed tonnage"
              value={feedTonnage}
              setValue={setFeedTonnage}
              isRequired
            />
          </VStack>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="green" mr={3} type="submit">
            Add
          </Button>
          <Button variant="ghost" onClick={restProps.onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddPenModal;
