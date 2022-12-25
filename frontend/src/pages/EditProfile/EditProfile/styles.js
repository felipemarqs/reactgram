import styled from "styled-components";

export const Container = styled.div`
  border: 1px solid #363636;
  background-color: black;
  padding: 1.5em 2em;
  max-width: 40%;
  margin: 2em auto;
  text-align: center;

  p.sub {
    color: #ccc;
    margin: 1em;
  }
`;

export const TitleContainer = styled.div`
  margin: 2em;
`;

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;

export const ImageContainer = styled.div`
  img {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    margin-bottom: 1em;
    object-fit: cover;
  }
`;
