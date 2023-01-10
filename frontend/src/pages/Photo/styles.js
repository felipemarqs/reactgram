import styled from "styled-components";

export const Container = styled.div`
  width: 50%;
  margin: 0 auto;
  text-align: center;
  margin-top: 2em;

  .message-container {
    margin: 1em 0;
  }

  .comment {
    margin:30px 0 10px 0;
    /* border-bottom: 1px solid #363636;
    border-top: 1px solid #363636; */
  }

  .comments {
    text-align: left;
  }

  .comments form {
    margin-bottom: 2em;
    padding-bottom: 2em;
    border-bottom: 1px solid #363636;
  }

  p.commentText {
    font-weight: normal;
  }
`;

export const AuthorContainer = styled.div`
  display: flex;
  font-weight: bold;

  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-right: 1em;
  }
`;
