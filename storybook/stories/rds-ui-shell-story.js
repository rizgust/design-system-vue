import { storiesOf } from '@storybook/vue';
import {} from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import SvTemplateView from '../views/sv-template-view/sv-template-view';
// import consts from '../utils/consts';
import knobsHelper from '../utils/knobs-helper';

import RdsHeaderNotesMD from '../../core/components/rds-ui-shell/rds-ui-shell-notes.md';

import {
  RdsHeader,
  RdsHeaderGlobalAction,
  RdsHeaderMenu,
  RdsHeaderMenuButton,
  RdsHeaderMenuItem,
  RdsHeaderName,
  RdsHeaderNav,
  RdsHeaderPanel,
  RdsSideNav,
  RdsSideNavDivider,
  RdsSideNavItems,
  RdsSideNavLink,
  RdsSideNavMenu,
  RdsSideNavMenuItem,
  RdsSkipToContent,
  RdsSwitcher,
  RdsSwitcherItem,
  RdsSwitcherItemLink,
  RdsHeaderSideNavItems,
} from '../../core/';

import Fade16 from '@carbon/icons-vue/es/fade/16';
import Notification20 from '@carbon/icons-vue/es/notification/20';
import UserAvatar20 from '@carbon/icons-vue/es/user--avatar/20';
import Login20 from '@carbon/icons-vue/es/login/20';
import AppSwitcher20 from '@carbon/icons-vue/es/app-switcher/20';

const storiesDefault = storiesOf('Components/RdsUIShell', module);
// const storiesExperimental = storiesOf('Experimental/RdsUIShell - header', module);

