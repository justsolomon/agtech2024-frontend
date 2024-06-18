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
import { LocalFarmRun, ModalProps } from 'types';

interface StartRunModalProps extends ModalProps {
  startRun: (markerInfo: LocalFarmRun) => void;
}

const StartRunModal = ({ startRun, ...restProps }: StartRunModalProps) => {
  const [feedType, setFeedType] = useState('Grass');
  const [feedTonnage, setFeedTonnage] = useState('');

  const clearForm = () => {
    setFeedType('Grass');
  };

  return (
    <Modal size="sm" {...restProps}>
      <ModalOverlay />
      <ModalContent
        as="form"
        onSubmit={(e) => {
          e.preventDefault();
          startRun({
            feedType,
          });

          restProps.onClose();
          clearForm();
        }}
      >
        <ModalHeader>Start run</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={4}>
            <FormElement
              element="select"
              label="Feed type"
              value={feedType}
              setValue={setFeedType}
              options={['Grass', 'Hay', 'Silage', 'Grain', 'Corn']}
              isRequired
            />
          </VStack>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="green" mr={3} type="submit">
            Start
          </Button>
          <Button variant="ghost" onClick={restProps.onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default StartRunModal;
