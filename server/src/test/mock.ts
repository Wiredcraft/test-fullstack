import axios from "axios";

export const mockLogin = () => {
	jest.spyOn(axios, 'post').mockResolvedValue({
		data: {
			access_token: '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',
			token_type: 'bearer',
			scope: 'user:email'
		}
	});

	jest.spyOn(axios, 'get').mockResolvedValue({
		data: [{
			email: 'selected@selected.com',
			primary: true,
			verified: true,
			visibility: 'private'
		},
		{
			email: 'test.noreply.github.com',
			primary: false,
			verified: true,
			visibility: null
		},
		{
			email: 'test@test.br',
			primary: false,
			verified: true,
			visibility: null
		}]
	});
}

export const mockLoginErrorAuth = () => {
	jest.spyOn(axios, 'post').mockRejectedValueOnce('ERROR_TEST');

	jest.spyOn(axios, 'get').mockResolvedValue({
		data: [{
			email: 'selected@selected.com',
			primary: true,
			verified: true,
			visibility: 'private'
		},
		{
			email: 'test.noreply.github.com',
			primary: false,
			verified: true,
			visibility: null
		},
		{
			email: 'test@test.br',
			primary: false,
			verified: true,
			visibility: null
		}]
	});
}

export const mockLoginErrorGetEmail = () => {
	jest.spyOn(axios, 'post').mockResolvedValue({
		data: {
			access_token: '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',
			token_type: 'bearer',
			scope: 'user:email'
		}
	});

	jest.spyOn(axios, 'get').mockRejectedValueOnce('ERROR_TEST')
}