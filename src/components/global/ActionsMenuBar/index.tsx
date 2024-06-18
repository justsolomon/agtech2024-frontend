import { IconButton, VStack } from '@chakra-ui/react';
import {
  //   Path,
  //   HandTap,
  Funnel,
  MagnifyingGlass,
  MapPinSimple,
} from '@phosphor-icons/react';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { toggleActionModalOpen, toggleIssuePinMode } from 'redux/slices';

const ActionsMenuBar = () => {
  const { inIssuePinMode, isFilterActive } = useAppSelector(
    (state) => state.driver,
  );
  const dispatch = useAppDispatch();

  const openSearchModal = () => {
    dispatch(toggleActionModalOpen('search'));
  };

  const openFilterModal = () => {
    dispatch(toggleActionModalOpen('filter'));
  };

  //   const planRoute = () => {};
  //   const selectPens = () => {};

  const pin = () => {
    dispatch(toggleIssuePinMode());
  };

  const actions = [
    {
      title: 'Search specific pens',
      icon: MagnifyingGlass,
      onClick: openSearchModal,
    },
    // { title: 'Plan a route', icon: Path, onClick: planRoute },
    // { title: 'Select multiple pens', icon: HandTap, onClick: selectPens },
    { title: 'Filter', icon: Funnel, onClick: openFilterModal },
    { title: 'Pin', icon: MapPinSimple, onClick: pin },
  ];

  return (
    <VStack position="absolute" zIndex={1000} top={24} left={3}>
      {actions.map(({ title, icon, onClick }) => {
        const Icon = icon;
        const isActive =
          (title === 'Pin' && inIssuePinMode) ||
          (title === 'Filter' && isFilterActive);

        return (
          <IconButton
            aria-label={title}
            icon={<Icon weight="bold" size="16px" />}
            onClick={onClick}
            bg={isActive ? 'green' : 'white'}
            color={isActive ? 'white' : 'green'}
            size="sm"
            _hover={{
              bg: isActive ? 'green' : 'white',
              color: isActive ? 'white' : 'green',
            }}
          />
        );
      })}
    </VStack>
  );
};

export default ActionsMenuBar;
