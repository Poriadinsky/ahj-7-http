/**
 *  Класс для отображения тикетов на странице.
 *  Он содержит методы для генерации разметки тикета.
 * */

import createEl from './createEl';

export default class TicketView {
  create(name, description, created, id, status) {
    const parent = document.querySelector('.tickets__list');
    const ticketItem = createEl('div', 'ticket__item', parent);
    const statusBox = createEl('div', 'status__box', ticketItem);
    const statusCheck = createEl('div', 'status', statusBox);
    if (status === true) {
      statusCheck.classList.add('check');
    }
    const textList = createEl('div', 'text__list', ticketItem);
    createEl('div', 'text__name', textList, name);
    const textDescription = createEl('div', 'text__description', textList, description);
    textDescription.classList.add('invisible');
    createEl('div', 'created', ticketItem, created);
    createEl('button', 'edit__button', ticketItem);
    createEl('button', 'delete__button', ticketItem);
    const identifier = createEl('div', 'identifier', ticketItem, id);
    identifier.classList.add('invisible');

    return ticketItem;
  }
}
