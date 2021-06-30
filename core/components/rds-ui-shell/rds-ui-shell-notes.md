# RdsHeader

A Vue implementation of a Carbon Components Header

- https://www.carbondesignsystem.com/components/UI-shell-header/usage
- https://www.carbondesignsystem.com/components/UI-shell-left-panel/usage
- https://www.carbondesignsystem.com/components/UI-shell-right-panel/usage

## Usage

### Header

Header bar only

```HTML
<rds-header aria-label="Carbon header">
  <!-- slotted content goes here -->
</rds-header>
```

### Application name and skip to content

For slotting into rds-header.

```HTML
  <!-- optional skipt to content -->
  <rds-skip-to-content href="#main-content">
    Skip to content
  </rds-skip-to-content>

  <!-- optional -->
  <rds-header-name href="javascript:void(0)" prefix="IBM">
    &nbsp;[Platform]
  </rds-header-name>
```

Both rds-header-name and rds-skip-to-content can be used with either 'href' or 'to' attributes. The latter as per the rds-link component produces a router-link instead of an anchor tag.

### Header Nav

For slotting into rds-header.

```HTML
  <rds-header-nav aria-label="Carbon nav">
    <!-- active for current or active location -->
    <rds-header-menu-item href="javascript:void(0)" active>
      Link 1
    </rds-header-menu-item>
    <rds-header-menu-item href="javascript:void(0)">
      Link 2
    </rds-header-menu-item>
    <rds-header-menu-item href="javascript:void(0)">
      Link 3
    </rds-header-menu-item>
    <rds-header-menu aria-label="Link 4">
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
  </rds-header-nav>
```

Links behave as per rds-link (expect 'href' or 'to' attributes).

NOTE: Header nav links should be shown at the top of the side nav before other content. This is NOT done automatically.

### Global Actions and Right Panels

For slotting into rds-header.

```HTML
  <!-- Global actions displayed on the right of the header -->
  <template slot="header-global">
    <rds-header-global-action
      aria-label="Notifications"
      aria-controls="notifications-panel"
      @click="actionNotifications" >
      <Notification20 />
    </rds-header-global-action>
    <rds-header-global-action aria-label="User avatar" @click="actionUserAvatar" aria-controls="user panel">
      <UserAvatar20 />
    </rds-header-global-action>
    <rds-header-global-action
      aria-label="App switcher"
      aria-controls="switcher-panel"
      @click="actionAppSwitcher">
      <AppSwitcher20 />
    </rds-header-global-action>
  </template>

  <!-- The right panels are placed in the 'right-panels' slot -->
  <template slot="right-panels">

    <!-- The 'id' of hte panel is used to  link the 'aria-controls' of the global action -->
    <!-- You DO NOT need to wire this up yourself -->
    <rds-header-panel  id="notifications-panel">
      An empty panel
    </rds-header-panel>

    <rds-header-panel  id="user-panel">
      An empty panel
    </rds-header-panel>

    <rds-header-panel id="switcher-panel">
    <!-- A switcher panel typically contains links. Use rds-switcher, rds-switcher-item and rds-switcher-item-link to add these -->
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
    </rds-header-panel>
  </template>
```

Panels and global actions are automatically wired up via the rds-header component.

NOTE: Right panels need to be added into the 'right-panels' slot.
NOTE: Links behave as per rds-link (expect 'href' or 'to' attributes).

### Side Nav (left)

Can be added either into the headers 'left-panels' slot or stand alone.

```HTML
  <!-- Optional - use when side-nav is expected to expand/hide.
  Wired up via id and aria-controls -->
  <rds-header-menu-button aria-label="Header menu" aria-controls="side-nav" />

  <template slot="left-panels">
    <!-- Can be used with or without a header, has hover expand abiliity without -->
    <rds-side-nav id="side-nav">

      <rds-header-side-nav-items v-if="header_nav_contents">
        <!-- Duplicate header nav contents in rds-header-side-nav-items -->
        <!-- otherwise omit -->
      </rds-header-side-nav-items>

      <!-- Use rds-side-nav-items to create a child menu -->
      <rds-side-nav-items>
        <rds-side-nav-menu title="L1 menu">
          <!-- icons can be used with the side nav -->
          <template slot="nav-icon"><Fade16 /></template>
          <rds-side-nav-menu-item href="javascript:void(0)" active>
            L2 menu item
          </rds-side-nav-menu-item>
          <rds-side-nav-divider />
          <rds-side-nav-menu-item href="javascript:void(0)">
            L2 menu item
          </rds-side-nav-menu-item>
          <rds-side-nav-menu-item href="javascript:void(0)">
            L2 menu item
          </rds-side-nav-menu-item>
        </rds-side-nav-menu>
        <rds-side-nav-divider />
        <rds-side-nav-menu title="L1 menu" expanded>
          <template slot="nav-icon"><Fade16 /></template>
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
          <template slot="nav-icon"><Fade16 /></template>
          L1 link
        </rds-side-nav-link>
        <rds-side-nav-link href="javascript:void(0)">
          <template slot="nav-icon"><Fade16 /></template>
          L1 link
        </rds-side-nav-link>
      </rds-side-nav-items>
    </rds-side-nav>
  </template>
```

### options

- RdsSideNav can be passed the boolean attribute 'rail' this switches the side nav into rail form.
- RdsHeaderSideNavItems can be passed the boolean attribute 'divider' which will add a dividing
- rds-side-nav-menu can be passed the boolean attribute 'expanded' that sets the expanded state of the menu
