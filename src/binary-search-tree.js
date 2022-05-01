const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/*class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}*/

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {
  constructor() {
    this.parent = null
  }
  root() {
    return this.parent
  }
  add(data) {
    this.parent = addData(this.parent, data);       //корневой узел добавляется только в 1ый раз

    function addData(node, data) {
      if (node === null) {            //новый объект создается всякий раз, когда отсутствует узел
        return new Node(data);     //Экземпляр объекта Node. bst = new BinarySearchTree() ---> bst.parent
      }

      if (node.data === data) {           // если число уже есть, ничего не делать
        return;
      }

      if (data < node.data) {
        node.left = addData(node.left, data);       //т.к. узлов не сущ. (node.left===null), в свойство node.left запишется новый объект new Node(data)
      } else {
        node.right = addData(node.right, data);     //сравнение начинается от корня, продолжается рекурсивно. В итоге, нет свойства - создаётся новый объект со св-вами, куда записывается data
      }

      return node;
    }
  }


  has(data) {
    if (data === this.parent.data) return true;
    let node = this.parent;

    return findInside(data, node)

    function findInside(data, node) {
      return (data > node.data) ? findRightLeft(data, node.right) :
          (data < node.data) ? findRightLeft(data, node.left) : true
    }

    function findRightLeft(data, nextNode) {
      return (nextNode) ? findInside(data, nextNode) : false
    }
  }

  find(data) {
    if (data === this.parent.data) return this.parent;
    let node = this.parent;

    return findInside(data, node)

    function findInside(data, node) {
      return (data > node.data) ? findRightLeft(data, node.right) :
          (data < node.data) ? findRightLeft(data, node.left) : node
    }

    function findRightLeft(data, nextNode) {
      return (nextNode) ? findInside(data, nextNode) : null
    }
  }


  remove(data) {
    let node = this.parent;

    this.parent = removeData(data, node);

    function removeData(data, node) {
      if (!node) return null

      if (data < node.data && node.left) {
        node.left = removeData(data, node.left);
        return node
      } else if (data > node.data && node.right) {
        node.right = removeData(data, node.right);      //возвращается нода, которая перезаписывает правую ветвь родительской ноды
        return node                                     // возврат родительской ноды
      } else {
        if (data === node.data) {                     //искомый node
          if (node.right && node.left) {          // если 2 ребёнка, найти замену для удаляемого (макс или мин)
            let minFromBigger = node.right          //найти минимальное из правых (каждое будет больше текущей ноды)
            while (minFromBigger.left){
              minFromBigger = minFromBigger.left
            }

            node.data = minFromBigger.data;                            //перезаписать найденное на мин. знач.
            node.right = removeData(minFromBigger.data, node.right)    //найти и удалить использованный мин.
            return node

          } else if (node.left) {
            node = node.left
            return node
          } else if (node.right) {
            node = node.right
            return node
          } else return null
        }
      }
    }
  }

  min() {
    let node = this.parent;

    if (!node) return null;

    if (!node.left && !node.right) {
      return node.data
    }

    while(node.left) {
      node = node.left
    }
    return node.data
  }

  max() {
    let node = this.parent;

    if (!node) return null;

    if (!node.left && !node.right) {
      return node.data
    }

    while(node.right) {
      node = node.right
    }
    return node.data
  }
}

module.exports = {
  BinarySearchTree
};