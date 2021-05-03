import { Link } from 'react-router-dom';

import { Library } from 'constants/language';

import styled from 'styled-components';

const STitleWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 5rem;

    & h2 {
        margin: 0;
        font-size: 10rem;
        color: var(--darkRedColor);
    }

    & p {
        margin: 0;
        text-transform: uppercase;
        font-size: 2rem;
    }
`;

const SGoHome = styled.div`
    margin: 1rem;
    padding: 1rem;
    text-transform: capitalize;
    color: var(--onHoverColor);
    font-size: 1rem;
    border-radius: 5px;
    background: var(--purpleColor);
    box-shadow: var(--boxShadow);
    transition: var(--transitionApp);

    &:hover {
        background: var(--onHoverColor);
        color: var(--purpleColor);
    }
`;

export default function ErrorPage(){
    return (
        <div className="page-404">
            <STitleWrapper>
                <h2>404</h2>
                <p>{Library.getText('nf404.nf')}</p>
            </STitleWrapper>

            <SGoHome as={Link} to="/" >
                {Library.getText('nf404.goHome')}
            </SGoHome>
        </div>
    )
}