class ListNode {
  value: number;
  next: ListNode | null;

  constructor(value: number, next: ListNode | null = null) {
    this.value = value;
    this.next = next;
  }
}

class LinkedList {
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

const linkedList = new LinkedList();

// ...previous code...

function renderLinkedList(): void {
  const linkedListDiv = document.getElementById('linkedList') as HTMLDivElement;
  const nodes = linkedList.toArray();
  linkedListDiv.innerHTML = nodes.join(' -> ');

  const nodeToDeleteSelect = document.getElementById('nodeToDelete') as HTMLSelectElement;
  nodeToDeleteSelect.innerHTML = '<option>Select a node to delete</option>';
  nodes.forEach(node => {
    const option = document.createElement('option');
    option.value = node.toString();
    option.textContent = node.toString();
    nodeToDeleteSelect.appendChild(option);
  });
}

document.getElementById('addNodeBtn')?.addEventListener('click', () => {
  const newNodeInput = document.getElementById('newNodeInput') as HTMLInputElement;
  const value = parseInt(newNodeInput.value, 10);
  if (!isNaN(value)) {
    linkedList.addNode(value);
    newNodeInput.value = '';
    renderLinkedList();
  }
});

document.getElementById('deleteNodeBtn')?.addEventListener('click', () => {
  const nodeToDeleteSelect = document.getElementById('nodeToDelete') as HTMLSelectElement;
  const value = parseInt(nodeToDeleteSelect.value, 10);
  if (!isNaN(value)) {
    linkedList.deleteNode(value);
    renderLinkedList();
  }
});


document.getElementById('findNodeBtn')?.addEventListener('click', () => {
  const findNodeInput = document.getElementById('findNodeInput') as HTMLInputElement;
  const value = parseInt(findNodeInput.value, 10);
  const foundNode = linkedList.findNode(value);
  const linkedListDiv = document.getElementById('linkedList') as HTMLDivElement;

  if (foundNode !== null) {
    linkedListDiv.innerHTML = `Node with value ${value} found!`;
    linkedListDiv.classList.remove('alert');
  } else {
    linkedListDiv.innerHTML = `Node with value ${value} not found.`;
    linkedListDiv.classList.add('alert');
  }

  setTimeout(() => {
    renderLinkedList();
  }, 2000);
});

renderLinkedList();
