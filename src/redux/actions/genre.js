import axios from "axios";

export const getGenre = (token) => {
    return {
        type : 'GET_GENRE',
        payload : axios({
            method : 'GET',
            url : process.env.REACT_APP_API_URL + 'genres/',
            headers : {
                Authorization : token
            }
        })
    }
}

export const getDetailGenre = (id, token) => {
    return {
        type : 'GET_DETAIL_GENRE',
        payload : axios({
            method : 'GET',
            url : process.env.REACT_APP_API_URL + 'genres/' + id,
            headers : {
                Authorization : token
            }
        })
    }
}

export const postAddGenre = (data, token) => {
    return {
        type : 'POST_ADD_GENRE',
        payload : axios({
            method : "POST",
            url : process.env.REACT_APP_API_URL + 'genres/',
            data: data,
            headers : {
                Authorization : token
            }
          })
    }
}

export const putUpdateGenre = (id, data, token) => {
    return {
        type : 'PUT_UPDATE_GENRE',
        payload : axios({
            method : "PUT",
            url : process.env.REACT_APP_API_URL + 'genres/' + id,
            data : data,
            headers : {
                Authorization : token
            }
          })
    }
}

export const deleteGenre = (id, token) => {
    return {
        type : 'DELETE_GENRE',
        payload : axios({
            method : "DELETE",
            url : process.env.REACT_APP_API_URL + 'genres/' + id,
            headers : {
                Authorization : token
            }
        })
    }
}