const preKnobs = {
  // flipMenu: {
  //   group: 'attr',
  //   type: boolean,
  //   config: ['flip menu', false], // consts.CONFIG], // fails when used with number in storybook 4.1.4
  //   prop: 'flip-menu'
  // },
  // up: {
  //   group: 'attr',
  //   type: boolean,
  //   config: ['up', false], // consts.CONFIG], // fails when used with number in storybook 4.1.4
  //   prop: 'up'
  // },
  // offset: {
  //   group: 'attr',
  //   type: object,
  //   config: ['offset example', { left: 0, top: 0 }], // consts.CONFIG], // fails when used with number in storybook 4.1.4
  //   prop: 'offset'
  // },
  headerName: {
    group: 'headerName',
    value: `<rds-skip-to-content href="#main-content">
    Skip to content
  </rds-skip-to-content>
  <rds-header-name href="javascript:void(0)" prefix="IBM">
    [Platform]
  </rds-header-name>`,
  },
  headerNav: {
    group: 'headerNav',
    value: `<rds-header-nav aria-label="Carbon nav">
  <rds-header-menu-item href="javascript:void(0)">
    Link 1
  </rds-header-menu-item>
  <rds-header-menu-item href="javascript:void(0)">
    Link 2
  </rds-header-menu-item>
  <rds-header-menu-item href="javascript:void(0)">
    Link 3
  </rds-header-menu-item>
  <rds-header-menu aria-label="Link 4" title="Link 4">
    <rds-header-menu-item href="javascript:void(0)">
      Submenu Link 1
    </rds-header-menu-item>
    <rds-header-menu-item href="javascript:void(0)">
      Submenu Link 2
    </rds-header-menu-item>
    <rds-header-menu-item href="javascript:void(0)">
      Submenu Link 3
    </rds-header-menu-item>
  </rds-header-menu>
</rds-header-nav>`,
  },
  headerActions: {
    group: 'headerActions',
    value: `<template v-slot:header-global>
    <rds-header-global-action
      aria-label="Notifications"
      aria-controls="notifications-panel"
      @click="actionNotifications"
      label="Notifications"
      tipPosition="bottom"
      tipAlignment="start"
      >
      <Notification20 />
    </rds-header-global-action>
    <rds-header-global-action
      aria-label="User avatar"
      @click="actionUserAvatar"
      aria-controls="user-panel"
      label="Log in"
      tipPosition="bottom"
      tipAlignment="center"
      >
      <UserAvatar20 v-if="loggedIn"/>
      <Login20 v-else />
    </rds-header-global-action>
    <rds-header-global-action
      aria-label="App switcher"
      aria-controls="switcher-panel"
      @click="actionAppSwitcher"
      label="App switcher"
      tipPosition="bottom"
      tipAlignment="end"
      >
      <AppSwitcher20 />
    </rds-header-global-action>
  </template>`,
  },
  userPanel: {
    group: 'rightPanels',
    value: `<rds-header-panel  id="user-panel">
      An empty user panel
    </rds-header-panel>`,
  },
  notificationsPanel: {
    group: 'rightPanels',
    value: `<rds-header-panel  id="notifications-panel">
      An empty panel
    </rds-header-panel>`,
  },
  switcherPanel: {
    group: 'rightPanels',
    value: `<rds-header-panel id="switcher-panel">
      <rds-switcher>
        <rds-switcher-item>
          <rds-switcher-item-link href="javascript:void(0)" selected>
            Selected app
          </rds-switcher-item-link>
        </rds-switcher-item>
        <rds-switcher-item>
          <rds-switcher-item-link href="javascript:void(0)">
            Other app
          </rds-switcher-item-link>
        </rds-switcher-item>
        <rds-switcher-item>
          <rds-switcher-item-link href="javascript:void(0)">
            Other app
          </rds-switcher-item-link>
        </rds-switcher-item>
        <rds-switcher-item>
          <rds-switcher-item-link href="javascript:void(0)">
            Other app
          </rds-switcher-item-link>
        </rds-switcher-item>
        <rds-switcher-item>
          <rds-switcher-item-link href="javascript:void(0)">
            Other app
          </rds-switcher-item-link>
        </rds-switcher-item>
        <rds-switcher-item>
          <rds-switcher-item-link href="javascript:void(0)">
            Other app
          </rds-switcher-item-link>
        </rds-switcher-item>
      </rds-switcher>
    </rds-header-panel>`,
  },
  headerMenuButton: {
    group: 'headerMenuButton',
    value: `<rds-header-menu-button aria-label="Header menu" aria-controls="side-nav" />`,
  },
  sideNavFixed: {
    group: 'leftPanels2',
    value: `<rds-side-nav id="side-nav" fixed expanded>
      <rds-side-nav-items>
        <rds-side-nav-menu title="L1 menu">
          <rds-side-nav-menu-item href="javascript:void(0)" active>
            L2 menu item
          </rds-side-nav-menu-item>
          <rds-side-nav-menu-item href="javascript:void(0)">
            L2 menu item
          </rds-side-nav-menu-item>
          <rds-side-nav-menu-item href="javascript:void(0)">
            L2 menu item
          </rds-side-nav-menu-item>
        </rds-side-nav-menu>
        <rds-side-nav-divider />
        <rds-side-nav-menu title="L1 menu">
          <rds-side-nav-menu-item href="javascript:void(0)">
            L2 menu item
          </rds-side-nav-menu-item>
        <rds-side-nav-divider />
          <rds-side-nav-menu-item href="javascript:void(0)" aria-current="page">
            L2 menu item
          </rds-side-nav-menu-item>
          <rds-side-nav-menu-item href="javascript:void(0)">
            L2 menu item
          </rds-side-nav-menu-item>
        </rds-side-nav-menu>
        <rds-side-nav-link href="javascript:void(0)">
          L1 link
        </rds-side-nav-link>
        <rds-side-nav-link href="javascript:void(0)">
          L1 link
        </rds-side-nav-link>
      </rds-side-nav-items>
    </rds-side-nav>`,
  },
  sideNavFixedWithIcons: {
    group: 'leftPanels2',
    value: `<rds-side-nav id="side-nav" fixed expanded>
      <rds-side-nav-items>
        <rds-side-nav-menu title="L1 menu">
          <template v-slot:nav-icon><Fade16 /></template>
          <rds-side-nav-menu-item href="javascript:void(0)" active>
            L2 menu item
          </rds-side-nav-menu-item>
          <rds-side-nav-menu-item href="javascript:void(0)">
            L2 menu item
          </rds-side-nav-menu-item>
          <rds-side-nav-menu-item href="javascript:void(0)">
            L2 menu item
          </rds-side-nav-menu-item>
        </rds-side-nav-menu>
        <rds-side-nav-menu title="L1 menu">
          <template v-slot:nav-icon><Fade16 /></template>
          <rds-side-nav-menu-item href="javascript:void(0)">
            L2 menu item
          </rds-side-nav-menu-item>
          <rds-side-nav-menu-item href="javascript:void(0)" aria-current="page">
            L2 menu item
          </rds-side-nav-menu-item>
          <rds-side-nav-menu-item href="javascript:void(0)">
            L2 menu item
          </rds-side-nav-menu-item>
        </rds-side-nav-menu>
        <rds-side-nav-link href="javascript:void(0)">
          <template v-slot:nav-icon><Fade16 /></template>
          L1 link
        </rds-side-nav-link>
        <rds-side-nav-link href="javascript:void(0)">
          <template v-slot:nav-icon><Fade16 /></template>
          L1 link
        </rds-side-nav-link>
      </rds-side-nav-items>
    </rds-side-nav>`,
  },
  sideNavHeader: {
    group: 'leftPanels',
    value: `<rds-side-nav id="side-nav" fixed>
    <rds-side-nav-items>
      <rds-header-side-nav-items>
        <rds-header-menu-item href="javascript:void(0)">
        Link 1
      </rds-header-menu-item>
      <rds-header-menu-item href="javascript:void(0)">
        Link 2
      </rds-header-menu-item>
      <rds-header-menu-item href="javascript:void(0)">
        Link 3
      </rds-header-menu-item>
      <rds-header-menu aria-label="Link 4" title="Link 4" :hover-toggle="false">
        <rds-header-menu-item href="javascript:void(0)">
          Submenu Link 1
        </rds-header-menu-item>
        <rds-header-menu-item href="javascript:void(0)">
          Submenu Link 2
        </rds-header-menu-item>
        <rds-header-menu-item href="javascript:void(0)">
          Submenu Link 3
        </rds-header-menu-item>
      </rds-header-menu>
    </rds-header-side-nav-items>
    </rds-side-nav-items>
  </rds-side-nav>`,
  },
  sideNavAndHeaderNav: {
    group: 'leftPanels',
    value: `<rds-side-nav id="side-nav" rail>
    <rds-side-nav-items>
      <rds-header-side-nav-items divider>
        <rds-header-menu-item href="javascript:void(0)">
        Link 1
      </rds-header-menu-item>
      <rds-header-menu-item href="javascript:void(0)">
        Link 2
      </rds-header-menu-item>
      <rds-header-menu-item href="javascript:void(0)">
        Link 3
      </rds-header-menu-item>
      <rds-header-menu aria-label="Link 4" title="Link 4" :hover-toggle="false">
        <rds-header-menu-item href="javascript:void(0)">
          Submenu Link 1
        </rds-header-menu-item>
        <rds-header-menu-item href="javascript:void(0)">
          Submenu Link 2
        </rds-header-menu-item>
        <rds-header-menu-item href="javascript:void(0)">
          Submenu Link 3
        </rds-header-menu-item>
      </rds-header-menu>
    </rds-header-side-nav-items>

    <rds-side-nav-menu title="L1 menu">
      <rds-side-nav-menu-item href="javascript:void(0)" active>
        L2 menu item
      </rds-side-nav-menu-item>
      <rds-side-nav-menu-item href="javascript:void(0)">
        L2 menu item
      </rds-side-nav-menu-item>
      <rds-side-nav-menu-item href="javascript:void(0)">
        L2 menu item
      </rds-side-nav-menu-item>
    </rds-side-nav-menu>
    <rds-side-nav-menu title="L1 menu">
      <rds-side-nav-menu-item href="javascript:void(0)">
        L2 menu item
      </rds-side-nav-menu-item>
      <rds-side-nav-menu-item href="javascript:void(0)" aria-current="page">
        L2 menu item
      </rds-side-nav-menu-item>
      <rds-side-nav-menu-item href="javascript:void(0)">
        L2 menu item
      </rds-side-nav-menu-item>
    </rds-side-nav-menu>
    <rds-side-nav-link href="javascript:void(0)">
      L1 link
    </rds-side-nav-link>
    <rds-side-nav-link href="javascript:void(0)">
      L1 link
    </rds-side-nav-link>

    </rds-side-nav-items>
  </rds-side-nav>`,
  },
  sideNav: {
    group: 'leftPanels',
    value: `<rds-side-nav id="side-nav">
      <rds-side-nav-items>
        <rds-side-nav-menu title="L1 menu">
          <rds-side-nav-menu-item href="javascript:void(0)" active>
            L2 menu item
          </rds-side-nav-menu-item>
          <rds-side-nav-menu-item href="javascript:void(0)">
            L2 menu item
          </rds-side-nav-menu-item>
          <rds-side-nav-menu-item href="javascript:void(0)">
            L2 menu item
          </rds-side-nav-menu-item>
        </rds-side-nav-menu>
        <rds-side-nav-menu title="L1 menu" expanded>
          <rds-side-nav-menu-item href="javascript:void(0)">
            L2 menu item
          </rds-side-nav-menu-item>
          <rds-side-nav-menu-item href="javascript:void(0)" aria-current="page">
            L2 menu item
          </rds-side-nav-menu-item>
          <rds-side-nav-menu-item href="javascript:void(0)">
            L2 menu item
          </rds-side-nav-menu-item>
        </rds-side-nav-menu>
        <rds-side-nav-link href="javascript:void(0)">
          L1 link
        </rds-side-nav-link>
        <rds-side-nav-link href="javascript:void(0)">
          L1 link
        </rds-side-nav-link>
      </rds-side-nav-items>
    </rds-side-nav>`,
  },
  sideNavWithIcons: {
    group: 'leftPanels',
    value: `<rds-side-nav id="side-nav">
      <rds-side-nav-items>
        <rds-side-nav-menu title="L1 menu">
          <template v-slot:nav-icon><Fade16 /></template>
          <rds-side-nav-menu-item href="javascript:void(0)" active>
            L2 menu item
          </rds-side-nav-menu-item>
          <rds-side-nav-menu-item href="javascript:void(0)">
            L2 menu item
          </rds-side-nav-menu-item>
          <rds-side-nav-menu-item href="javascript:void(0)">
            L2 menu item
          </rds-side-nav-menu-item>
        </rds-side-nav-menu>
        <rds-side-nav-menu title="L1 menu">
          <template v-slot:nav-icon><Fade16 /></template>
          <rds-side-nav-menu-item href="javascript:void(0)">
            L2 menu item
          </rds-side-nav-menu-item>
          <rds-side-nav-menu-item href="javascript:void(0)" aria-current="page">
            L2 menu item
          </rds-side-nav-menu-item>
          <rds-side-nav-menu-item href="javascript:void(0)">
            L2 menu item
          </rds-side-nav-menu-item>
        </rds-side-nav-menu>
        <rds-side-nav-link href="javascript:void(0)">
          <template v-slot:nav-icon><Fade16 /></template>
          L1 link
        </rds-side-nav-link>
        <rds-side-nav-link href="javascript:void(0)">
          <template v-slot:nav-icon><Fade16 /></template>
          L1 link
        </rds-side-nav-link>
      </rds-side-nav-items>
    </rds-side-nav>`,
  },
  sideNav2: {
    group: 'leftPanels2',
    value: `<rds-side-nav id="side-nav">
      <rds-side-nav-items>
        <rds-side-nav-menu title="L1 menu">
          <rds-side-nav-menu-item href="javascript:void(0)" active>
            L2 menu item
          </rds-side-nav-menu-item>
          <rds-side-nav-menu-item href="javascript:void(0)">
            L2 menu item
          </rds-side-nav-menu-item>
          <rds-side-nav-menu-item href="javascript:void(0)">
            L2 menu item
          </rds-side-nav-menu-item>
        </rds-side-nav-menu>
        <rds-side-nav-menu title="L1 menu">
          <rds-side-nav-menu-item href="javascript:void(0)">
            L2 menu item
          </rds-side-nav-menu-item>
          <rds-side-nav-menu-item href="javascript:void(0)" aria-current="page">
            L2 menu item
          </rds-side-nav-menu-item>
          <rds-side-nav-menu-item href="javascript:void(0)">
            L2 menu item
          </rds-side-nav-menu-item>
        </rds-side-nav-menu>
        <rds-side-nav-link href="javascript:void(0)">
          L1 link
        </rds-side-nav-link>
        <rds-side-nav-link href="javascript:void(0)">
          L1 link
        </rds-side-nav-link>
      </rds-side-nav-items>
    </rds-side-nav>`,
  },
  sideNavWithIcons2: {
    group: 'leftPanels2',
    value: `<rds-side-nav id="side-nav">
      <rds-side-nav-items>
        <rds-side-nav-menu title="L1 menu">
          <template v-slot:nav-icon><Fade16 /></template>
          <rds-side-nav-menu-item href="javascript:void(0)" active>
            L2 menu item
          </rds-side-nav-menu-item>
          <rds-side-nav-menu-item href="javascript:void(0)">
            L2 menu item
          </rds-side-nav-menu-item>
          <rds-side-nav-menu-item href="javascript:void(0)">
            L2 menu item
          </rds-side-nav-menu-item>
        </rds-side-nav-menu>
        <rds-side-nav-menu title="L1 menu">
          <template v-slot:nav-icon><Fade16 /></template>
          <rds-side-nav-menu-item href="javascript:void(0)">
            L2 menu item
          </rds-side-nav-menu-item>
          <rds-side-nav-menu-item href="javascript:void(0)" aria-current="page">
            L2 menu item
          </rds-side-nav-menu-item>
          <rds-side-nav-menu-item href="javascript:void(0)">
            L2 menu item
          </rds-side-nav-menu-item>
        </rds-side-nav-menu>
        <rds-side-nav-link href="javascript:void(0)">
          <template v-slot:nav-icon><Fade16 /></template>
          L1 link
        </rds-side-nav-link>
        <rds-side-nav-link href="javascript:void(0)">
          <template v-slot:nav-icon><Fade16 /></template>
          L1 link
        </rds-side-nav-link>
      </rds-side-nav-items>
    </rds-side-nav>`,
  },
  sideNavRail: {
    group: 'leftPanels',
    value: `<rds-side-nav id="side-nav" rail>
      <rds-side-nav-items>
        <rds-side-nav-menu title="L1 menu">
          <template v-slot:nav-icon><Fade16 /></template>
          <rds-side-nav-menu-item href="javascript:void(0)" active>
            L2 menu item
          </rds-side-nav-menu-item>
          <rds-side-nav-menu-item href="javascript:void(0)">
            L2 menu item
          </rds-side-nav-menu-item>
          <rds-side-nav-menu-item href="javascript:void(0)">
            L2 menu item
          </rds-side-nav-menu-item>
        </rds-side-nav-menu>
        <rds-side-nav-menu title="L1 menu">
          <template v-slot:nav-icon><Fade16 /></template>
          <rds-side-nav-menu-item href="javascript:void(0)">
            L2 menu item
          </rds-side-nav-menu-item>
          <rds-side-nav-menu-item href="javascript:void(0)" aria-current="page">
            L2 menu item
          </rds-side-nav-menu-item>
          <rds-side-nav-menu-item href="javascript:void(0)">
            L2 menu item
          </rds-side-nav-menu-item>
        </rds-side-nav-menu>
        <rds-side-nav-link href="javascript:void(0)">
          <template v-slot:nav-icon><Fade16 /></template>
          L1 link
        </rds-side-nav-link>
        <rds-side-nav-link href="javascript:void(0)">
          <template v-slot:nav-icon><Fade16 /></template>
          L1 link
        </rds-side-nav-link>
      </rds-side-nav-items>
    </rds-side-nav>`,
  },
};

