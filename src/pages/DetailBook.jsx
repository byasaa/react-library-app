import React, { Component } from "react"
import detailStyle from '../styles/detail.module.css'
import { Container } from "reactstrap"

class DetailBook extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showModalUpdate : false,
            showModalDelete : false,
            showModalLoan : false,
            book : []
        }
    }
    componentDidMount(){
        console.log('did mount')
    }
    handleDeleteBook = () => {

    }
    render() {
        return (
            <Container fluid>
            <div className={detailStyle.cover}>
                <div className={detailStyle.coverMini}></div>
                <Container>
                <div className="badge badge-warning" style={{  position:'absolute',top: '410px', }}>Novel</div>
                <div>
                    <h1 className={detailStyle.title}>{ this.props.match.params.bookName }</h1>
                    <p className={detailStyle.date}>21 Juni 2020</p>
                </div>
                <div>
                    <p className={detailStyle.decription}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Id sit voluptatibus quaerat suscipit vel deserunt pariatur dolorem asperiores placeat voluptas iusto, assumenda, eos blanditiis? Dolor dolorem culpa nam tenetur blanditiis?</p>
                </div>
                </Container>
            </div>
            </Container>
        )
    }
}

export default DetailBook