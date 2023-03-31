import React, { Component } from "react";
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Form,
    FormGroup,
    Label

} from "reactstrap";

export default class ModalTask extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeItem: this.props.activeItem
        };
    }

    render() {

        console.log(this.props.activeItem)
        return (
            <Modal isOpen={this.props.modalOpen} toggle={this.props.toggleModalTask} className={this.props.className}>
                <ModalHeader toggle={this.toggle} style={{textTransform:'uppercase'}}>{this.props.activeItem.title}</ModalHeader>
                <ModalBody>
                    <div className="list-group list-group-flush">
                        <div className="author list-group-item">Author: {this.props.activeItem.author}</div>
                        <div className="assigned list-group-item">Assigned to: {this.props.activeItem.assigned_to}</div>
                        <div className=" list-group-item" >Description: {this.props.activeItem.description} </div>
                        <div className="created list-group-item">Created: {this.props.activeItem.created}</div>
                        <div className="due-date list-group-item">Due date: {this.props.activeItem.due_date}</div>
                        <div className="complete list-group-item">Complete: {this.props.activeItem.completed}</div>
                    </div>
                </ModalBody>
                <ModalFooter>
                <Button color="secondary" onClick={this.props.toggleModalTask}>Close</Button>
                </ModalFooter>
            </Modal>
        );
    }
}