// Drag and Drop Interfaces
export interface Draggable {
  dragStartHandler(event: DragEvent): void;
  dragEndHandler(event: DragEvent): void;
}

export interface DragTarget {
  dragOverHandler(event: DragEvent): void; // permit the drop
  dropHandler(event: DragEvent): void; // handle the drop
  dragLeaveHandler(event: DragEvent): void; // update the UI,
}
