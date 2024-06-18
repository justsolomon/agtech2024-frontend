import { Button, HStack } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from 'react-use';
import { useAppDispatch } from 'redux/hooks';
import { setActiveRun } from 'redux/slices';
import { ActiveRun, PenDump, ROUTES } from 'types';

interface EndRunButtonProps {
  activeRun: ActiveRun;
}

const EndRunButton = ({ activeRun }: EndRunButtonProps) => {
  const [value, setValue] = useLocalStorage<ActiveRun[]>('runs', []);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const endRun = () => {
    setValue([
      ...(value || []),
      {
        ...activeRun,
        data: {
          ...activeRun.data,
          weightUsed: calcWeightUsed(activeRun.penDumps),
        },
      },
    ]);
    dispatch(setActiveRun(null));
    navigate(ROUTES.DRIVER_SCHEDULE);
  };

  const calcWeightUsed = (penDumps: PenDump[]) => {
    return penDumps.reduce((acc, penDump) => acc + penDump.feedTonnage, 0);
  };

  return (
    <HStack w="100%" justify="center">
      <Button
        w="150px"
        colorScheme="red"
        onClick={endRun}
        borderRadius="full"
        position="absolute"
        zIndex={1000}
        bottom={24}
      >
        End run
      </Button>
    </HStack>
  );
};

export default EndRunButton;
