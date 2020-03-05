// webpack 打包工具
import Hearder from './Hearder.js'
import Connent from './Content.js'
import picture from './timg.jpeg'
import './index.css'
import _ from 'loadsh'


console.log(_.join(['a', 'b', 'c'], '***'))
var img = new Image()
img.src = picture
img.classList.add('imgClass')
var dom = document.getElementById('root')
dom.append(img)
new Hearder()
new Connent()

// code splitting  拆分代码提高代码效率

class Person {
  static info = {name: 'zs', age: 20}
}
console.log(Person.info)