import axios from 'axios'

export const getLoanBook = (id, token) => {
    return {
        type : "GET_LOAN_BOOK",
        payload: axios({
            method : "GET",
            url : process.env.REACT_APP_API_URL + 'loans/book/' + id,
            headers : {
                Authorization : token
            }
        })
    }
}

export const getLoanByUser = (id, token) => {
    return {
        type : "GET_LOAN_USER",
        payload: axios({
            method : "GET",
            url : process.env.REACT_APP_API_URL + 'loans/user/' + id,
            headers : {
                Authorization : token
            }
        })
    }
}