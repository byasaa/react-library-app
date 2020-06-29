import React from "react"
import {Row} from "reactstrap"
import Books from "../pages/Books"
function Content () {
    return (
        <main className="content">
            <h4>List Book</h4>
            <Row>
                <Books />
            </Row>
        </main>
    )
}
export default Content