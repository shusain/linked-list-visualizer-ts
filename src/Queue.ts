import { LinkedList } from "./LinkedList";

export class Queue {
    linkedList: LinkedList;
  
    constructor() {
      this.linkedList = new LinkedList();
    }
  
    enqueue(value: number): void {
      this.linkedList.addNode(value);
    }
  
    dequeue(): number | null {
      if (this.linkedList.head === null) return null;
      const value = this.linkedList.head.value;
      this.linkedList.deleteNode(value);
      return value;
    }
  }
  