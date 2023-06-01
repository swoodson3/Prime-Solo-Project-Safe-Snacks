import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import {
    Typography,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Collapse,
    Card,
    CardContent,
    Button,
    TextField,
    Box
} from '@mui/material';
import { Delete as DeleteIcon, ExpandMore as ExpandMoreIcon, ExpandLess as ExpandLessIcon } from '@mui/icons-material';
import NatureIcon from '@mui/icons-material/Nature';

const DangerousPlants = () => {
    const dispatch = useDispatch();
    const dangerousPlants = useSelector((store) => store.dangerousplants);
    const [specificPlantId, setSpecificPlantId] = useState(null);
    const [newPlantName, setNewPlantName] = useState('');
    const [newPlantDetails, setNewPlantDetails] = useState('');
    const [newPlantSymptoms, setNewPlantSymptoms] = useState('');

    useEffect(() => {
        fetchDangerousPlants();
    }, []);

    const fetchDangerousPlants = () => {
        axios
            .get('/api/dangerousplants')
            .then((response) => {
                dispatch({ type: 'SET_DANGEROUS_PLANTS', payload: response.data });
            })
            .catch((error) => {
                console.log('Error fetching dangerous plants:', error);
            });
    };

    const deleteDangerousPlant = (id) => {
        if (window.confirm('Are you sure you want to delete this plant?'))
        axios
            .delete(`/api/dangerousplants/${id}`)
            .then(() => {
                fetchDangerousPlants();
            })
            .catch((error) => {
                console.log('Error deleting dangerous plant:', error);
            });
    };

    const toggleDetails = (plantId) => {
        if (specificPlantId === plantId) {
            setSpecificPlantId(null);
        } else {
            setSpecificPlantId(plantId);
        }
    };

    const addDangerousPlant = () => {
        const newPlant = {
            name: newPlantName,
            details: newPlantDetails,
            symptoms: newPlantSymptoms,
        };
        axios.post('/api/dangerousplants', newPlant)
            .then(() => {
                fetchDangerousPlants();
                setNewPlantName('');
                setNewPlantDetails('');
                setNewPlantSymptoms('');
            }).catch((error) => {
                console.log('Error adding dangerous plants:', error)
            })
    }

    return (
        <div>
            <h1 style={{ textAlign: 'center' }} >
                Dangerous Plants
            </h1>
            <Box display="flex" alignItems="center" justifyContent="center" marginBottom="20px">
                <TextField
                    label="Plant Name"
                    value={newPlantName}
                    onChange={(e) => setNewPlantName(e.target.value)}
                    style={{ fontSize: '16px', padding: '8px', width: '200px' }}
                    required
                />
                <TextField
                    label="Plant Details"
                    value={newPlantDetails}
                    onChange={(e) => setNewPlantDetails(e.target.value)}
                    style={{ fontSize: '16px', padding: '8px', width: '200px' }}
                    required
                />
                <TextField
                    label="Plant Symptoms"
                    value={newPlantSymptoms}
                    onChange={(e) => setNewPlantSymptoms(e.target.value)}
                    style={{ fontSize: '16px', padding: '8px', width: '200px' }}
                    required
                />
                <Button type="submit" variant="contained"
                    style={{
                        backgroundColor: "#00acb0",
                        color: "#fff",
                        fontSize: '16px',
                        padding: '5px',
                        width: '200px',
                        marginRight: '10px',
                        height: '50px'
                    }}
                    onClick={addDangerousPlant}>
                    Add Plant
                </Button>
            </Box>
            <List>
                {dangerousPlants.map((plant) => (
                    <List key={plant.id} >
                        <Card sx={{ width: '100%' }}>
                            <ListItem onClick={() => toggleDetails(plant.id)}>
                                <ListItemIcon>
                                    <NatureIcon />
                                </ListItemIcon>
                                <ListItemText
                                    primaryTypographyProps={{
                                        variant: 'h9',
                                        fontWeight: 'bold',
                                    }}
                                    primary={plant.name} />
                                {specificPlantId === plant.id ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                            </ListItem>
                            <Collapse in={specificPlantId === plant.id} timeout="auto" unmountOnExit>
                                <CardContent>
                                    <Typography variant="body1" color="text.secondary" paragraph>
                                        <strong>Details:</strong> {plant.details}
                                    </Typography>
                                    <Typography variant="body1" color="text.secondary" paragraph>
                                        <strong>Symptoms:</strong> {plant.symptoms}
                                    </Typography>
                                    <Button
                                        variant="contained"
                                        color="error"
                                        startIcon={<DeleteIcon />}
                                        onClick={() => deleteDangerousPlant(plant.id)}
                                    >
                                        Delete
                                    </Button>
                                </CardContent>
                            </Collapse>
                        </Card>
                    </List>
                ))}
            </List>
        </div>
    );
};

export default DangerousPlants;

