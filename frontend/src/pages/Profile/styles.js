import styled from "styled-components";

export const Container = styled.div`
  width: 50%;
  margin: 0 auto;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  flex-wrap: wrap;
  padding: 1em;
  border-bottom: 1px solid #363636;

  img {
    margin-right: 1em;
    width: 150px;
    height: 150px;
    border-radius: 50%;
    margin-bottom: 1em;
    object-fit: cover;
  }
`;

export const HeaderDetails = styled.div``;

export const NewPhotoForm = styled.div`
  padding: 1em;
  border-bottom: 1px solid #363636;
`;

export const PhotosContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, min(250px));
  justify-content: center;
  grid-gap: 28px;
`;

export const Photo = styled.div`
  margin: 0;

  img {
    margin-right: 1em;
    width: 250px;
    height: 250px;
    margin-bottom: 1em;
    object-fit: cover;
    width: 100%;
    vertical-align: top;
  }

  .actions {
    display: flex;
    justify-content: space-around;
    padding: 10px;
  }

  .actions svg {
    cursor: pointer;
  }

  .edit-photo {
    margin-bottom: 1em;
  }

  .edit-photo img {
    width: 100%;
    margin-bottom: 1em;
  }
`;
