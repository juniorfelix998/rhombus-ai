import React from 'react';
import {useState} from 'react';
import {Container, Button, Table} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';


const dataTypeMappings = {
    float64: 'Decimal Number',
    object: 'Text',
    datetime64: 'Date',
    int64:"Number",
    "datetime64[ns]": 'Date'
    // Add more mappings as needed
};

const File = ({file}) => {
    const [showAll, setShowAll] = useState(false);

    // Extracting entries from file_column_data_types
    const fileColumnDataEntries = Object.entries(file.file_column_data_types);


    const mapDataType = (dataType) => {
        return dataTypeMappings[dataType] || dataType;
    };

    return (
        <Container className="mb-2">
            <h2 className="mb-2">{file.name}</h2>
            <div style={{overflowY: 'auto', maxHeight: '200px'}}>
                <Table striped bordered hover style={{tableLayout: 'fixed'}}>
                    <thead>
                    <tr>
                        <th style={{whiteSpace: 'nowrap'}}>Column name</th>
                        <th>Data type</th>
                    </tr>
                    </thead>
                    <tbody>
                    {showAll
                        ? fileColumnDataEntries.map(([key, value]) => (
                            <tr key={key}>
                                <td className="text-truncate" title={key}>{key}</td>
                                <td className="text-truncate" title={mapDataType(value)}>{mapDataType(value)}</td>
                            </tr>
                        ))
                        : fileColumnDataEntries.slice(0, 4).map(([key, value]) => (
                            <tr key={key}>
                                <td className="text-truncate" title={key}>{key}</td>
                                <td className="text-truncate" title={mapDataType(value)}>{mapDataType(value)}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
            <div className="mt-3">
                {fileColumnDataEntries.length > 4 && (
                    <Button onClick={() => setShowAll(!showAll)} className="mx-2">
                        {showAll ? "Show Less" : "Show More"}
                    </Button>
                )}
                <LinkContainer to={`/file/${file.id}`}>
                    <Button>View</Button>
                </LinkContainer>

            </div>

        </Container>
);
};

export default File;