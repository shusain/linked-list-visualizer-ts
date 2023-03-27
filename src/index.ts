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

class Queue {
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

const queue = new Queue();
const stack = new Stack();
const linkedList = new LinkedList();

let chosenLinkedListType: 'linkedlist' | 'queue' | 'stack' = 'linkedlist';

function getCurrentLinkedList(): LinkedList {
  switch (chosenLinkedListType) {
    case 'queue':
      return queue.linkedList;
    case 'stack':
      return stack.linkedList;
    default:
      return linkedList;
  }
}

const listTypeSelect = document.getElementById('listType') as HTMLSelectElement;
const linkedListControls = document.getElementById('linkedListControls');
const queueControls = document.getElementById('queueControls');
const stackControls = document.getElementById('stackControls');

listTypeSelect.addEventListener('change', () => {
  const listType = listTypeSelect.value as 'linkedlist' | 'queue' | 'stack';
  chosenLinkedListType = listType;
  if (linkedListControls) {
    linkedListControls.style.display = listType === 'linkedlist' ? 'block' : 'none';
  }
  if (queueControls) {
    queueControls.style.display = listType === 'queue' ? 'block' : 'none';
  }
  if (stackControls) {
    stackControls.style.display = listType === 'stack' ? 'block' : 'none';
  }
  // Hide the delete controls if the listType is 'queue' or 'stack'
  const deleteNodeControls = document.getElementById('deleteNodeControls');
  if (deleteNodeControls) {
    deleteNodeControls.style.display = listType === 'linkedlist' ? 'block' : 'none';
  }
  renderLinkedList(getCurrentLinkedList());
});


// Queue UI interactions
function enqueueClickHandler() {
  const newNodeInput = document.getElementById('newNodeInput') as HTMLInputElement;
  const value = parseInt(newNodeInput.value, 10);
  if (!isNaN(value)) {
    queue.enqueue(value);
    newNodeInput.value = '';
    renderLinkedList(queue.linkedList);
  }
}

document.getElementById('enqueueBtn')?.addEventListener('click', enqueueClickHandler);

document.getElementById('dequeueBtn')?.addEventListener('click', () => {
  queue.dequeue();
  renderLinkedList(queue.linkedList);
});

function stackPushClickedHandler() {
  const newNodeInput = document.getElementById('newNodeInput') as HTMLInputElement;
  const value = parseInt(newNodeInput.value, 10);
  if (!isNaN(value)) {
    stack.push(value);
    newNodeInput.value = '';
    renderLinkedList(stack.linkedList);
  }
}
document.getElementById('pushBtn')?.addEventListener('click', stackPushClickedHandler);

document.getElementById('popBtn')?.addEventListener('click', () => {
  stack.pop();
  renderLinkedList(stack.linkedList);
});


// Update the renderLinkedList function to accept a linked list as a parameter
function renderLinkedList(linkedListToRender: LinkedList): void {
  const linkedListDiv = document.getElementById('linkedList') as HTMLDivElement;
  const nodes = linkedListToRender.toArray();
  linkedListDiv.innerHTML = nodes.join(' -> ');

  // Update the nodeToDeleteSelect only if the listType is 'linkedlist'
  if (listTypeSelect.value === 'linkedlist') {
    const nodeToDeleteSelect = document.getElementById('nodeToDelete') as HTMLSelectElement;
    nodeToDeleteSelect.innerHTML = '<option>Select a node to delete</option>';
    nodes.forEach(node => {
      const option = document.createElement('option');
      option.value = node.toString();
      option.textContent = node.toString();
      nodeToDeleteSelect.appendChild(option);
    });
  }
}

document.getElementById('addNodeBtn')?.addEventListener('click', () => {
  if(chosenLinkedListType == 'stack') {
    stackPushClickedHandler()
    return
  } else if(chosenLinkedListType == 'queue'){
    enqueueClickHandler()
    return;
  }
  const newNodeInput = document.getElementById('newNodeInput') as HTMLInputElement;
  const value = parseInt(newNodeInput.value, 10);
  if (!isNaN(value)) {
    linkedList.addNode(value);
    newNodeInput.value = '';
    renderLinkedList(linkedList);
  }
});

document.getElementById('deleteNodeBtn')?.addEventListener('click', () => {
  const nodeToDeleteSelect = document.getElementById('nodeToDelete') as HTMLSelectElement;
  const value = parseInt(nodeToDeleteSelect.value, 10);
  if (!isNaN(value)) {
    linkedList.deleteNode(value);
    renderLinkedList(linkedList);
  }
});


document.getElementById('findNodeBtn')?.addEventListener('click', () => {
  const findNodeInput = document.getElementById('findNodeInput') as HTMLInputElement;
  const value = parseInt(findNodeInput.value, 10);
  const foundNode = getCurrentLinkedList().findNode(value);
  const linkedListDiv = document.getElementById('linkedList') as HTMLDivElement;

  if (foundNode !== null) {
    linkedListDiv.innerHTML = `Node with value ${value} found!`;
    linkedListDiv.classList.remove('alert');
  } else {
    linkedListDiv.innerHTML = `Node with value ${value} not found.`;
    linkedListDiv.classList.add('alert');
  }

  setTimeout(() => {
    renderLinkedList(getCurrentLinkedList());
  }, 2000);
});

renderLinkedList(linkedList);
