import React from "react"
import {Row} from "reactstrap"
import Books from "../pages/Books"
import Carousel from "../components/Carousel";
function Content () {
    return (
        <main className="content">
            <Carousel />
            <h4 className="mt-3" >List Book</h4>
            <Row>
                <Books />
            </Row>
        </main>
    )
}
export default Content