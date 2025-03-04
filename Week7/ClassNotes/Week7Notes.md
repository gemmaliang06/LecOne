March 4 Notes

# DIV

### HTML Div Element

The ```<div>``` element is used as a container for other HTML elements.

The ```<div>``` element is by default a block element, meaning that it takes all available width, and comes with line breaks before and after.

A ```<div>``` element takes up all available width:
```
<p>Lorem Ipsum <div>I am a div</div> dolor sit amet.</p>
```
The ```<div>``` element has no required attributes, but style, class and id are common.

### Float
Example:
```
.mycontainer {
  width: 100%;
  overflow: auto;
}
.mycontainer div {
  width: 33%;
  float: left;
}
```

### Inline-block
Example:
```
div {
  width: 30%;
  display: inline-block;
}
```
### Flex
Example:
```
.mycontainer {
  display: flex;
}
.mycontainer > div {
  width: 33%;
}
```
### Grid
Example:
```
.grid-container {
  display: grid;
  grid-template-columns: 33% 33% 33%;
}
```
---

# Classes
Classes allow you to communicate with a class name within a style sheet

In the following example we have three ```<div>``` elements with a class attribute with the value of "city". All of the three ```<div>``` elements will be styled equally according to the .city style definition in the head section:
[Example](http://127.0.0.1:3002/Week7/ClassNotes/Classes.html)




