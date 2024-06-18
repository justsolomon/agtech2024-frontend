import { DriverMap } from 'components/driver';
import { ActionsMenuBar, DriverLayout } from 'components/global';

const DriverMapContainer = () => {
  return (
    <DriverLayout>
      <ActionsMenuBar />
      <DriverMap />
    </DriverLayout>
  );
};

export default DriverMapContainer;
