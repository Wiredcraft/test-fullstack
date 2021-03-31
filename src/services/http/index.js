import Axios from "axios";
import Config from "@config";
import {
    checkData
} from "@services/common/helper";
import { getCookie } from "@services/common/helper";
export async function GetRequest(path, params = undefined) {
    let errorMessage = "";
    let success = false;
    try {
        let queryResult = await Axios.get(path, {
            params
        });

        if (queryResult.data.StatusCode == 200) {
            return {
                success: true,
                data: queryResult.data.Message
            }
        } else {
            errorMessage = queryResult.data.Message
        }
    } catch (e) {
        errorMessage = e.response.data.ErrorMessage;
    }
    return {
        success,
        errorMessage
    }
}


export async function PostRequest(path, params = undefined, authorization = "Basic a2VhdHMubGk6a2VhdHMubGk=") {
    let errorMessage = "";
    let success = false;
    params = {
            ...params,
        }
       
    try {
        let queryResult = await Axios({
            method: 'post',
            url: path,
            data: params,
            headers: {
                'Content-Type': "application/json",
                "Authorization": authorization
            }
        });
        if (queryResult.data.StatusCode == 200) {
            return {
                success: true,
                total: queryResult.data.Total,
                data: queryResult.data.Content,
            }
        } 
         else {
            success: false,
            errorMessage = queryResult.data.ErrorMessage
        }

    } catch (e) {
        success: false,
        errorMessage = e.response.data.ErrorMessage;
    }
    return {
        success,
        errorMessage
    }
}



