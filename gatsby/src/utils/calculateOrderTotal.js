import calculatePizzaPrice from './calculatePizzaPrice';

export default function calculateOrderTotal(order, pizzas) {
  return order.reduce((runningTotal, orderItem) => {
    const pizzaItem = pizzas.find((pizza) => pizza.id === orderItem.id);
    return runningTotal + calculatePizzaPrice(pizzaItem.price, orderItem.size);
  }, 0);
}
