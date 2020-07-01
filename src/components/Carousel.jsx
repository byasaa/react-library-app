import React, { Component } from 'react'
import Slider from "react-slick"
import axios from "axios"
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

class Carousel extends Component {
    constructor(){
        super()
        this.state = {
            book : []
        }
    }
    getData = () => {
        const token = localStorage.getItem('token')
        axios({
            method : 'GET',
            url: 'http://localhost:3000/api/books?limit=3',
            headers : {
                Authorization : token
            }

        })
        .then((res)=>{
            this.setState({
                book: res.data.data
            })
        })
        .catch((err) => {
            console.log(err)
        })
    }
    componentDidMount() {
        this.getData()
    }
    render() {
        const settings = {
            className: "center slick-slider",
            centerMode: true,
            infinite: true,
            centerPadding: "60px",
            slidesToShow: 2,
            speed: 500,
            width : true
          };
        return (
            <div className="container">
                <Slider {...settings}>
                    { this.state.book.map((book) => {
                        return <div key={book.id} style={{ boxSizing: 'border-box'  }}>
                            <img src={`${process.env.REACT_APP_API_URL}/img/${book.image}`} alt={book.title} />
                        </div>
                    })
                    }
                </Slider>
            </div>
        )
    }
}

export default Carousel