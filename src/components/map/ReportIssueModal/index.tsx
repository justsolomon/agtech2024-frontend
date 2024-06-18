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
import { FarmIssue, ModalProps } from 'types';

interface ReportIssueModalProps extends ModalProps {
  addIssue: (issue: FarmIssue) => void;
}

const ReportIssueModal = ({
  addIssue,
  ...restProps
}: ReportIssueModalProps) => {
  const [type, setType] = useState('Issue');
  const [description, setDescription] = useState('');

  const clearForm = () => {
    setType('Issue');
    setDescription('Description');
  };

  return (
    <Modal size="sm" {...restProps}>
      <ModalOverlay />
      <ModalContent
        as="form"
        onSubmit={(e) => {
          e.preventDefault();
          addIssue({
            type,
            description,
          } as FarmIssue);

          restProps.onClose();
          clearForm();
        }}
      >
        <ModalHeader>Report issue</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={4}>
            <FormElement
              element="select"
              label="Type"
              value={type}
              setValue={setType}
              options={['Issue', 'Observation']}
              isRequired
            />
            <FormElement
              element="textarea"
              label="Description"
              value={description}
              setValue={setDescription}
              isRequired
            />
          </VStack>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="green" mr={3} type="submit">
            Submit
          </Button>
          <Button variant="ghost" onClick={restProps.onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ReportIssueModal;
