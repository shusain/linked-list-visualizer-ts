
class Stack {
    linkedList: LinkedList;
  
    constructor() {
      this.linkedList = new LinkedList();
    }
  
    push(value: number): void {
      const newNode = new ListNode(value, this.linkedList.head);
      this.linkedList.head = newNode;
    }
  
    pop(): number | null {
      if (this.linkedList.head === null) return null;
      const value = this.linkedList.head.value;
      this.linkedList.deleteNode(value);
      return value;
    }
  }