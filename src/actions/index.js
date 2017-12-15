//backend api use Unofficial Hacker News API
//see more detail about https://github.com/cheeaun/node-hnapi/

const baseUrl = 'https://node-hnapi.herokuapp.com'

export const getPageData = (type, page) => 
	dispatch => {
		fetch(`${baseUrl}/${type}?page=${page}`)
			.then(res => res.json())
			.then(data => {
				dispatch(receiveData(`${type.toUpperCase()}_LIST`, data))
			})
	}

export const getItemData = (id) =>
	dispatch => {
		fetch(`${baseUrl}/item/${id}`)
			.then(res => res.json())
			.then(data => {
				dispatch(receiveData('STORY', data))
			})
	}

const receiveData = (type, data) => {
	return {
		type, data
	}
}	