const variants = [
  { name: 'Header Base', includes: ['headerName'] },
  { name: 'Header Base with Navigation', includes: ['headerMenuButton', 'headerName', 'headerNav', 'sideNavHeader'] },
  { name: 'Header Base with Actions', includes: ['headerName', 'headerActions'] },
  {
    name: 'Header Base with Navigation and Actions',
    includes: ['headerName', 'headerMenuButton', 'headerNav', 'headerActions', 'sideNavHeader'],
  },
  {
    name: 'Header Base with Actions and right panels',
    includes: ['headerName', 'headerActions', 'notificationsPanel', 'userPanel', 'switcherPanel'],
  },
  {
    name: 'Fixed Side Nav',
    includes: ['headerName', 'sideNavFixed'],
  },
  {
    name: 'Fixed Side Nav and icons',
    includes: ['headerName', 'sideNavFixedWithIcons'],
  },
  {
    name: 'Side Nav rail',
    includes: ['sideNavRail'],
  },
  {
    name: 'Side Nav rail with header',
    includes: ['headerName', 'headerMenuButton', 'sideNavRail'],
  },
  {
    name: 'Header Base with Side rail and header Nav',
    includes: ['headerName', 'headerMenuButton', 'headerNav', 'sideNavAndHeaderNav'],
  },
  {
    name: 'Header Base with Side Nav',
    includes: ['headerName', 'headerMenuButton', 'sideNav'],
  },
  {
    name: 'Header Base with Side Nav and icons',
    includes: ['headerName', 'headerMenuButton', 'sideNavWithIcons'],
  },
  {
    name: 'Header Base with seperate Side Nav',
    includes: ['headerName', 'sideNav2'],
  },
  {
    name: 'Header Base with seperate Side Nav and icons',
    includes: ['headerName', 'sideNavWithIcons2'],
  },
];

