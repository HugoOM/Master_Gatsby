import React from 'react';
import { graphql } from 'gatsby';
import styled from 'styled-components';
import Img from 'gatsby-image';
import SEO from '../components/SEO';

const BeerGridStyles = styled.div`
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
`;

const SingleBeerStyles = styled.div`
  border: 1px solid var(--grey);
  padding: 2rem;
  text-align: center;
  display: grid;
  grid-template-rows: 175px repeat(auto-fill, minmax(100px, 1fr));
`;

export default function BeersPage({ data }) {
  const beers = data.beers.nodes.filter((beer) => beer.localImage);

  return (
    <>
      <SEO title={`Beers! We have ${data.beers.nodes.length} in stock!`} />
      <h2 className="center">
        We have {beers.length} Beers Available. Dine in Only!
      </h2>
      <BeerGridStyles>
        {beers.map((beer) => {
          const rating = Math.round(beer.rating.average);
          return (
            <SingleBeerStyles key={beer.id}>
              <Img
                fluid={beer.localImage.childImageSharp.fluid}
                imgStyle={{
                  width: '100%',
                  height: '150px',
                  // position: '50px',
                  'object-fit': 'contain',
                }}
              />
              <h3>{beer.name}</h3>
              {beer.price}
              <p title={`${rating} out of 5 stars`}>
                {`⭐`.repeat(rating)}
                <span style={{ filter: `grayscale(100%)` }}>
                  {`⭐`.repeat(5 - rating)}
                </span>
                <span>({beer.rating.reviews})</span>
              </p>
            </SingleBeerStyles>
          );
        })}
      </BeerGridStyles>
    </>
  );
}

export const query = graphql`
  query {
    beers: allBeer {
      nodes {
        id
        name
        localImage {
          childImageSharp {
            fluid(maxWidth: 175, maxHeight: 150) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        price
        rating {
          reviews
          average
        }
      }
    }
  }
`;
