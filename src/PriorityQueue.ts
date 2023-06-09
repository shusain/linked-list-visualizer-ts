import { ListNode } from "./ListNode";
import Person from "./Person";
import { Queue } from "./Queue";

export class PriorityQueue extends Queue {

    enqueue(person: Person): boolean {
        let nodeToInsert = new ListNode(person);

        if (this.linkedList.head === null) {
            this.linkedList.head = new ListNode(person);
            return true
        }

        if (person.id < this.linkedList.head.person.id) {
            nodeToInsert.next = this.linkedList.head
            this.linkedList.head = nodeToInsert
            return true
        }

        let current = this.linkedList.head;
        while (current.next !== null && current.next.person.id < nodeToInsert.person.id) {
            current = current.next;
        }

        // Check to see if the one we hit is equal to one about to insert
        if (current.next && nodeToInsert.person.id == current.next.person.id) {
            return false;
        }

        nodeToInsert.next = current.next
        current.next = nodeToInsert
        return true
    }

}
