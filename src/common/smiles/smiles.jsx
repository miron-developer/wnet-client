import { Library } from "constants/language";
import { RandomKey } from "functions/content";

import styled from "styled-components";

const SSmilesPlash = styled.div`
    position: absolute;
    left: -100vw;
    bottom: 100%;
    padding: 1rem;
    background: #534b71ba;
    border-radius: 10px;
    box-shadow: var(--boxShadow);
    opacity: 0;
    transition: var(--transitionApp);
`;

const SSetName = styled.div`
    margin-bottom: 1rem;
    color: var(--onHoverColor);
`;

const SSmilesSet = styled.div`
    display: grid;
    grid-gap: 1rem;
    grid-template-columns: ${props => `repeat(${props.countX}, 1fr)`};
`;

const SSmile = styled.span`
    cursor: pointer;
    transition: var(--transitionApp);

    &:hover {
        filter: brightness(0.5);
    }
`;

const SSmilesWrapper = styled.div`
    position: relative;
    transition: var(--transitionApp);

    &:hover ${SSmilesPlash} {
        left: 0;
        opacity: 1;
    }
`;

const smilesPattern = [
    {
        'name': Library.getText('common.smiles.smilesPatternNames.all'),
        'countX': 10,
        'smiles': [
            '😀', '😁', '😆', '😅', '🤣', '😂', '🙂', '😉', '😇', '🥰',
            '😍', '🤩', '😘', '😋', '😜', '😝', '🤑', '🤭', '🤫', '🤔',
            '🤐', '🤨', '😐', '😑', '😏', '😒', '😴', '😷', '🤮', '🥵',
            '🥶', '🤧', '🥳', '😎', '🤓', '🧐', '😭', '😤', '😈', '👿',
        ],
    },
];

const Smile = ({smile, index, put = ()=>{}}) => {
    if (!smilesPattern[index]) return null;
    const code = smile.codePointAt();
    const smileFromCode = String.fromCodePoint(code);

    return (
        <SSmile key={RandomKey()} 
            code={code} smile={smileFromCode}
            onClick={() => put(smile)} 
        >
            {smile}
        </SSmile>
    )
}

const SmilesSet = ({index, name, smiles = [], countX, put}) => {
    return (
        <>
            <SSetName>{name}</SSetName>

            <SSmilesSet countX={countX}>
                {
                    smiles.map(
                        smile => 
                        <Smile key={RandomKey()} smile={smile} index={index} put={put} />
                    )
                }
            </SSmilesSet>
        </>
    )
}

const SmilesPlash = ({ put }) => {
    return (
        <SSmilesPlash>
            {smilesPattern.map((smiles, index) => <SmilesSet index={index} key={RandomKey()} {...smiles} put={put} />)}
        </SSmilesPlash>
    )
}

export default function Smiles({ Wrapper, putFunction = ()=>{} }) {
    return (
        <SSmilesWrapper>
            <SmilesPlash put={putFunction} />
            <Wrapper alt="smiles" srcIcon="/img/smile.png" />
        </SSmilesWrapper>
    )
}