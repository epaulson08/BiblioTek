# Notes on implementation
## Customized palettes feature
I used Sass to create palettes as maps of semantic descriptions and color selections, e.g. 

```scss
$palette-A-colors: (
  "primary": #4cc0cd,
  "primary-dark": #359ca7,
  "secondary": #287286,
  "secondary-dark": #1e5868,
  "warning": #c19a6b,
  "warning-dark": #a7855c,
  "danger": #b24251,
  "danger-dark": #8f3642
);
```
Then, I was able to iterate through a map of palettes:

```scss
$palettes: (
  "A": $palette-A-colors,
  "B": $palette-B-colors,
  "C": $palette-C-colors,
  "D": $palette-D-colors,
  "Y": $palette-Y-colors,
  "Z": $palette-Z-colors,
);
```

```scss
@each $key, $palette in $palettes {
  .navbar-palette-#{$key} {

    background-color: map-get($palette, "secondary");
  }

  .sidebar-palette-#{$key} {
    background-color: map-get($palette, "warning");
  }

// ...
```

In the Angular templates, I used the `[ngClass]` directive to dynamically bind the palette keys, e.g.:
```html
<div [ngClass]="'sidebar-palette' + this.chosenPalette">
```

Based on the `chosenPalette` variable I created in the component, Angular evaluates this expression to 
```html
<div class="sidebar-palette-A">
```
