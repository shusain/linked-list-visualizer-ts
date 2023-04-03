import { ListNode } from "./ListNode";
import Person from "./Person";

export class LinkedList {
    head: ListNode | null;

    constructor() {
        this.head = null;
    }

    addNode(person: Person): void {
        if (this.head === null) {
            this.head = new ListNode(person);
        } else {
            let current = this.head;
            while (current.next !== null) {
                current = current.next;
            }
            current.next = new ListNode(person);
        }
    }

    deleteNode(person: Person): void {
        if (this.head === null) return;

        if (this.head.person === person) {
            this.head = this.head.next;
            return;
        }

        let current = this.head;
        while (current.next !== null) {
            if (current.next.person === person) {
                current.next = current.next.next;
                return;
            }
            current = current.next;
        }
    }

    findNode(idToFind: number): ListNode | null {
        let current = this.head;
        while (current !== null) {
            if (current.person.id === idToFind) {
                return current;
            }
            current = current.next;
        }
        return null;
    }

    toArray(): string[] {
        const array: string[] = [];
        let current = this.head;
        while (current !== null) {
            array.push(current.person.output());
            current = current.next;
        }
        return array;
    }
}
