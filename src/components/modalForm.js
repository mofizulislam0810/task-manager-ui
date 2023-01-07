import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import axios from 'axios';
import { apiEndPoint } from '../common/apiEndPoint';
import { toast } from 'react-toastify';

const ModalForm = (props) => {
    const { formData, setFormData, getTaskList, onHide } = props;

    // edit task from list function
    const handleSubmitForm = (e) => {
        const submitData = async () => {
            try {
                const response = await axios.put(apiEndPoint.taskApi + '/' + formData.id, formData);
                if (response.data === '') {
                    setFormData({
                        name: "",
                        prority: "High",
                        userId: "",
                        date: ""
                    });
                    getTaskList();
                    onHide();
                    toast.success("Thanks! Task successfully edited..");
                }
            } catch (error) {

            }
        }
        submitData();
        e.preventDefault();
    }

    return (
        <Modal {...props}>
            <Modal.Header closeButton>
                <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <form onSubmit={handleSubmitForm}>
                <Modal.Body>
                    <Form>
                        <FloatingLabel
                            controlId="floatingInput"
                            label="Task name"
                            className="mb-3"
                        >
                            <Form.Control type="text" placeholder="tesk-name" value={formData.name}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        name: e.target.value,
                                    })
                                } required />
                        </FloatingLabel>
                        <FloatingLabel
                            controlId="floatingInput"
                            label="Date"
                            className="mb-3"
                        >
                            <Form.Control type="date" placeholder="date" value={formData.date.slice(0, 10)}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        date: e.target.value,
                                    })
                                } required />
                        </FloatingLabel>
                        <FloatingLabel controlId="floatingSelect" label="Prority" className="mb-3">
                            <Form.Select aria-label="Floating label select example" defaultValue={formData.prority}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        prority: e.target.value,
                                    })
                                } required>
                                <option value="High" selected>High</option>
                                <option value="Medium">Medium</option>
                                <option value="Low">Low</option>
                            </Form.Select>
                        </FloatingLabel>
                        <FloatingLabel
                            controlId="floatingInput"
                            label="User"
                            className="mb-3"
                        >
                            <Form.Control type="text" placeholder="user" value={formData.userId}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        userId: e.target.value,
                                    })
                                } required />
                        </FloatingLabel>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={props.onHide}>
                        Close
                    </Button>
                    <Button variant="primary" type='submit'>
                        Save
                    </Button>
                </Modal.Footer>
            </form>
        </Modal>
    );
};

export default ModalForm;