import { LinkedList } from "./LinkedList";
import Person from "./Person";
import { PriorityQueue } from "./PriorityQueue";
import { Queue } from "./Queue";
import { Stack } from "./Stack";

export class LinkedListUI {
  
  constructor(
    private linkedList = new LinkedList,
    private queue = new PriorityQueue,
    private stack = new Stack,


    private chosenLinkedListType: 'linkedlist' | 'queue' | 'stack' = 'linkedlist',
    private queueControls = document.getElementById('queueControls'),
    private stackControls = document.getElementById('stackControls'),
    private nodeToDeleteSelect = document.getElementById('nodeToDelete') as HTMLSelectElement,
    private listTypeSelect = document.getElementById('listType') as HTMLSelectElement,
    private linkedListControls = document.getElementById('linkedListControls'),
    private newNodeInput = document.getElementById('newNodeInput') as HTMLInputElement,
    private newNodeNameInput = document.getElementById('newNodeNameInput') as HTMLInputElement,
    private findNodeInput = document.getElementById('findNodeInput') as HTMLInputElement,
    private linkedListDiv = document.getElementById('linkedList') as HTMLDivElement,
  ) {
    // Adds event listeners to the above DOM elements
    this.initHandlers();
  }

  private getCurrentLinkedList(): LinkedList {
    switch (this.chosenLinkedListType) {
      case 'queue':
        return this.queue.linkedList;
      case 'stack':
        return this.stack.linkedList;
      default:
        return this.linkedList;
    }
  }

  private initHandlers(): void {
    const eventHandlers: { [elementId: string]: { handler: () => void, eventType: string } } = {
      'listType': { handler: this.listTypeSelectChangeHandler.bind(this), eventType: 'change' },
      'enqueueBtn': { handler: this.enqueueClickHandler.bind(this), eventType: 'click' },
      'dequeueBtn': { handler: this.dequeueClickHandler.bind(this), eventType: 'click' },
      'pushBtn': { handler: this.stackPushClickedHandler.bind(this), eventType: 'click' },
      'popBtn': { handler: this.stackPopClickedHandler.bind(this), eventType: 'click' },
      'addNodeBtn': { handler: this.addNodeBtnClickHandler.bind(this), eventType: 'click' },
      'deleteNodeBtn': { handler: this.deleteNodeBtnClickHandler.bind(this), eventType: 'click' },
      'findNodeBtn': { handler: this.findNodeBtnClickHandler.bind(this), eventType: 'click' },
    };

    for (const elementId in eventHandlers) {
      const element = document.getElementById(elementId);
      if (element) {
        element.addEventListener(eventHandlers[elementId].eventType, eventHandlers[elementId].handler);
      }
    }

    if(!this.newNodeInput) return;
    
    this.newNodeInput.addEventListener('keyup', (evt: any) => {
      if(evt.keyCode && evt.keyCode == 13) this.addNodeBtnClickHandler()
      return true
    })
    this.findNodeInput.addEventListener('keyup', (evt: any) => {
      if(evt.keyCode && evt.keyCode == 13) this.findNodeBtnClickHandler()
      return true
    })
    this.nodeToDeleteSelect.addEventListener('keyup', (evt: any) => {
      if(evt.keyCode && evt.keyCode == 13 && evt.ctrlKey) this.deleteNodeBtnClickHandler()
      evt.stopImmediatePropagation()
      evt.preventDefault()
      return true
    })

    this.renderLinkedList(this.linkedList);
  }

  private listTypeSelectChangeHandler(): void {
    const listType = this.listTypeSelect?.value as 'linkedlist' | 'queue' | 'stack';
    this.chosenLinkedListType = listType;
    if (this.linkedListControls) {
      this.linkedListControls.style.display = listType === 'linkedlist' ? 'block' : 'none';
    }
    if (this.queueControls) {
      this.queueControls.style.display = listType === 'queue' ? 'block' : 'none';
    }
    if (this.stackControls) {
      this.stackControls.style.display = listType === 'stack' ? 'block' : 'none';
    }
    // Hide the delete controls if the listType is 'queue' or 'stack'
    const deleteNodeControls = document.getElementById('deleteNodeControls');
    if (deleteNodeControls) {
      deleteNodeControls.style.display = listType === 'linkedlist' ? 'block' : 'none';
    }
    this.renderLinkedList(this.getCurrentLinkedList());
  }

