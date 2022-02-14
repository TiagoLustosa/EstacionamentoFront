import { Link } from 'react-router-dom'
import { HeaderContainer, StyledLink } from './styles'

export const Header = (): JSX.Element => {
    return (
        <HeaderContainer>
            <div className="headerContainer">
                <nav>
                    <StyledLink to='/'>Carros</StyledLink>
                    <StyledLink to='/preco-vigencia'>Precos</StyledLink>
                </nav>
            </div>
        </HeaderContainer>
    )
}