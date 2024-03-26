import React, { useState } from 'react';
import {Modal, Button, Form, Alert} from 'react-bootstrap';
import {setCredentials} from "../slices/authSlice.js";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";
import {useCreateFileMutation} from "../slices/fileSlice.js";

const UploadModal = ({ showModal, handleClose, handleUploadSuccess}) => {
    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const navigate = useNavigate();

    const [createFile, { isLoading}] = useCreateFileMutation();


    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        const allowedTypes = ['text/csv', 'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'];

        if (selectedFile && allowedTypes.includes(selectedFile.type)) {
            setFile(selectedFile);
            setFileName(selectedFile.name);
            setError('');
        } else {
            setFile(null);
            setFileName('');
            setError('Only CSV and Excel files are allowed.');
        }
    };



    const handleSubmit = async () => {
        if (file && name) {
            setIsSubmitting(true);
            try {
                const formData = new FormData();

                formData.append('name', name);
                formData.append('file', file);

                const res = await createFile(formData).unwrap();
                handleUploadSuccess();
                navigate('/');
            } catch (err) {
                toast.error(err?.data?.non_field_errors.at(0) || err.error);
            }
            setFile(null);
            setFileName('');
            setError('');
            setName('');
            setIsSubmitting(false);

            handleClose();
        } else {
            setError('Please select a file and give its name');
        }
    };

    const handleCloseModal = () => {
        setFile(null);
        setFileName('');
        setName('');
        setError('');

        handleClose(); // Close the modal
    };

    const isFormValid = file && name && !isSubmitting;

    return (
        <Modal show={showModal} onHide={ handleCloseModal}>
            <Modal.Header closeButton>
                <Modal.Title>Upload File</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className='my-2' controlId='name'>
                        <Form.Label>File Name</Form.Label>
                        <Form.Control
                            type='name'
                            placeholder='Enter file name'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        ></Form.Control>
                    </Form.Group>
                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>Select File:</Form.Label>
                        <Form.Control type="file" onChange={handleFileChange} required/>
                    </Form.Group>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <p>Selected File: {fileName}</p>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={ handleCloseModal}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleSubmit} disabled={!isFormValid || isLoading}>
                    {isLoading ? 'Uploading...' : 'Upload'}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default UploadModal;
