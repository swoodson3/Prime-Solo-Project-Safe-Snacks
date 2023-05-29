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
} from '@mui/material';
import { Delete as DeleteIcon, ExpandMore as ExpandMoreIcon, ExpandLess as ExpandLessIcon } from '@mui/icons-material';
import FastfoodIcon from '@mui/icons-material/Fastfood';




const DangerousFoods = () => {
    const dispatch = useDispatch();
    const dangerousFoods = useSelector((store) => store.dangerousfoods);
    const [specificFoodId, setSpecificFoodId] = useState(null);

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



      
    return (
        <div>
            <h1 style={{ textAlign: 'center' }} >
                Dangerous Foods
            </h1>
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
                                        variant: 'h5',
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

