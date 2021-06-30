# RdsBreadcrumb

A Vue implementation of a Carbon Components breadcrumb

http://www.carbondesignsystem.com/components/breadcrumb/code

## Usage

```html
<rds-breadcrumb no-trailing-slash>
  <rds-breadcrumb-item>Abc</rds-breadcrumb-item>
  <rds-breadcrumb-item>Def</rds-breadcrumb-item>
  <rds-breadcrumb-item>ghi</rds-breadcrumb-item>
</rds-breadcrumb>
```

Often used with breadcrumbs or other controls

```html
<rds-breadcrumb no-trailing-slash>
  <rds-breadcrumb-item>
    <rds-breadcrumb href="#outer">outer-breadcrumb</rds-breadcrumb>
  </rds-breadcrumb-item>
  <rds-breadcrumb-item>
    <rds-breadcrumb href="#outer">parent-breadcrumb</rds-breadcrumb>
  </rds-breadcrumb-item>
  <rds-breadcrumb-item>
    <rds-text value="name of thing"></rds-text>
  </rds-breadcrumb-item>
</rds-breadcrumb>
```

## Attributes

aria-label: changes the breadcrumb aria label
no-trailing-slash: if true no trailing slash follows the last breadcrumb item

## Item attributes

active: is the active or current location