  private enqueueClickHandler(): void {
    if (!this.newNodeInput) return;
    if (!this.newNodeNameInput) return;
    const id = parseInt(this.newNodeInput.value, 10);
    const name = this.newNodeNameInput.value;
    if (!isNaN(id)) {
      this.queue.enqueue(new Person({id: id, name}));
      this.newNodeInput.value = '';
      this.renderLinkedList(this.queue.linkedList);
    }
  }

  private dequeueClickHandler(): void {
    this.queue.dequeue();
    this.renderLinkedList(this.queue.linkedList);
  }

  private stackPushClickedHandler(): void {
    if (!this.newNodeInput) return;
    const value = parseInt(this.newNodeInput.value, 10);
    if (!isNaN(value)) {
      this.stack.push(value);
      if (this.newNodeInput) this.newNodeInput.value = '';
      this.renderLinkedList(this.stack.linkedList);
    }
  }

  private stackPopClickedHandler(): void {
    this.stack.pop();
    this.renderLinkedList(this.stack.linkedList);
  }

  private addNodeBtnClickHandler(): void {
    if (this.chosenLinkedListType == 'stack') {
      this.stackPushClickedHandler()
      return
    } else if (this.chosenLinkedListType == 'queue') {
      this.enqueueClickHandler()
      return;
    }

    if (!this.newNodeInput) return;
    if (!this.newNodeNameInput) return;

    const name = this.newNodeNameInput.value;
    const id = parseInt(this.newNodeInput.value, 10);

    if (!isNaN(id)) {
      this.linkedList.addNode(new Person({id, name}));
      this.newNodeInput.value = '';
      this.newNodeNameInput.value = ''
      this.renderLinkedList(this.linkedList);
    }
  }

  private deleteNodeBtnClickHandler(): void {
    if (!this.nodeToDeleteSelect) return;
    const id = parseInt(this.nodeToDeleteSelect.value, 10);

    if (!this.newNodeNameInput) return;
    const name = this.newNodeNameInput.value;

    if (!isNaN(id)) {
      this.linkedList.deleteNode(new Person({id, name}));
      this.renderLinkedList(this.linkedList);
    }
  }

  private findNodeBtnClickHandler(): void {
    if (!this.findNodeInput) return;

    const id = parseInt(this.findNodeInput.value, 10);

    if (!this.newNodeNameInput) return;
    const name = this.newNodeNameInput.value;
    const foundNode = this.getCurrentLinkedList().findNode(id);

    if (!this.linkedListDiv) return;

    if (foundNode !== null) {
      this.linkedListDiv.innerHTML = `Node with value ${id} found!`;
      this.linkedListDiv?.classList.remove('alert');
    } else {
      this.linkedListDiv.innerHTML = `Node with value ${id} not found.`;
      this.linkedListDiv.classList.add('alert');
    }

    setTimeout(() => {
      this.renderLinkedList(this.getCurrentLinkedList());
    }, 2000);
  }

  private renderLinkedList(linkedListToRender: LinkedList): void {
    const nodes = linkedListToRender.toArray();
    if (!this.linkedListDiv) return;
    this.linkedListDiv.innerHTML = nodes.join(' -> ');

    if (!this.listTypeSelect || !this.nodeToDeleteSelect) return;
    // Update the nodeToDeleteSelect only if the listType is 'linkedlist'
    if (this.listTypeSelect.value === 'linkedlist') {
      this.nodeToDeleteSelect.innerHTML = '<option>Select a node to delete</option>';
      nodes.forEach(node => {
        const option = document.createElement('option');
        option.value = node.toString();
        option.textContent = node.toString();

        if (!this.nodeToDeleteSelect) return;
        this.nodeToDeleteSelect.appendChild(option);
      });
    }
  }
}
