import { useEffect, useState } from "react";
import { Typography, Container, Paper, Button, Grid, Divider } from "@mui/material";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { grey } from '@mui/material/colors'
import HomeIcon from '@mui/icons-material/Home';
import { URL } from "./Constants";

const AnswerList = () => {

    const [survey, setSurvey] = useState([]);
    const { id } = useParams();
    const [loading, setLoading] = useState(true);

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
                <Typography sx={{ marginBottom: 1 }} variant="h2">{survey.name}</Typography>
                <Divider variant="middle" />

                {
                    loading ? <p>Loading</p> : (
                        <>
                            {
                                survey.questions.map((question, index) => {
                                    return (
                                        <Grid key={index} sx={{ marginBottom: 3, marginTop: 1 }}>
                                            <Typography variant="h6">{question.questionText}</Typography>
                                            <Link to={`questionanswers/${question.id}`}>
                                                <Button variant="contained">Näytä vastaukset</Button>
                                            </Link>
                                            {/**        { 
                                                question.answer.map((answer, index) => {
                                                    return (
                                                        <Typography key={index}>{answer.answer}</Typography>
                                                    )
                                                })
                                            }*/}
                                        </Grid>
                                    )
                                })
                            }
                        </>
                    )
                }
                <Link to={`/`}>
                    <Button sx={{ marginTop: 5, marginBottom: 2 }} startIcon={<HomeIcon />} variant="contained">Takaisin etusivulle</Button>
                </Link>

            </Container>
        </Paper>
    )
}

export default AnswerList