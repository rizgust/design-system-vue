# RdsAccordion

A Vue implementation of a Carbon Components accordion.

http://www.carbondesignsystem.com/components/accordion/code

## Usage

RdsAccordion is used in conjunction with slotted RdsAccordionItem components.

```html
<rds-accordion>
  <rds-accordion-item>
    <template slot="title">Section 1 title </template>
    <template slot="content">
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
        consequat.
      </p>
    </template>
  </rds-accordion-item>
  <rds-accordion-item>
    <template slot="title">Section 2 title</template>
    <template slot="content">
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
        consequat.
      </p>
    </template>
  </rds-accordion-item>
  <rds-accordion-item>
    <template slot="title">Section 3 title</template>
    <template slot="content">
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
        consequat.
      </p>
    </template>
  </rds-accordion-item>
  <rds-accordion-item>
    <template slot="title">Section 4 title</template>
    <template slot="content">
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
        consequat.
      </p>
    </template>
  </rds-accordion-item>
</rds-accordion>
```

## Events

RdsAccordion

- change: when an accordion item opens or closes

## Attributes

RdsAccordion
align: Accordion heading alignment (start, end)
size: default, 'sm' or 'xl'

RdsAccordionItem
disabled: accordion item disabled
open: accordion item is open

### Additional

N/A
