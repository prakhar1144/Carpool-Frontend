import CardContent from '@mui/material/CardContent';
import Card from '@mui/material/Card';
import { CardHeader, Typography } from '@mui/material';
import Grid from '@mui/material/Grid'
import Divider from '@mui/material/Divider'
import Button from '@mui/material/Button'
import SendIcon from '@mui/icons-material/Send'

function Trialcard() {
  return (
<Grid item md={4} sm={6} xs={12}>
    <Card sx={{borderRadius:2, backgroundColor: "#f7f7f7"}} raised={true}>
        <CardContent align="center">
            <Typography  gutterBottom variant="h6"  sx={{ fontFamily:"inherit"}}>Hamirpur</Typography>
            {/* <Typography variant="caption" sx={{color:'text.secondary'}}>12/05/21</Typography> */}
            <Divider variant="middle" />
            <Grid container sx={{my:2, }}>
                <Grid item xs={6}>
                    <Typography  align="center" sx={{color:'text.secondary'}}>Departure</Typography>
                    <Typography variant="caption" align="center" sx={{color:'text.secondary'}}>7:45PM</Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography align="center" sx={{color:'text.secondary'}}>Members</Typography>
                    <Typography variant="caption" align="center" sx={{color:'text.secondary'}}>4/5</Typography>
                </Grid>
            </Grid>
            <Button variant="outlined" size="small" >
                Join
            </Button>   
        </CardContent>
    </Card>
</Grid>
  )
}

export default Trialcard;