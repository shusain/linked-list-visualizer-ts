import Person from "./Person";

export class ListNode {
    person: Person;
    next: ListNode | null;

    constructor(person: Person, next: ListNode | null = null) {
        this.person = person;
        this.next = next;
    }
}