import { Icon } from '@chakra-ui/react';
import {
  MdBarChart,
  MdPerson,
  MdHome,
  MdLock,
  MdOutlineShoppingCart,
  MdNotifications,
  MdSettings,
  MdPestControlRodent
} from 'react-icons/md';

// Admin Imports
// import MainDashboard from './pages/admin/default';
// import NFTMarketplace from './pages/admin/nft-marketplace';
// import Profile from './pages/admin/profile';
// import DataTables from './pages/admin/data-tables';
// import RTL from './pages/rtl/rtl-default';

// Auth Imports
// import SignInCentered from './pages/auth/sign-in';
import { IRoute } from 'types/navigation';

const routes: IRoute[] = [
  {
    name: 'Dashboard',
    layout: '/iot',
    path: '/dashboard',
    icon: <Icon as={MdHome} width="20px" height="20px" color="inherit" />,
  },
  {
    name: 'Notifications',
    layout: '/iot',
    path: '/notifications',
    icon: (
      <Icon
        as={MdNotifications}
        width="20px"
        height="20px"
        color="inherit"
      />
    ),
    secondary: true,
  },
  {
    name: 'Devices',
    layout: '/iot',
    path: '/devices',
    icon: <Icon as={MdPestControlRodent} width="20px" height="20px" color="inherit" />,
  },
  {
    name: 'Activity',
    layout: '/iot',
    path: '/activity',
    icon: <Icon as={MdBarChart} width="20px" height="20px" color="inherit" />,
  },
  {
    name: 'Settings',
    layout: '/iot',
    icon: <Icon as={MdSettings} width="20px" height="20px" color="inherit" />,
    path: '/settings',
  },
  {
    name: 'Sign In',
    layout: '/auth',
    path: '/sign-in',
    icon: <Icon as={MdLock} width="20px" height="20px" color="inherit" />,
  },
];

export default routes;
