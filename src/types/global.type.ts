export enum ROUTES {
  HOME = '/',
  DRIVER_SCHEDULE = '/driver/schedule',
  FARMER_MAP = '/farmer/map',
  DRIVER_MAP = '/driver/map',
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}
