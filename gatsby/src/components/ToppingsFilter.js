import { useStaticQuery, graphql, Link } from 'gatsby';
import React from 'react';
import styled from 'styled-components';

const ToppingsStyles = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 4rem;
  a {
    display: grid;
    padding: 5px;
    grid-template-columns: auto 1fr;
    grid-gap: 0 1rem;
    background: var(--grey);
    align-items: center;
    border-radius: 2px;
    .count {
      background: white;
      padding: 2px 5px;
    }
    &.active {
      background: var(--yellow);
    }
  }
`;

const countPizzasPerTopping = function (pizzas) {
  return pizzas
    .map((pizza) => pizza.toppings)
    .flat()
    .reduce(
      (acc, { id, name }) => ({
        ...acc,
        [id]: {
          id,
          name,
          count: id in acc ? acc[id].count + 1 : 1,
        },
      }),
      {}
    );
};

export default function ToppingsFilter({ activeTopping }) {
  const { pizzas } = useStaticQuery(graphql`
    query {
      pizzas: allSanityPizza {
        nodes {
          name
          id
          toppings {
            name
            id
          }
        }
      }
    }
  `);

  return (
    <ToppingsStyles>
      <Link to="/pizzas">
        <span className="name">All</span>
      </Link>
      {Object.values(countPizzasPerTopping(pizzas.nodes))
        .sort((a, b) => {
          if (a.count === b.count) {
            return a.name > b.name ? 1 : -1;
          }

          return a.count > b.count ? -1 : 1;
        })
        .map(({ name, count, id }) => (
          <Link
            to={`/topping/${name}`}
            key={id}
            className={name === activeTopping ? 'active' : ''}
          >
            <span className="name">{name}</span>
            <span className="count">{count}</span>
          </Link>
        ))}
    </ToppingsStyles>
  );
}
