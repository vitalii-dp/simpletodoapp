'use strict';

import {template} from './template.js';
import {countTodos} from './taskHandlers.js';
import {saveTodos} from './taskHandlers.js';

class ToDoItem extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({mode: 'open'});
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.inputCheckbox = this.shadowRoot.querySelector('#task-checkbox');
    this.inputText = this.shadowRoot.querySelector('#task-text');
    this.textSlot = this.shadowRoot.querySelector('#slot-text');
    this.editButton = this.shadowRoot.querySelector('#edit-button');
    this.editButton.title = 'Edit task';

    this.editButton.addEventListener('click', () => {
      this._toggleEditingMode();
    })

    this.deleteButton = this.shadowRoot.querySelector('#delete-button');
    this.deleteButton.title = 'Delete task';
    this.deleteButton.addEventListener('click', () => {
      this.remove();
      saveTodos();
    });
  }
  
  _completed = false;

  static get observedAttributes() {
    return ['completed'];
  }

  get completed() {
    return this._completed;
  }

  set completed(value) {
    const isChecked = Boolean(value);
    if (isChecked !== this.inputCheckbox.checked) {
      this.inputCheckbox.checked = isChecked;
      this._toggleInput();
    }
  }

  _toggleEditingMode(enabled = this.inputText.hidden) {
    this.inputCheckbox.readonly = enabled;
    this.textSlot.hidden = enabled;
    this.inputText.hidden = !enabled;
    
    if (enabled) {
      this.inputText.value = this.textContent;
      this.inputText.focus();
    } else {
      this.textContent = this.inputText.value;
      saveTodos();
    }
  }

  _toggleInput() {
    saveTodos();
    if (this.inputCheckbox.checked) {
      this.setAttribute('completed', true);
      this._completed = this.inputCheckbox.checked;
    } else {
      this.removeAttribute('completed');
      this._completed = this.inputCheckbox.checked;
    }
  }

  connectedCallback() {
    this.addEventListener('click', this._toggleInput);

    this.inputText.addEventListener('blur', () => {
      this._toggleEditingMode(false);
    })

    this.addEventListener('dblclick', () => {
      this._toggleEditingMode();
    });

    this.inputText.addEventListener('keydown', e => {
      if (e.keyCode === 13) {
        this._toggleEditingMode(false);  
      }
    });
  }

  disconnectedCallback() {
    this.removeEventListener('click', this._toggleInput);
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this[name] = newValue || newValue === '';
  }
}

customElements.define('todo-item', ToDoItem);

