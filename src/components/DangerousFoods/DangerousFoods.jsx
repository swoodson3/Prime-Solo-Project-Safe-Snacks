import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

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
    }

    return (
        <div>
            <h2>Dangerous Foods</h2>
            <ul>
                {dangerousFoods.map((food) => (
                    <li key={food.id}>
                        <strong onClick={() => toggleDetails(food.id)} style={{ cursor: 'pointer' }}>
                            {food.name}
                        </strong>
                        {specificFoodId === food.id && (
                            <div>
                                <p>Details: {food.details}</p>
                                <p>Symptoms: {food.symptoms}</p>
                            </div>
                        )}
                        <button onClick={() => deleteDangerousFood(food.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default DangerousFoods;