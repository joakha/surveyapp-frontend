import { AppBar, Paper, TextField, Typography, Container, Grid, Button, InputLabel, RadioGroup, Radio, FormControlLabel, Link } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { grey } from '@mui/material/colors'
import { URL } from './Constants';

const AnswerForm = () => {
    const navigate = useNavigate();
    const [survey, setSurvey] = useState([]);
    const [loading, setLoading] = useState(true);
    const { id } = useParams();
    const [answers, setAnswers] = useState({});

    const handleInputChange = (e) => {
        setAnswers({ ...answers, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        navigate('/')
        e.preventDefault();

        console.log(answers)

        try {

            const response = fetch(`${URL}/saveanswers`, {

                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(answers)

            });

            if (!response.ok) {

                throw new Error("Failed to save answers!");

            }

        }

        catch (error) {

            console.error(error);

        }

    }

    useEffect(() => {

        const fetchSurveys = async (id) => {

            try {
                const response = await fetch(`${URL}/survey/${id}`);
                const data = await response.json();
                setSurvey(data);
                setLoading(false);
            }
            catch (error) {

                console.error(error);
            }
        }

        fetchSurveys(id);

    }, [])


    return (
        <Paper sx={{ backgroundColor: grey[50] }} elevation={3}>

            <Container>
                <AppBar position="static" sx={{ backgroundColor: '#0079c2', height: 130 }}>
                    <Typography variant="h2"
                        sx={{ textAlign: "center" }}>{survey.name}</Typography>
                </AppBar>
                <Typography variant="h4" sx={{ marginBottom: 4, marginTop: 4 }}>{survey.description}</Typography>

                {loading ? <p>Loading</p> : (

                    <form onSubmit={handleSubmit}>

                        {survey.questions.map((question, index) => {

                            if (question.type === "radiobutton") {
                                {
                                    return (
                                        <div key={index}>
                                            <Typography sx={{ marginTop: 2 }}>{question.questionText}</Typography>
                                            <RadioGroup name={`${question.id}`}>
                                                {question.options.map((option, index) => {
                                                    return (
                                                        <Grid key={index}>
                                                            <FormControlLabel control={<Radio />} value={`${option.optionText}`} label={option.optionText} onChange={handleInputChange} />
                                                        </Grid>
                                                    )
                                                })}
                                            </RadioGroup>
                                        </div>)
                                }

                            }

                            else {
                                return (
                                    <Grid style={{ display: "block" }} key={index}>
                                        <InputLabel>{question.questionText}</InputLabel>
                                        <TextField type='text' onChange={handleInputChange} name={`${question.id}`} sx={{ width: 600, marginBottom: 3 }} />
                                    </Grid>
                                )
                            }
                            //
                        }

                        )

                        }

                        <Link to='/'>
                            <Button sx={{ marginTop: 5, marginBottom: 2 }} variant="contained" type='submit'>submit</Button>
                        </Link>
                    </form>

                )}

            </Container>
        </Paper>
    )
}

export default AnswerForm