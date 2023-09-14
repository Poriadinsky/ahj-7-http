/**
 *  Класс для создания формы создания нового тикета
 * */
import createEl from './createEl';

export default class TicketForm {
  create() {
    const parent = document.querySelector('.container');
    const modal = createEl('form', 'modal', parent);
    modal.classList.add('invisible');
    modal.classList.add('modal', 'invisible');
    modal.method = 'POST';
    modal.action = 'http://localhost:7070';
    createEl('div', 'modal__title', modal);
    createEl('div', 'modal__short-description__text', modal, 'Краткое описание');
    const modalShortDescriptionInput = createEl('input', 'modal__short-description__input', modal);
    modalShortDescriptionInput.classList.add('input');
    modalShortDescriptionInput.name = 'name';
    modalShortDescriptionInput.required = true;
    createEl('div', 'modal__detailed-description__text', modal, 'Подробное описание');
    const modalDetailedDescriptionInput = createEl('input', 'modal__detailed-description__input', modal);
    modalDetailedDescriptionInput.classList.add('input');
    modalDetailedDescriptionInput.name = 'description';
    modalDetailedDescriptionInput.required = true;
    const modalCancelButton = createEl('button', 'modal__cancel-button', modal, 'Отмена');
    modalCancelButton.classList.add('modal-button');
    const modalSubmitButton = createEl('button', 'modal__submit-button', modal, 'Ок');
    modalSubmitButton.classList.add('modal-button');

    return modal;
  }

  show(title) {
    const modal = document.querySelector('.modal');
    modal.classList.remove('invisible');
    const modalTitle = document.querySelector('.modal__title');
    modalTitle.textContent = title;
  }

  close() {
    const modal = document.querySelector('.modal');
    modal.classList.add('invisible');
  }
}
