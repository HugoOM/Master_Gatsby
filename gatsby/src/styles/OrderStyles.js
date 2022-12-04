import styled from 'styled-components';

const OrderStyles = styled.form`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;

  fieldset {
    grid-column: span 2;
    max-height: 600px;
    overflow-y: auto;
    overflow-x: hidden;

    label {
      display: grid;
      gap: 1rem;
      align-content: start;
    }

    label + label {
      margin-top: 1rem;
    }

    &.menu,
    &.order {
      height: 600px;

      & > div:not(:first-of-type) {
        margin: 2rem 0;
      }
    }

    @media (min-width: 900px) {
      &.order,
      &.menu {
        grid-column: span 1;
      }
    }
  }

  .mapleSyrup {
    display: none;
  }
`;

export default OrderStyles;
