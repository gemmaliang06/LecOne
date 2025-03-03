Feb 25th Notes

---
# CSS Stylizing
---
```<style>
    h1 {color: pink; margin-left: 40px; text-align:center;}
</style>
```
---
Feb 27th Notes
----
## Horizontal Navigation Bar:

### Inline List Items
```li {
  display: inline;
}
```
### Floating List Items:
```li {
  float: left;
}

a {
  display: block;
  padding: 8px;
  background-color: #dddddd;
}
```
## CSS Box Model
- Content box 
- Padding box
- Border box
- Margin box

![alt text](https://camo.githubusercontent.com/d03a536d636130fdfeb9774a1ee1f841bffa04b6ac189f4fc5a31e5f6cd93104/68747470733a2f2f646576656c6f7065722e6d6f7a696c6c612e6f72672f656e2d55532f646f63732f4c6561726e5f7765625f646576656c6f706d656e742f436f72652f5374796c696e675f6261736963732f426f785f6d6f64656c2f626f782d6d6f64656c2e706e67)

### Box Model Properties (and examples)
```
box-sizing: content-box
display: block
float: none
line-height: 20px
position: static
z-index: auto
```
### Using display: inline-block
- ```display: inline-block``` is a special value of ```display```, which provides a middle ground between ```inline``` and ```block```
- An element with ```display: inline-block``` does a subset of the block things we already know about:

  - The ```width``` and ```height``` properties are respected.
  - ```padding```, ```margin```, and ```border``` will cause other elements to be pushed away from the box.