import {ConfigurePane} from '../components/panes/configure';
import {Debug} from '../components/panes/debug';
import {DesignTab} from '../components/panes/design';
import {Settings} from '../components/panes/settings';
import {Test} from '../components/panes/test';

export default [
  {
    key: 'default',
    component: ConfigurePane,
    title: 'Thiết lập',
    path: '/',
  },
  {
    key: 'test',
    component: Test,
    path: '/test',
    title: 'Thử phím',
  },
  {
    key: 'design',
    component: DesignTab,
    path: '/design',
    title: 'Thiết kế',
  },
  {
    key: 'settings',
    component: Settings,
    path: '/settings',
    title: 'Cài đặt',
  },
  {
    key: 'debug',
    component: Debug,
    path: '/debug',
    title: 'Debug',
  },
];
