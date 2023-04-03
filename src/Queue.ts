import { LinkedList } from "./LinkedList";
import Person from "./Person";

export class Queue {
    linkedList: LinkedList;
  
    constructor() {
      this.linkedList = new LinkedList();
    }
  
    enqueue(person: Person): void {
      this.linkedList.addNode(person);
    }
  
    dequeue(): Person| null {
      if (this.linkedList.head === null) return null;
      const person = this.linkedList.head.person;
      this.linkedList.deleteNode(person);
      return person;
    }
  }
  