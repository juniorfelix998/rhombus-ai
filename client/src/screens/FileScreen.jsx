import React, { useState } from 'react';
import {Link, useParams} from 'react-router-dom';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import {useGetFileDetailsQuery} from "../slices/fileSlice.js";
import Loader from "../components/Loader.jsx";
import Message from "../components/Message.jsx";

const FileDetailPage = () => {
    const { id:fileId } = useParams();

    const [editedColumnTypes, setEditedColumnTypes] = useState({});
    const [showAllRows, setShowAllRows] = useState(false);

    const {
        data: responseData,
        isLoading,
        refetch,
        error,
    } = useGetFileDetailsQuery(fileId);

    const fileData = responseData?.files_data;


    const dataTypeMappings = {
        float64: 'Decimal Number',
        object: 'Text',
        datetime64: 'Date',
        int64: "Number",
        "datetime64[ns]": 'Date Time',
        category: 'Category'
    };

    const mapDataType = (dataType) => {
        return dataTypeMappings[dataType] || dataType;
    };


    const handleEdit = () => {
        // Convert the mapped values back to their original format before sending to the backend
        const formattedColumnTypes = {};
        Object.entries(editedColumnTypes).forEach(([column, value]) => {
            formattedColumnTypes[column] = Object.keys(dataTypeMappings).find(key => dataTypeMappings[key] === value) || value;
        });
        // Todo
        // Send formattedColumnTypes to the backend
        // Update fileData after successful edit
        // setFileData({ ...fileData, file_column_data_types: formattedColumnTypes });
    };

    const handleInputChange = (event, columnName) => {
        const { value } = event.target;
        setEditedColumnTypes(prevState => ({ ...prevState, [columnName]: value }));

    };

    return (
        <>
            <Link className='btn btn-light my-3' to='/'>
                Go Back
            </Link>
            {isLoading ? (<Loader/>) : error ? (<Message> {error.error} </Message>) :(
                <>
                    <Container className="mt-4">
                        <h2>File Details</h2>
                        <Row className="mt-4">
                            <Col xs={12} md={6}>
                                <Card>
                                    <Card.Body>
                                        <Card.Title>File Name: {fileData.name}</Card.Title>
                                        <Card.Text>
                                            <strong>File URL:</strong> <a href={fileData.file} target="_blank" rel="noopener noreferrer">Get File</a><br />
                                            <strong>Uploaded at:</strong> {new Date(fileData.created_at).toLocaleString()}<br />
                                            <strong>Upload Success:</strong> {fileData.is_upload_success ? 'Yes' : 'No'}
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col xs={12} md={6}>
                                <Card>
                                    <Card.Body>
                                        <Card.Title>File Column Data Types</Card.Title>
                                        <Form>
                                            {Object.entries(fileData.file_column_data_types).map(([column, dataType], index) => (
                                                <Form.Group key={column} controlId={`columnType-${column}`} style={{ display: index < 4 || showAllRows ? 'block' : 'none' }}>
                                                    <Form.Label>{column}</Form.Label>
                                                    <Form.Control
                                                        as="select"
                                                        value={mapDataType(dataType)}
                                                        onChange={(e) => handleInputChange(e, column)}
                                                    >
                                                        {Object.values(dataTypeMappings).map((mappedType) => (
                                                            <option key={mappedType} value={mappedType}>{mappedType}</option>
                                                        ))}
                                                    </Form.Control>
                                                </Form.Group>
                                            ))}
                                        </Form>
                                        {!showAllRows && Object.entries(fileData.file_column_data_types).length > 4 &&
                                            <Button variant="link" onClick={() => setShowAllRows(true)}>Show more</Button>
                                        }
                                        {showAllRows &&
                                            <Button variant="link" onClick={() => setShowAllRows(false)}>Show less</Button>
                                        }
                                        <Button variant="primary" onClick={handleEdit} className="mt-2" disabled>Save Changes</Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </Container>
            </>) }
        </>

    );
};

export default FileDetailPage;

