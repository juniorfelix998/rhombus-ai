import React, {useEffect, useState} from 'react';
import Hero from '../components/Hero.jsx';
import File from '../components/File.jsx';
import { useGetFilesQuery } from '../slices/fileSlice.js';
import { Col, Row, Button, Alert } from 'react-bootstrap';
import Loader from '../components/Loader.jsx';
import { useSelector } from 'react-redux';
import UploadModal from '../components/UploadModal.jsx'; // Import the modal component

const HomeScreen = () => {
    const { userInfo } = useSelector((state) => state.auth);
    const { data, isLoading, error, refetch } = useGetFilesQuery(userInfo);

    useEffect(() => {
        if (userInfo) {
            refetch();
        }
    }, [userInfo, refetch]);

    const [showModal, setShowModal] = useState(false);

    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);

    const handleUploadSuccess = () => {
        handleClose();
        refetch();
    };

    return (
        <>
            {!userInfo ? (
                <>
                    <Hero />
                </>
            ) : (
                <>
                    <h1>File Details</h1>
                    {isLoading ? (
                        <Loader />
                    ) : data && data.files_data && data.files_data.results.length > 0 ? (
                        <>
                            <div className="mb-4">
                                <Row xs={1} md={2} lg={3} xl={4}>
                                    {data.files_data.results.map((file) => (
                                        <Col key={file.id} className="mb-4">
                                            <File file={file} />
                                        </Col>
                                    ))}
                                </Row>
                            </div>
                        </>
                    ) : (
                        <Alert variant="info">No files available.</Alert>
                    )}
                    <Button variant="primary" onClick={handleShow}>
                        Upload File
                    </Button>
                    <UploadModal showModal={showModal} handleClose={handleClose} handleUploadSuccess={handleUploadSuccess}/>
                </>
            )}
        </>
    );
};

export default HomeScreen;
