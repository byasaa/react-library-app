import React, { Component } from 'react'
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap'
import AddUpdateForm from './AddUpdateForm';

class ModalForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            modal : false
        }
    }
    toggle = () => {
        this.setState({
            modal : !this.state.modal
        })
    }
    render() {
        const {
            buttonLabel,
            className
        } = this.props
        const toggle = this.toggle
        const modal = this.state.modal
        const closeBtn = <button className="close" onClick={this.toggle}>&times;</button>
        const label = buttonLabel
        let button = ''
        let title = ''

        if(label === 'Edit'){
            button = <Button
                    color="warning"
                    onClick={this.toggle}
                    style={{float: "left", marginRight:"10px"}}>{label}
                    </Button>
            title = 'Edit Item'
        } else {
            button = <Button
                    color="success"
                    onClick={this.toggle}
                    style={{float: "left", marginRight:"10px"}}>{label}
                    </Button>
            title = 'Add New Item'
        }
        return (
            <>
                {button}
                <Modal isOpen={modal} toggle={toggle} className={className}>
                    <ModalHeader toggle={toggle} close={closeBtn}>{title}</ModalHeader>
                    <ModalBody>
                        <AddUpdateForm 
                            
                        />
                    </ModalBody>
                </Modal>
            </>
        )
    }
}

export default ModalForm
