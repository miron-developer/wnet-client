import { useEffect } from 'react';
import { withRouter } from 'react-router';

import { Library } from 'constants/language';
import { USER } from 'constants/constants';
import { CheckIsExceptionPath } from 'functions/user';
import { IS_SIGN } from 'functions/content';
import Aside from 'common/aside/aside';
import Header from 'common/header/header';
import Footer from 'common/footer/footer';
import Main from 'common/routes/routes';

import './App.css';
import styled from 'styled-components';

const SApp = styled.div`
  	display: grid;
    grid-template-areas: ${props => props.isSign ? '"header" "main" "footer"' : '"aside header" "aside main" "footer footer"'};
    grid-template-rows: 7vh 1fr 7vh;
    grid-template-columns: ${props => props.isSign ? '1fr' : '2fr 8fr'};
    min-height: 100vh;

	@media screen and (max-width: 600px) {
		& {
			grid-template-areas: "aside" "header" "main" "footer";
			grid-template-columns: 1fr;
			grid-template-rows: 0 7vh 1fr 7vh;
		}
	}
`;

const App = ({history}) => {
	const isSign = IS_SIGN();

	useEffect(()=> {
		if (USER.status === "online") {
			if (isSign) {
				history.push("/");
			}
		} else if (!CheckIsExceptionPath()) {
			history.push('/'+Library.getText('common.routes.signs.sign')+'/'+Library.getText('common.routes.signs.in'));
		}
	}, [history, isSign]);

	return (
		<SApp isSign={isSign}>
			{
				isSign 
					? null 
					: <Aside />
			}
			<Header isSign={isSign} />
			<Main 	isSign={isSign} />
			<Footer />
		</SApp>
	)
}

export default withRouter(App);