const storySet = knobsHelper.getStorySet(variants, preKnobs);

for (const story of storySet) {
  storiesDefault.add(
    story.name,
    () => {
      const settings = story.knobs();

      // ----------------------------------------------------------------
      const templateString = `<rds-header aria-label="Carbon header">${settings.group.headerMenuButton}${settings.group.headerName}${settings.group.headerNav}${settings.group.headerActions}
    <template v-slot:left-panels v-if="areLeftPanels">
      ${settings.group.leftPanels}
    </template>
    <template v-slot:right-panels v-if="areRightPanels">
    ${settings.group.rightPanels}
  </template>
</rds-header>
${settings.group.leftPanels2}
          `;

      // ----------------------------------------------------------------

      const templateViewString = `
    <sv-template-view
      sv-margin
      sv-source='${templateString.trim()}'
      sv-position="center"
      sv-padding="150px 0 50px 0"
      :sv-extra-margin="areLeftPanels ? '300px' : ''"
      >
      <template v-slot:component>${templateString}</template>
    </sv-template-view>
  `;

      return {
        components: {
          SvTemplateView,
          RdsHeader,
          RdsHeaderPanel,
          RdsHeaderName,
          RdsHeaderNav,
          RdsHeaderSideNavItems,
          RdsHeaderGlobalAction,
          RdsHeaderMenu,
          RdsHeaderMenuItem,
          RdsHeaderMenuButton,
          RdsSideNav,
          RdsSideNavDivider,
          RdsSideNavLink,
          RdsSideNavMenu,
          RdsSideNavItems,
          RdsSideNavMenuItem,
          RdsSkipToContent,
          RdsSwitcher,
          RdsSwitcherItem,
          RdsSwitcherItemLink,
          Notification20,
          UserAvatar20,
          Login20,
          AppSwitcher20,
          Fade16,
        },
        template: templateViewString,
        props: settings.props,
        mounted() {
          this.doActionNotification = () => action('Notifications - click');
          this.doActionSwitcher = () => action('Notifications - click');
          this.doActionUserAvatar = () => action('User avatar - click');
        },
        data() {
          return {
            loggedIn: false,
          };
        },
        computed: {
          areLeftPanels() {
            return settings.group.leftPanels.length > 0 || settings.group.leftPanels2.length > 0;
          },
          areRightPanels() {
            return settings.group.rightPanels.length > 0;
          },
        },
        methods: {
          actionNotifications() {
            this.doActionNotification();
          },
          actionUserAvatar() {
            this.loggedIn = !this.loggedIn;
            this.doActionUserAvatar();
          },
          actionAppSwitcher() {
            this.doActionSwitcher();
          },
        },
      };
    },
    {
      notes: { markdown: RdsHeaderNotesMD },
    }
  );
}
