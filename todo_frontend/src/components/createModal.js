import React, { Component } from "react";
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Form,
    FormGroup,
    Input,
    Label
} from "reactstrap";

export default class CustomModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeItem: this.props.activeItem
        };
    }
    handleChange = e => {
        let { name, value } = e.target;
        if (e.target.type === "checkbox") {
            value = e.target.checked;
        }
        const activeItem = { ...this.state.activeItem, [name]: value };
        this.setState({ activeItem });
    };
    render() {
        const { toggle, onSave } = this.props;
        return (
            <Modal isOpen={true} toggle={toggle}>
                <ModalHeader toggle={toggle}>Add New Task</ModalHeader>
                <ModalBody>
                    <Form className="list-group list-group-flush">
                        <FormGroup className="list-group-item">
                            <Label for="title">Title</Label>
                            <Input 
                              type="text"
                              name="title"
                              value={this.state.activeItem.title}
                              onChange={this.handleChange}
                              placeholder="Enter Todo Title"
                              style={{
                                border: "none",
                                boxShadow: "2px 2px 6px rgba(0, 0, 0, 0.25)"}}
                            />
                        </FormGroup>
                        <FormGroup className="list-group-item">
                            <Label for="description">Description</Label>
                            <Input
                            type="text"
                            name="description"
                            value={this.state.activeItem.description}
                            onChange={this.handleChange}
                            placeholder="Enter Todo description"
                            style={{
                                border: "none",
                                boxShadow: "2px 2px 6px rgba(0, 0, 0, 0.25)"}}
                            />
                        </FormGroup>

                        <FormGroup className="list-group-item">
                            <Label for="author">Author</Label>
                            <Input
                            type={"select"}
                            name="author"
                            value={this.state.activeItem.author}
                            onChange={this.handleChange}
                            style={{
                                border: "none",
                                boxShadow: "2px 2px 6px rgba(0, 0, 0, 0.25)"}}
                            >
                                <option value="" hidden>Select an author</option>
                                <option value={"John"}>John</option>
                                <option value={"Luke"}>Luke</option>
                                <option value={"Matthew"}>Matthew</option>
                                <option value={"Mark"}>Mark</option>
                            </Input>
                        </FormGroup>
                        <FormGroup className="list-group-item">
                            <Label for="assigned_to">Assigned to</Label>
                            <Input
                            type={"select"}
                            name="assigned_to"
                            value={this.state.activeItem.assigned_to}
                            onChange={this.handleChange}
                            style={{
                                border: "none",
                                boxShadow: "2px 2px 6px rgba(0, 0, 0, 0.25)"}}
                            >
                                <option value="" hidden>Appoint responsible</option>
                                <option value={"John"}>John</option>
                                <option value={"Luke"}>Luke</option>
                                <option value={"Matthew"}>Matthew</option>
                                <option value={"Mark"}>Mark</option>
                            </Input>
                        </FormGroup>
                        <FormGroup className="list-group-item">
                            <Label for="due_date">Due date</Label>
                            <Input
                            type="date"
                            name="due_date"
                            value={this.state.activeItem.due_date}
                            onChange={this.handleChange}
                            placeholder="Enter due date"
                            style={{
                                border: "none",
                                boxShadow: "2px 2px 6px rgba(0, 0, 0, 0.25)"}}
                            />
                        </FormGroup>
                        <FormGroup check className="list-group-item">
                            <Label for="completed">
                                <Input
                                type="checkbox"
                                name="completed"
                                checked={this.state.activeItem.completed}
                                onChange={this.handleChange}
                                style={{
                                    border: "none",
                                    boxShadow: "2px 2px 6px rgba(0, 0, 0, 0.25)"}}
                                />
                                Completed
                            </Label>
                        </FormGroup>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button color="success" onClick={() => onSave(this.state.activeItem)}>
                        Save
                    </Button>
                </ModalFooter>
            </Modal>
        );
    }
}
