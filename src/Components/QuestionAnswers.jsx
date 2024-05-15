import { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import { Typography, Container, Paper, Button, Grid, Divider } from "@mui/material";
import { PieChart } from '@mui/x-charts/PieChart';
import { Link } from "react-router-dom";
import _ from 'lodash';
import { URL } from './Constants';

const QuestionAnswers = () => {

    const [loading, setLoading] = useState(true);
    const [question, setQuestion] = useState([])
    const [chartData, setChartData] = useState([])
    const { id } = useParams();

    const fetchQuestion = async (id) => {

        try {
            const response = await fetch(`${URL}/question/${id}`);
            const data = await response.json();
            setQuestion(data);
            formatQuestionData(data);


        }
        catch (error) {
            console.error(error);
        }
    }

    const formatQuestionData = (questionData) => {

        const answerData = [];
        const answersGroupedByName = _.groupBy(questionData.answer, (answer) => answer.answer);
        const groupedAnswerArrays = Object.values(answersGroupedByName);

        groupedAnswerArrays.forEach((OptionObjects) => {

            const length = OptionObjects.length;
            answerData.push(

                {
                    value: length,
                    label: `${OptionObjects[0].answer}`
                }
            )
        })

        setChartData(answerData);
        setLoading(false);
    }

    useEffect(() => {

        fetchQuestion(id);

    }, [])

    return (
        <Paper sx={{ paddingBottom: 2 }}>
            <Container>
                <Typography variant="h6">{question.questionText}</Typography>
                {
                    loading ? <p>Loading</p> : (
                        <>

                            {question.type === "radiobutton" &&
                                <PieChart
                                    series={[
                                        {
                                            data: chartData
                                        },
                                    ]}
                                    width={600}
                                    height={200}
                                />
                            }

                            {question.type !== "radiobutton" &&
                                <>

                                    {
                                        question.answer.map((answer, index) => {
                                            return (
                                                <Grid key={index} sx={{ marginLeft: 10, marginBottom: 0 }}>{answer.answer}</Grid>
                                            )
                                        })
                                    }

                                </>
                            }

                            <Link to={`/answerlist/${question.survey.id}`}>
                                <Button sx={{ marginLeft: 10, marginTop: 2 }} variant="contained">Takaisin kysymyslistaan</Button>
                            </Link>
                        </>
                    )
                }
            </Container>
        </Paper>
    )
}

export default QuestionAnswers