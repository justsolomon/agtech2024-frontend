import { IconButton, Tooltip, VStack } from '@chakra-ui/react';
import {
  Funnel,
  HandTap,
  MagnifyingGlass,
  MapPinSimple,
  Path,
} from '@phosphor-icons/react';
import { useAppDispatch } from 'redux/hooks';
import { toggleActionModalOpen } from 'redux/slices';

const ActionsMenuBar = () => {
  const dispatch = useAppDispatch();

  const openSearchModal = () => {
    dispatch(toggleActionModalOpen('search'));
  };

  const openFilterModal = () => {
    dispatch(toggleActionModalOpen('filter'));
  };

  const planRoute = () => {};

  const selectPens = () => {};

  const pin = () => {};

  const actions = [
    {
      title: 'Search specific pens',
      icon: MagnifyingGlass,
      onClick: openSearchModal,
    },
    { title: 'Plan a route', icon: Path, onClick: planRoute },
    { title: 'Select multiple pens', icon: HandTap, onClick: selectPens },
    { title: 'Filter', icon: Funnel, onClick: openFilterModal },
    { title: 'Pin', icon: MapPinSimple, onClick: pin },
  ];

  return (
    <VStack position="absolute" zIndex={1000} top={24} left={3}>
      {actions.map(({ title, icon, onClick }) => {
        const Icon = icon;

        return (
          <Tooltip label={title} key={title} hasArrow placement="top">
            <IconButton
              aria-label={title}
              icon={<Icon weight="bold" size="16px" color="green" />}
              onClick={onClick}
              bg="white"
              size="sm"
              _hover={{ bg: 'white' }}
            />
          </Tooltip>
        );
      })}
    </VStack>
  );
};

export default ActionsMenuBar;
