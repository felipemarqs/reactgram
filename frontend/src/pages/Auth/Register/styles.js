import styled from "styled-components";

export const Container = styled.div`
  border: 1px solid #363636;
  background-color: black;
  padding: 1.5em 2em;
  max-width: 33%;
  margin: 2em auto;

  h2 {
    text-align: center;
    margin-bottom: 1.5em;
  }

  .subtitle {
    font-weight: bold;
    color: #999;
    margin-bottom: 1.5em;
  }

  form {
    padding-bottom: 1.5em;
    margin-bottom: 1.5em;
    border-bottom: 1px solid #363636;
  }

  p { 
    text-align: center;
  }

  p a { 
    font-weight: bold;
    color: #0094f6;
  }
`;
