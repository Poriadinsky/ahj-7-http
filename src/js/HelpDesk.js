import TicketService from './TicketService';
import TicketView from './TicketView';
import TicketForm from './TicketForm';
import createEl from './createEl';

/**
 *  Основной класс приложения
 * */
export default class HelpDesk {
  constructor(container) {
    if (!(container instanceof HTMLElement)) {
      throw new Error('This is not HTML element!');
    }
    this.container = container;
    this.ticketService = new TicketService();
    this.ticketView = new TicketView();
    this.ticketForm = new TicketForm();
  }

  init() {
    this.drawUI();
    this.getTickets();
    this.ticketForm.create();
    this.bindToDOM();
  }

  drawUI() {
    const parent = createEl('div', 'container', this.container);
    createEl('button', 'add-tiket-button', parent, 'Добавить тикет');
    createEl('div', 'tickets__list', parent);
  }

  async getTickets() {
    document.querySelector('.tickets__list').innerHTML = '';
    const data = await this.ticketService.get();
    data.forEach((el) => {
      this.ticketView.create(el.name, el.description, new Date(el.created).toLocaleString(), el.id, el.status);
    });
  }

  bindToDOM() {
    document.addEventListener('click', this.click.bind(this));
  }

  click(e) {
    e.preventDefault();
    const { target } = e;
    const name = document.querySelector('.modal__short-description__input');
    const description = document.querySelector('.modal__detailed-description__input');

    if (target.classList.contains('add-tiket-button')) {
      this.ticketForm.show('Добавить тикет');
    } else if (target.classList.contains('edit__button')) {
      this.deleteClass('edit');
      this.ticketForm.show('Изменить тикет');
      this.addClass(target, 'edit');
    } else if (target.classList.contains('modal__cancel-button')) {
      this.ticketForm.close();
      name.value = '';
      description.value = '';
    } else if (target.classList.contains('modal__submit-button')) {
      if (document.querySelector('.edit')) {
        const item = document.querySelector('.edit');
        const id = this.getId(item);
        this.ticketService.update(id, name.value, description.value);
        this.ticketForm.close();
        name.value = '';
        description.value = '';
        this.getTickets();
      } else {
        this.ticketService.create(name.value, description.value);
        this.ticketForm.close();
        name.value = '';
        description.value = '';
        this.getTickets();
      }
    } else if (target.classList.contains('delete__button')) {
      const id = this.getId(target);
      this.ticketService.delete(id, name.value, description.value);
      this.ticketForm.close();
      this.getTickets();
    } else if (!target.classList.contains('status')) {
      if (target.closest('.ticket__item') !== null) {
        target.closest('.ticket__item').querySelector('.text__description').classList.toggle('invisible');
      }
    } else if (target.classList.contains('status')) {
      if (target.classList.contains('check')) {
        target.classList.remove('check');
        const id = this.getId(target);
        this.ticketService.updateCheck(id, false);
      } else {
        target.classList.add('check');
        const id = this.getId(target);
        this.ticketService.updateCheck(id, true);
      }
    }
  }

  getId(target) {
    const id = target.closest('.ticket__item').querySelector('.identifier').textContent;
    return id;
  }

  addClass(target, className) {
    target.closest('.ticket__item').classList.add(className);
  }

  deleteClass(className) {
    const arr = Array.from(document.querySelectorAll(className));
    arr.forEach((el) => {
      el.classList.remove(className);
    });
  }
}
