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

const queueControls = document.getElementById('queueControls');
const stackControls = document.getElementById('stackControls');
const nodeToDeleteSelect = document.getElementById('nodeToDelete') as HTMLSelectElement;
const listTypeSelect = document.getElementById('listType') as HTMLSelectElement;
const linkedListControls = document.getElementById('linkedListControls');
const newNodeInput = document.getElementById('newNodeInput') as HTMLInputElement;
const findNodeInput = document.getElementById('findNodeInput') as HTMLInputElement;
const linkedListDiv = document.getElementById('linkedList') as HTMLDivElement;

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
  const nodes = linkedListToRender.toArray();
  linkedListDiv.innerHTML = nodes.join(' -> ');

  // Update the nodeToDeleteSelect only if the listType is 'linkedlist'
  if (listTypeSelect.value === 'linkedlist') {
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
  const value = parseInt(newNodeInput.value, 10);
  if (!isNaN(value)) {
    linkedList.addNode(value);
    newNodeInput.value = '';
    renderLinkedList(linkedList);
  }
});

document.getElementById('deleteNodeBtn')?.addEventListener('click', () => {
  const value = parseInt(nodeToDeleteSelect.value, 10);
  if (!isNaN(value)) {
    linkedList.deleteNode(value);
    renderLinkedList(linkedList);
  }
});


document.getElementById('findNodeBtn')?.addEventListener('click', () => {
  const value = parseInt(findNodeInput.value, 10);
  const foundNode = getCurrentLinkedList().findNode(value);

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
