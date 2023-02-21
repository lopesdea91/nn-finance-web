export const containerGeral = `
  animation: opacityIn 0.5s forwards; 
  transition: all 0.2s ease-in;
`
export const containerResponsive = `
  margin-left: 0.25rem;
  margin-right: 0.25rem;

  @media (min-width: 426px) {
    margin-left: 2.75rem;
    margin-right: 0.5rem;
  }
  @media (min-width: 768px) {
    margin-bottom: 0.75rem;
    margin-left: 8.5rem;
    margin-right: 0.5rem;
  }
  @media (min-width: 1200px) {
    margin-left: calc(13rem + 0.5rem);
  } 
`
export const containerResponsivePadding = `
  padding: 0.5rem 0.75rem;

  @media (min-width: 768px) {
    padding: 0.75rem;
  }
  @media (min-width: 1200px) {
    padding: 1rem 0.75rem;
  } 
`