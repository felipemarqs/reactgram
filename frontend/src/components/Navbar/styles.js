import styled from "styled-components";

export const NavContainer = styled.nav`
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #000;
    border-bottom: 1px solid #363636;
    padding: 1em 1.5em; 

    form {
        position: relative;
        width: 20%;
    }

    form svg {
       position: absolute;
       top: 10px;
       left: 9px;
    }

    form input { 
        padding-left: 2.5em;
        border: none;
        border-radius: 5px;
        width: 100%;
        margin: 0;
    }
`;

export const LinksContainer = styled.ul`
    display: flex;
    align-items: center;
    list-style: none;

    li {
        margin-right: 1em;
    }

    span {
        cursor: pointer;
    }

    svg {
        font-size: 1.5em;
    }

`