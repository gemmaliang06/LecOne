March 11 Notes

# Media Queries
- The ```@media``` rule makes it possible to define different style rules for different media types
- Media queries in CSS3 extended the CSS2 ```@media``` types idea: Instead of looking for a type of device, they look at the capability of the device.
- Media queries can be used to check many things, such as:
    - width and height of the viewport
    - orientation of the viewport (landscape or portrait)
    - resolution

# Flex Box
- always consists of:
    - a Flex container: the parent (container) ```<div>``` element
    - Flex items: he items inside the container ```<div>```

### A Flex Container with 3 Flex Items:
```
<div class="flex-container">
  <div>1</div>
  <div>2</div>
  <div>3</div>
</div>
```
```
.flex-container {
  display: flex;
}
```
## The CSS Flex Container
The CSS properties we use for the flex container are:

- flex-direction
- flex-wrap
- flex-flow
- justify-content
- align-items
- align-content

# The CSS flex-wrap Property

The ```flex-wrap``` property specifies whether the flex items should wrap or not, if there is not enough room for them on one flex line.

The ```flex-wrap``` property can have one of the following values:

- ```nowrap```
- ```wrap```
- ```wrap-reverse```

#### Example:
```
.flex-container {
  display: flex;
  flex-wrap: nowrap;
}
```
# The CSS flex-flow property
The ```flex-flow``` property is a shorthand property for setting both the ```flex-direction``` and ```flex-wrap``` properties.

#### Example:
```
.flex-container {
  display: flex;
  flex-flow: row wrap;
}
```

# The CSS justify-content property
The ```justify-content``` property is used to align the flex items when they do not use all available space on the main-axis (horizontally).

The ```justify-content``` property can have one of the following values:
- ```center```
- ```flex-start```
- ```flex-end```
- ```space-around```
- ```space-between```
- ```space-evenly```

# The CSS align-items Property
The ```align-items``` property is used to align the flex items when they do not use all available space on the cross-axis (vertically).

The ```align-items``` property can have one of the following values:

- ```center```: value positions the flex items in the middle of the container
- ```flex-start```: value positions the flex items at the top of the container.
- ```flex-end```: value positions the flex items at the bottom of the container.
- ```stretch```: stretches items to fill the container
- ```baseline```: value positions the flex items at the baseline of the container
- ```normal```

#### Example:
```
.flex-container {
  display: flex;
  height: 200px;
  align-items: center;
}
```
# The CSS align-content Property
The ```align-content``` property is used to align the flex lines.

The ```align-content``` property is similar to align-items, but instead of aligning flex items, it aligns the flex lines.

The ```align-content``` property can have one of the following values:

- ```center```: he flex lines are packed toward the center of the container
- ```stretch``` : the flex lines stretch to take up the remaining space of the container (this is default)
- ```flex-start``` : the flex lines are packed toward the start of the container
- ```flex-end``` : the flex lines are packed toward the end of the container
- ```space-around``` : the space between the flex lines are equal, but the space before the first item and after the last item is set to half of the space between the flex lines
- ```space-between``` : the space between the flex lines are equal, but the first item is flush with the start edge of the container, and the last item is flush with the end edge of the container
- ```space-evenly```  : the flex lines are evenly distributed in the flex container, with equal space on top, bottom and between

#### Example:
```
.flex-container {
  display: flex;
  height: 600px;
  flex-wrap: wrap;
  align-content: center;
}
```
# CSS Responsive Flexbox

You know now we can use media queries to create different layouts for different screen sizes and devices.

For example, if you want to create a two-column layout for most screen sizes, and a one-column layout for small screen sizes (such as phones and tablets), you can change the `flex-direction` from `row` to `column` at a specific breakpoint

```css
.flex-container {
  display: flex;
  flex-direction: row;
}

/* Responsive layout - makes a one column layout instead of a two-column layout */
@media (max-width: 800px) {
  .flex-container {
    flex-direction: column;
  }
}
```
