import React, { Component } from "react"
import detailStyle from '../styles/detail.module.css'

class DetailBook extends Component {
    constructor(props) {
        super(props)
        console.log(this.props)
    }
    render() {
        return (
            <div className={detailStyle.cover}>
                <div className={detailStyle.coverMini}></div>
                <div className="badge badge-warning" style={{  position:'absolute',left: '104px',top: '410px', }}>Novel</div>
                <div>
                    <h1 className={detailStyle.title}>{ this.props.match.params.bookName }</h1>
                    <p className="date">21 Juni 2020</p>
                </div>
                <div>
                    <p className={detailStyle.decription}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Id sit voluptatibus quaerat suscipit vel deserunt pariatur dolorem asperiores placeat voluptas iusto, assumenda, eos blanditiis? Dolor dolorem culpa nam tenetur blanditiis?</p>
                </div>
            </div>
        )
    }
}

export default DetailBook