import currencyUI from '../views/currency';

class Favorites {
  constructor(currency) {
    this.favorites = [];
    this.dropdown = document.querySelector('#dropdown1');
    this.getCurrencySymbol = currency.getCurrencySymbol.bind(currency);
  }

  async init(tickets) {
    this.addFavoriteTicket(tickets);
  }

  addFavoriteTicket(tickets) {
    const currency = this.getCurrencySymbol();
    document.querySelectorAll('.add-favorite').forEach((addFavoriteBtn, index) => {
      addFavoriteBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (!this.favorites.includes(tickets[index])) {
          this.favorites.push(tickets[index]);
          this.dropdown.insertAdjacentHTML('beforeend', this.generateFavoriteTemplate(tickets[index], currency));
          const lastFavorite = this.dropdown.lastChild.previousElementSibling;
          this.addRemoveHandler(lastFavorite);
        }
      });
    });
  }

  generateFavoriteTemplate(ticket, currency) {
    return `
    <div class="favorite-item  d-flex align-items-start">
      <img
        src=${ticket.airline_logo}
        class="favorite-item-airline-img"
      />
      <div class="favorite-item-info d-flex flex-column">
        <div
          class="favorite-item-destination d-flex align-items-center"
        >
          <div class="d-flex align-items-center mr-auto">
            <span class="favorite-item-city">${ticket.origin_name}</span>
            <i class="medium material-icons">flight_takeoff</i>
          </div>
          <div class="d-flex align-items-center">
            <i class="medium material-icons">flight_land</i>
            <span class="favorite-item-city">${ticket.destination_name}</span>
          </div>
        </div>
        <div class="ticket-time-price d-flex align-items-center">
          <span class="ticket-time-departure">${ticket.departure_at}</span>
          <span class="ticket-price ml-auto">${currency}${ticket.price}</span>
        </div>
        <div class="ticket-additional-info">
          <span class="ticket-transfers">Пересадок: ${ticket.transfers}</span>
          <span class="ticket-flight-number">Номер рейса: ${ticket.flight_number}</span>
        </div>
        <a
          class="waves-effect waves-light btn-small pink darken-3 delete-favorite ml-auto"
          >Delete</a
        >
      </div>
    </div>
    `
  }

  addRemoveHandler(lastFavorite) {
    lastFavorite.querySelector('.delete-favorite').addEventListener('click', (e) => {
      e.preventDefault();
      var favoriteTickets = Array.prototype.slice.call( this.dropdown.children );
      this.favorites.splice(favoriteTickets.indexOf(e.target.closest('.favorite-item')), 1);
      this.dropdown.removeChild(e.target.closest('.favorite-item'));
    });
  }
}

const favorites = new Favorites(currencyUI);
export default favorites;



