import { SEO } from 'components/global';
import { DriverScheduleContainer } from 'containers';

const DriverSchedulePage = () => {
  return (
    <>
      <SEO prefix="Schedule" />
      <DriverScheduleContainer />
    </>
  );
};

export default DriverSchedulePage;
