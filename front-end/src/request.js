const BACKEND_URL = 'http://localhost:3001/';

const makeAPICall = async () => {
    try {
        const response = await fetch(BACKEND_URL, {mode:'cors'});
        const data = await response.json();
        console.log({ data })
    }
    catch (e) {
       console.error(e)
    }
}