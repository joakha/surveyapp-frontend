import { Card, CardHeader, Button } from '@mui/material'
import { grey } from '@mui/material/colors';
import { Link } from 'react-router-dom';

const SurveyCard = (props) => {
    return (
        <>
            <Card style={{ width: 600, height: 'auto', backgroundColor: grey[100], marginBottom: 20 }}>
                <CardHeader title={props.survey.name} subheader={props.survey.description} />
                <Link to={`answerform/${props.survey.id}`}  >
                    <Button sx={{ marginLeft: 2, marginBottom: 2 }} variant="contained">Avaa</Button>
                </Link>
                <Link to={`answerlist/${props.survey.id}`}>
                    <Button sx={{ marginLeft: 2, marginBottom: 2 }} variant="contained">Näytä vastaukset</Button>
                </Link>
            </Card>
        </>
    )
}

export default SurveyCard