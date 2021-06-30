# rds-progress

A Vue implementation of a Carbon Components Progress Indicator

http://www.carbondesignsystem.com/components/progress-indicator/code

## Carbon 10

Includes carbon 9 functionality and adds new features using slotted rds-progress-step.

### Usage

```html
<rds-progress>
  <rds-progress-step label="Step 1" complete additional-info="Optional info" />
  <rds-progress-step label="Step 2" complete />
  <rds-progress-step label="Step 3" />
  <rds-progress-step label="Step 4" invalid />
  <rds-progress-step label="Step 4" disabled />
</rds-progress>
```

NOTE: The current step is deemed to be the first incomplete step.

### Attributes - rds-progress

- initialStep: index of initial step defaults to 0
- steps: Ignored if slotted content is provided
- vertical: if true progress is displayed in a vertical orientation

### Attributes - rds-progress-step

- complete: Boolean
- invalid: Boolean
- description: of the step
- disabled: Boolean
- additional-info: optional additional info for step.
- tip-text: Hard coded tip text always displayed

## Carbon 9

### Usage

```html
<rds-progress :steps="steps" :initial-step="1"></rds-progress>
```

NOTE: steps is an array of strings declared elsewhere.

### Attributes

- steps : An array of steaps e.g. ['Step 1', 'Step 2', 'Step 3', 'Step 4']
- initial-step : index of initial step
