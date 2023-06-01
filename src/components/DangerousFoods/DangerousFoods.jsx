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
import FastfoodIcon from '@mui/icons-material/Fastfood';




const DangerousFoods = () => {
    const dispatch = useDispatch();
    const dangerousFoods = useSelector((store) => store.dangerousfoods);
    const [specificFoodId, setSpecificFoodId] = useState(null);
    const [newFoodName, setNewFoodName] = useState('');
    const [newFoodDetails, setNewFoodDetails] = useState('');
    const [newFoodSymptoms, setNewFoodSymptoms] = useState('');

    useEffect(() => {
        fetchDangerousFoods();
    }, []);

    const fetchDangerousFoods = () => {
        axios
            .get('/api/dangerousfoods')
            .then((response) => {
                dispatch({ type: 'SET_DANGEROUS_FOODS', payload: response.data });
            })
            .catch((error) => {
                console.log('Error fetching dangerous foods:', error);
            });
    };

    const deleteDangerousFood = (id) => {
        if (window.confirm('Are you sure you want to delete this food?'))
        axios
            .delete(`/api/dangerousfoods/${id}`)
            .then(() => {
                fetchDangerousFoods();
            })
            .catch((error) => {
                console.log('Error deleting dangerous food:', error);
            });
    };

    const toggleDetails = (foodId) => {
        if (specificFoodId === foodId) {
            setSpecificFoodId(null);
        } else {
            setSpecificFoodId(foodId);
        }
    };

    const addDangerousFood = () => {
        const newFood = {
            name: newFoodName,
            details: newFoodDetails,
            symptoms: newFoodSymptoms,
        };
        axios.post('/api/dangerousfoods', newFood)
            .then(() => {
                fetchDangerousFoods();
                setNewFoodName('');
                setNewFoodDetails('');
                setNewFoodSymptoms('');
            }).catch((error) => {
                console.log('Error adding dangerous foods:', error)
            })
    }




    return (
        <div>
            <h1 style={{ textAlign: 'center' }} >
                Dangerous Foods
            </h1>
            <Box display="flex" alignItems="center" justifyContent="center" marginBottom="20px">

            {/* <form onSubmit={addDangerousFood}> */}
                <TextField
                    label="Food Name"
                    value={newFoodName}
                    onChange={(e) => setNewFoodName(e.target.value)}
                    style={{ fontSize: '16px', padding: '8px', width: '200px' }}
                    required
                />
                <TextField
                    label="Food Details"
                    value={newFoodDetails}
                    onChange={(e) => setNewFoodDetails(e.target.value)}
                    style={{ fontSize: '16px', padding: '8px', width: '200px' }}
                    required
                />
                <TextField
                    label="Food Symptoms"
                    value={newFoodSymptoms}
                    onChange={(e) => setNewFoodSymptoms(e.target.value)}
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
                    onClick={addDangerousFood}>
                    Add Food
                </Button>
            </Box>
            <List>
                {dangerousFoods.map((food) => (
                    <List key={food.id} >
                        <Card sx={{ width: '100%' }}>
                            <ListItem onClick={() => toggleDetails(food.id)}>
                                <ListItemIcon>
                                    <FastfoodIcon />
                                </ListItemIcon>
                                <ListItemText
                                    primaryTypographyProps={{
                                        variant: 'h9',
                                        fontWeight: 'bold',
                                    }}
                                    primary={food.name} />
                                {specificFoodId === food.id ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                            </ListItem>
                            <Collapse in={specificFoodId === food.id} timeout="auto" unmountOnExit>
                                <CardContent>
                                    <Typography variant="body1" color="text.secondary" paragraph>
                                        <strong>Details:</strong> {food.details}
                                    </Typography>
                                    <Typography variant="body1" color="text.secondary" paragraph>
                                        <strong>Symptoms:</strong> {food.symptoms}
                                    </Typography>
                                    <Button
                                        variant="contained"
                                        color="error"
                                        startIcon={<DeleteIcon />}
                                        onClick={() => deleteDangerousFood(food.id)}
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

export default DangerousFoods;

