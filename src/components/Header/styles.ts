import { Link } from "react-router-dom";
import styled from "styled-components";

export const HeaderContainer = styled.header`
.headerContent {
    max-width: 1120px;
    height: 5rem;
    margin: 0 auto;
    padding: 0 2rem;

    display: flex;
    align-items: center;
}
    nav {
        margin-left: 5rem;
        height: 5rem;
    }       
`

export const StyledLink = styled(Link)`

            display: inline-block;
            position: relative;
            padding: 0 0.5rem;
            height: 5rem;
            line-height: 5rem;
            color: #FFF;
            font-size: 1.5rem;
            text-decoration: none;
            transition: color 0.2s;

            & {
                margin-left: 2rem;
            }

            &:hover {
                color: grey;
            } 
         
`