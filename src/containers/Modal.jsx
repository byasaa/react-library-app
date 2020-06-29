import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Input, Label, FormText } from 'reactstrap';

const Modals = (props) => {
        const {
          className,
          modalShow,
          toggle
        } = props;
      
        return (
            <div>
              <Modal isOpen={modalShow} toggle={toggle} className={className}>
                <ModalHeader toggle={toggle}>Modal title</ModalHeader>
                <ModalBody>
                <Form>
                      <FormGroup>
                          <Label>Title</Label>
                          <Input type='text' placeholder='Title' />
                      </FormGroup>
                      <FormGroup>
                          <Label>Description</Label>
                          <Input type='textarea' placeholder='Title' />
                      </FormGroup>
                      <FormGroup>
                      <Label>Author</Label>
                        <Input type="select" name="author" >
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                        </Input>
                      </FormGroup>
                      <FormGroup>
                      <Label>Genre</Label>
                        <Input type="select" name="genre" >
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                        </Input>
                      </FormGroup>
                      <FormGroup>
                        <Label for="exampleFile">Image</Label>
                        <Input type="file" name="file" id="exampleFile" />
                        <FormText color="muted">
                        This is some placeholder block-level help text for the above input.
                        It's a bit lighter and easily wraps to a new line.
                        </FormText>
                    </FormGroup>
                  </Form>
                
                </ModalBody>
                <ModalFooter>
                  <Button color="primary" onClick={toggle}>Do Something</Button>{' '}
                  <Button color="secondary" onClick={toggle}>Cancel</Button>
                </ModalFooter>
              </Modal>
            </div>
          );
}

export default Modals