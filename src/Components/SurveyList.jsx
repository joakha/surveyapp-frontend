import { useState, useEffect } from "react";
import { Box, Container, Typography, AppBar } from '@mui/material'
import SurveyCard from "./SurveyCard";
import { URL } from "./Constants";

const SurveyList = () => {

    const [surveys, setSurveys] = useState([])

    useEffect(() => {

        const fetchSurveys = async () => {

            try {
                const response = await fetch(`${URL}/surveys`);
                const data = await response.json();
                setSurveys(data);
            }
            catch (error) {

                console.error(error);
            }
        }
        fetchSurveys();
    }, [])

    return (

        <Container>
            <AppBar position="static" sx={{ backgroundColor: '#0079c2', marginBottom: 5, paddingTop: 9, textAlign: 'center' }}>
                <Typography variant="h3" sx={{ marginBottom: 0.5 }}>Haaga-Helian kyselyt</Typography>  
                <img src={('data:image/png;base64,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')} alt="hh-logo" 
                height={100} width={200} />
          
            </AppBar>
            {
                surveys.map((survey, index) =>
                    <Box key={index} >
                        <SurveyCard survey={survey} />
                    </Box>

                )

            }
        </Container>

    )
}

export default SurveyList