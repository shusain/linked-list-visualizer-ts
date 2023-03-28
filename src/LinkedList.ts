import { ListNode } from "./ListNode";

export class LinkedList {
    head: ListNode | null;

    constructor() {
        this.head = null;
    }

    addNode(value: number): void {
        if (this.head === null) {
            this.head = new ListNode(value);
        } else {
            let current = this.head;
            while (current.next !== null) {
                current = current.next;
            }
            current.next = new ListNode(value);
        }
    }

    deleteNode(value: number): void {
        if (this.head === null) return;

        if (this.head.value === value) {
            this.head = this.head.next;
            return;
        }

        let current = this.head;
        while (current.next !== null) {
            if (current.next.value === value) {
                current.next = current.next.next;
                return;
            }
            current = current.next;
        }
    }

    findNode(value: number): ListNode | null {
        let current = this.head;
        while (current !== null) {
            if (current.value === value) {
                return current;
            }
            current = current.next;
        }
        return null;
    }

    toArray(): number[] {
        const array: number[] = [];
        let current = this.head;
        while (current !== null) {
            array.push(current.value);
            current = current.next;
        }
        return array;
    }
}
