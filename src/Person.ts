export default class Person {
    name: string = "";
    id: number = 0;

    constructor(value: {id:number, name:string}) {
        this.name = value.name
        this.id = value.id
    }

    output() {
        return `${this.id} ${this.name}`
    }
}