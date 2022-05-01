const { NotImplementedError } = require('../extensions/index.js');

const { ListNode } = require('../extensions/list-node.js');

/*class ListNode {
  constructor(x) {
    this.value = x;
    this.next = null;
  }
}*/

/**
 * Implement the Queue with a given interface via linked list (use ListNode extension above).
 *
 * @example
 * const queue = new Queue();
 *
 * queue.enqueue(1); // adds the element to the queue
 * queue.enqueue(3); // adds the element to the queue
 * queue.dequeue(); // returns the top element from queue and deletes it, returns 1
 * queue.getUnderlyingList() // returns { value: 3, next: null }
 */
class Queue {

  getUnderlyingList() {
    return this
  }

  enqueue(value) {
    let node = new ListNode(value);

    if (!this.value) {
      this.value = node.value
      this.next = null
    } else {

      if (!this.next) {
        this.next = node;
      } else {
        let item = this.next;
        while (item.next) {
          item = item.next        //искать последний next
        }
        item.next = node
      }
    }
  }

  dequeue() {
    let firstItem = this.value
    this.value = this.next.value;
    this.next = this.next.next
    return firstItem
  }
}

module.exports = {
  Queue
};
