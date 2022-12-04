import { graphql } from 'gatsby';
import React from 'react';
import Img from 'gatsby-image';
import SEO from '../components/SEO.js';
import useForm from '../utils/useForm.js';
import calculatePizzaPrice from '../utils/calculatePizzaPrice.js';
import formatMoney from '../utils/formatMoney.js';
import OrderStyles from '../styles/OrderStyles.js';
import MenuItemStyles from '../styles/MenuItemStyles.js';
import usePizza from '../utils/usePizza.js';
import PizzaOrder from '../components/PizzaOrder.js';
import calculateOrderTotal from '../utils/calculateOrderTotal.js';

export default function OrderPage({ data }) {
  const pizzas = data.pizzas.nodes;

  const { values, updateValue } = useForm({
    name: '',
    email: '',
  });

  const {
    order,
    addToOrder,
    removeFromOrder,
    error,
    loading,
    message,
    submitOrder,
  } = usePizza(pizzas, values);

  return (
    <>
      <SEO title="Order a Pizza!" />
      <OrderStyles onSubmit={submitOrder}>
        <fieldset>
          <legend>Your Info</legend>
          <label htmlFor="name">
            Name
            <input
              type="text"
              name="name"
              id="name"
              value={values.name}
              onChange={updateValue}
            />
          </label>
          <label htmlFor="email">
            Email
            <input type="text" name="email" id="email" onChange={updateValue} />
          </label>
        </fieldset>
        <fieldset className="menu">
          <legend>Menu</legend>
          {pizzas.map((pizza) => (
            <MenuItemStyles key={pizza.id}>
              <Img
                fluid={pizza.image.asset.fluid}
                alt={pizza.name}
                height="50"
                width="50"
              />
              <div>
                <h2>{pizza.name}</h2>
              </div>
              <div>
                {['S', 'M', 'L'].map((size) => (
                  <button
                    type="button"
                    key={size}
                    onClick={() => {
                      addToOrder({
                        id: pizza.id,
                        size,
                      });
                    }}
                  >
                    {size}{' '}
                    {formatMoney(
                      calculatePizzaPrice(parseInt(pizza.price), size)
                    )}
                  </button>
                ))}
              </div>
            </MenuItemStyles>
          ))}
        </fieldset>
        <fieldset className="order">
          <legend>Order</legend>
          <PizzaOrder
            order={order}
            removeFromOrder={removeFromOrder}
            pizzas={pizzas}
          />
        </fieldset>
        <fieldset>
          <h3>
            Your Total is {formatMoney(calculateOrderTotal(order, pizzas))}
          </h3>
          <button type="submit" disabled={loading}>
            {loading ? `Placing Order...` : `Order Ahead`}
          </button>
        </fieldset>
      </OrderStyles>
    </>
  );
}

export const pageQuery = graphql`
  query {
    pizzas: allSanityPizza {
      nodes {
        id
        name
        price
        slug {
          current
        }
        toppings {
          id
          name
        }
        image {
          asset {
            fluid(maxWidth: 100) {
              ...GatsbySanityImageFluid
            }
          }
        }
      }
    }
  }
`;
