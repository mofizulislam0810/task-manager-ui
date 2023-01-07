import axios from 'axios';
import moment from 'moment/moment';
import React, { useEffect, useState } from 'react';
import { Badge, Button, Col, Container, Row, Table } from 'react-bootstrap';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { toast } from 'react-toastify';
import { apiEndPoint } from '../common/apiEndPoint';
import ModalForm from '../components/modalForm';

const Home = () => {
    const [taskList, setTaskList] = useState([]);
    const [filteTaskList, setFilterTaskList] = useState([]);
    const [formData, setFormData] = useState({
        name: "",
        prority: "High",
        userId: "",
        date: ""
    });
    const [formEditData, setEditFormData] = useState({
        name: "",
        prority: "High",
        userId: "",
        date: ""
    });
    const [modalShow, setModalShow] = useState(false);


    useEffect(() => {
        getTaskList()
    }, [])


    // get all task list function
    const getTaskList = async () => {
        try {
            const response = await axios.get(apiEndPoint.taskApi);
            setTaskList(await response.data);
            setFilterTaskList(await response.data);
        } catch (error) {
            toast.error("Something was wrong..");
        }

    };



    // from submit function
    const handleSubmitForm = (e) => {
        const submitData = async () => {
            try {
                const response = await axios.post(apiEndPoint.taskApi, formData);
                if (response.statusText === "Created") {
                    toast.success("Thanks! Task successfully created..");
                    setFormData({
                        name: "",
                        prority: "High",
                        userId: "",
                        date: ""
                    });
                    getTaskList();
                }
            } catch (error) {
                toast.error("Something was wrong..");
            }
        }
        submitData();
        e.preventDefault();
    }


    // delete task from list function
    const handleDelete = async (id) => {
        window.confirm("Are you sure for delete this data!")
        try {
            const response = await axios.delete(apiEndPoint.taskApi + '/' + id);
            if (response.data === '') {
                getTaskList();
                toast.success("Thanks! Task successfully deleted..");
            }
        } catch (error) {
            toast.error("Something was wrong..");
        }
    }

    // real searchable function for prority
    const handleSearchPrority = (e) => {
        if (e.target.value !== "") {
            setFilterTaskList(taskList?.filter(item => item.prority === e.target.value));
        } else {
            setFilterTaskList(taskList);
        }
    }

    // real searchable function for task
    const handleSearchTask = (e) => {
        if (e.target.value !== "") {
            setFilterTaskList(taskList?.filter(item => item.name.toLowerCase().includes(e.target.value.toLowerCase())));
        } else {
            setFilterTaskList(taskList);
        }
    }


    return (
        <Container className='my-5 bg-light'>
            <Row className="justify-content-md-center">
                <Col md={2}>
                </Col>
                <Col md={8} className="py-2">
                    <form onSubmit={handleSubmitForm}>
                        <Row>
                            <div className='pt-3'>
                                <p>Task Create Form : </p>
                            </div>
                            <Col md={12}>
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
                            </Col>
                            <Col md={12}>
                                <FloatingLabel
                                    controlId="floatingInput"
                                    label="Date"
                                    className="mb-3"
                                >
                                    <Form.Control type="date" placeholder="date" value={formData.date}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                date: e.target.value,
                                            })
                                        } required />
                                </FloatingLabel>
                            </Col>
                            <Col md={12}>
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
                            </Col>
                            <Col md={12}>
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
                            </Col>
                            <Col md={12}>
                                <Button type='submit' variant="outline-primary" size="lg" >Save</Button>
                            </Col>
                        </Row>
                    </form>
                </Col>
                <Col md={2}>
                </Col>
            </Row>
            <Row>
                <Col md={2}>
                </Col>
                <Col md={8} className="pb-3 mb-5">
                    <Container className='mt-2'>
                        <div className='py-3'>
                            <p>Task List : </p>
                        </div>
                        <Row className='justify-content-end'>
                            <Col md={6}>
                                <FloatingLabel controlId="floatingSelect" label="Prority search" className="mb-3">
                                    <Form.Select aria-label="Floating label select example"
                                        onChange={(e) => handleSearchPrority(e)}>
                                        <option value="" selected>All</option>
                                        <option value="High">High</option>
                                        <option value="Medium">Medium</option>
                                        <option value="Low">Low</option>
                                    </Form.Select>
                                </FloatingLabel>
                            </Col>
                            <Col md={6}>
                                <FloatingLabel
                                    controlId="floatingInput"
                                    label="Task search"
                                    className="mb-3"
                                >
                                    <Form.Control type="text" placeholder="tesk-search"
                                        onChange={(e) =>
                                            handleSearchTask(e)
                                        } />
                                </FloatingLabel>
                            </Col>
                        </Row>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Sl</th>
                                    <th>Task Name</th>
                                    <th>Date</th>
                                    <th>Prority</th>
                                    <th>User Name</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    filteTaskList?.map((item, idx) => {
                                        return (
                                            <tr key={idx}>
                                                <td>{idx + 1}</td>
                                                <td>{item.name}</td>
                                                <td>{moment(item.date).format(
                                                    "DD-MM-YYYY"
                                                )}</td>
                                                <td>{item.prority === "High" ? <Badge bg="danger">
                                                    {item.prority}
                                                </Badge> : item.prority === "Medium" ? <Badge bg="warning" text="dark">
                                                    {item.prority}
                                                </Badge> : <Badge bg="info">
                                                    {item.prority}
                                                </Badge>}</td>
                                                <td>{item.userId}</td>
                                                <td>
                                                    <Button variant="outline-primary" className="me-1"
                                                        onClick={() => {
                                                            setModalShow(true);
                                                            setEditFormData(item)
                                                        }}>Edit</Button>
                                                    <Button variant="outline-primary" onClick={() => handleDelete(item.id)}>Delete</Button></td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </Table>
                    </Container>
                </Col>
                <Col md={2}>
                </Col>
            </Row>
            <ModalForm show={modalShow} onHide={() => setModalShow(false)} formData={formEditData} setFormData={setEditFormData} getTaskList={getTaskList} />
        </Container>
    );
};

export default Home;