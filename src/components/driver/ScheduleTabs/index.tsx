import {
  Button,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useDisclosure,
} from '@chakra-ui/react';
import { Play } from '@phosphor-icons/react';
import RunList from '../RunList';
import StartRunModal from '../StartRunModal';
import { useAppDispatch } from 'redux/hooks';
import { setActiveRun } from 'redux/slices';
import { LocalFarmRun, ROUTES } from 'types';
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from 'react-use';

const ScheduleTabs = () => {
  const dispatch = useAppDispatch();
  const disclosure = useDisclosure();
  const navigate = useNavigate();
  const [runs] = useLocalStorage('runs', []);

  const startRun = (run: LocalFarmRun) => {
    dispatch(setActiveRun(run));
    navigate(ROUTES.DRIVER_MAP);
  };

  return (
    <>
      <Tabs variant="soft-rounded" colorScheme="green" px={4} defaultIndex={1}>
        <TabList>
          <Tab>Prev</Tab>
          <Tab>Today</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <RunList runs={[]} isLoading={false} />
          </TabPanel>
          <TabPanel>
            <RunList runs={runs || []} isLoading={false} />
          </TabPanel>
        </TabPanels>
      </Tabs>

      <Button
        leftIcon={<Play />}
        colorScheme="green"
        onClick={disclosure.onOpen}
        position="absolute"
        bottom={24}
        right={6}
        borderRadius="full"
      >
        New run
      </Button>

      <StartRunModal {...disclosure} startRun={startRun} />
    </>
  );
};

export default ScheduleTabs;
