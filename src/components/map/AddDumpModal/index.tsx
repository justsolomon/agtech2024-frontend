import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from '@chakra-ui/react';
import { LatLngTuple } from 'leaflet';
import { useEffect, useState } from 'react';
import { ModalProps, PenDump, PenMarkerInfo } from 'types';

interface AddDumpModalProps extends ModalProps {
  pen: PenMarkerInfo;
  addDump: (dump: PenDump) => void;
}

const AddDumpModal = ({ pen, addDump, ...restProps }: AddDumpModalProps) => {
  const [startTime, setStartTime] = useState('');
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    if (startTime) {
      const interval = setInterval(() => {
        const startMs = new Date(startTime).getTime();
        const nowMs = new Date().getTime();

        setSeconds(Math.floor((nowMs - startMs) / 1000));
      }, 1000);

      return () => {
        clearInterval(interval);
      };
    }
  }, [startTime]);

  const startTimer = () => {
    const now = new Date();
    setStartTime(now.toISOString());
  };

  const endTimer = () => {
    const now = new Date();
    addDump({
      ...pen,
      startTime,
      endTime: now.toISOString(),
      lat: (pen.coord as LatLngTuple)[0],
      lng: (pen.coord as LatLngTuple)[1],
      feedTonnageDispensed: Math.floor(Math.random() * pen.feedTonnage) + 1,
    });
  };

  return (
    <Modal size="sm" {...restProps}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{`Add dump in pen ${pen.number}?`}</ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <Text>{`You are within range of pen ${pen.number}. Do you want to start recording a dump?`}</Text>
        </ModalBody>

        <ModalFooter>
          <Button
            colorScheme="green"
            mr={3}
            onClick={startTimer}
            isDisabled={Boolean(startTime)}
          >
            {startTime ? `${seconds}s` : `Record`}
          </Button>
          <Button
            variant="ghost"
            onClick={Boolean(startTime) ? endTimer : restProps.onClose}
          >
            {Boolean(startTime) ? 'End' : 'Cancel'}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddDumpModal;
