# RdsForm

These components are purely wrapper elements for use in creating forms.

## Usage RdsForm

RdsForm has no properties and a single default slot

```html
<rds-form>
  <!-- form content -->
  <button>OK</button>
</rds-form>
```

## Usage RdsFormGroup

Used inside a form to group components such as checkboxes and radio buttons.

```html
<rds-form-group noMargin invalid message="Optional text message">
  <template slot="label">Form group legend</template>
  <template slot="content">
    <label> Small <input type="radio" name="size" id="size_1" value="small" /> </label>
    <label> Large <input type="radio" name="size" id="size_2" value="large" /> </label>
  </template>
</rds-form-group>
```

## Usage RdsFormItem

Used inside a form to provide positional styling.

```html
<rds-form-item>
  <label for="text-input-3" :class="`bx--label`">Text Input label</label>
  <input id="text-input-3" type="text" :class="`bx--text-input`" placeholder="Optional placeholder text" />
</rds-form-item>
```
