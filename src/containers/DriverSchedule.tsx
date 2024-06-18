import ScheduleTabs from 'components/driver/ScheduleTabs';
import { AppHeader, DriverLayout } from 'components/global';

const DriverScheduleContainer = () => {
  return (
    <DriverLayout>
      <AppHeader />
      <ScheduleTabs />
    </DriverLayout>
  );
};

export default DriverScheduleContainer;
