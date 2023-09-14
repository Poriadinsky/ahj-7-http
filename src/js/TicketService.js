/**
 *  Класс для связи с сервером.
 *  Содержит методы для отправки запросов на сервер и получения ответов
 * */

export default class TicketService {
  constructor() {
    this.url = 'http://localhost:3000';
  }

  async create(name, description) {
    const ticket = {
      name,
      description,
    };

    const response = await fetch(`${this.url}?method=createTicket`, {
      method: 'POST',
      body: JSON.stringify(ticket),
    });

    const result = await response.json();

    return result;
  }

  async get() {
    const response = await fetch(`${this.url}?method=allTickets`, {
      method: 'GET',
    });

    const result = await response.json();

    return result;
  }

  async update(id, name, description) {
    const ticket = {
      name,
      description,
    };
    await fetch(`${this.url}?method=updateById&id=${id}`, {
      method: 'POST',
      body: JSON.stringify(ticket),
    });
  }

  async updateCheck(id, status) {
    const ticket = {
      status,
    };
    await fetch(`${this.url}?method=updateById&id=${id}`, {
      method: 'POST',
      body: JSON.stringify(ticket),
    });
  }

  async delete(id) {
    await fetch(`${this.url}?method=deleteById&id=${id}`, {
      method: 'GET',
    });
  }
}
