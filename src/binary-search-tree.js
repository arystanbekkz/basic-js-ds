const { NotImplementedError } = require('../lib/errors');
const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {
  constructor() {
    this.treeRoot = null;
  }
  root() {
    return this.treeRoot;
  }

  add(data) {
    this.treeRoot = addNode(this.treeRoot, data);
    function addNode(node, data) {
      if (!node) return new Node(data);
      if (node.data === data) return node;
      if (node.data > data) {
        node.left = addNode(node.left, data)
      } else {
        node.right = addNode(node.right, data)
      }
      return node;
    }
  }

  find(data) {
    let curr = this.treeRoot;
    if(curr.data === data) return curr;
    while (curr) {
      if (data === curr.data) return curr;
      if (data < curr.data) {
        curr = curr.left
      } else {
        curr = curr.right
      }
    }
    return null;
  }

  has(data) {
    return search(this.treeRoot, data)
    function search(node, data) {
      if (!node) return false;
      if (node.data === data) return true;
      if (node.data < data) {
        return search(node.right, data)
      } else {
        return search(node.left, data)
      }
    }
  }

  remove(data) {
    return removeNode(this.treeRoot, data);
    function removeNode(node, data) {
      if (!node) return false;
      if (node.data > data) {
        node.left = removeNode(node.left, data)
        return node;
      } else if (node.data < data) {
        node.right = removeNode(node.right, data)
        return node;
      } else {
        if (!node.left && !node.right) return null;
        if (!node.left) {
          return (node = node.right);
        }
        if (!node.right) {
          return (node = node.left);
        }
        let minNode = node.right;
        while (minNode.left) {
          minNode = minNode.left;
        }
        node.data = minNode.data;
        node.right = removeNode(node.right, minNode.data);
        return node;
      }
    }
  }

  min() {
    let curr = this.treeRoot;
    if (!curr) return undefined;
    while (curr.left) {
      curr = curr.left
    }
    return curr.data;
  }

  max() {
    let curr = this.treeRoot;
    if (!curr) return undefined;
    while (curr.right) {
      curr = curr.right
    }
    return curr.data
  }
}

module.exports = {
  BinarySearchTree
};