import { Link } from 'react-router-dom';

import { Library } from 'constants/language';

import styled from 'styled-components';

const SSignAboutLogo = styled.div`
    width: 25vw;
    margin: 1rem;

    & img {
        width: 100%;
        height: 100%;
    }
`;

const SSignAboutText = styled.div`
    padding: 1rem;
    margin: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    text-transform: uppercase;
    border-radius: 5px;
    background: var(--onHoverColor);
`;

const SSignAbout = styled.div`
    width: 40%;
    display: flex;
    flex-direction: column;
    align-items: center;

    @media screen and (max-width: 600px) {
        & {
            width: 100%;
            margin: 1rem;
        }
        ${SSignAboutLogo} {
            width: 30%;
            height: auto;
        }
        ${SSignAboutText} {
            min-height: max-content;
        }
    }
`;

// come up with text
export default function About() {
    return (
        <SSignAbout>
            <SSignAboutLogo as={Link} to="/" >
                <img src="/img/logo512.png" alt="logo"/>
            </SSignAboutLogo>
            <SSignAboutText>{Library.getText('signs.about')}</SSignAboutText>
        </SSignAbout>
    )
}