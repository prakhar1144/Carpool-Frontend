import Fab from "@mui/material/Fab"
import Grid from "@mui/material/Grid"
import Container from "@mui/material/Container"
import { useParams } from "react-router";
import TextField from "@mui/material/TextField";
import Send from "@mui/icons-material/Send";
import Box from "@mui/material/Box";
import {useEffect, useState} from "react";
import ListItemText from '@mui/material/ListItemText';


let chatSocket;
const Chat = () => {
    const [Messages, setMessages] = useState([]);
    const [Message, setMessage] = useState({'message':'','name':''});
    const { id } = useParams();
    const name = localStorage.getItem("user_id");
    useEffect(() => {

            chatSocket = new WebSocket(
                'wss://'
                + 'api-carpool-c9f0.onrender.com'
                + '/ws/chat/'
                + id
                + '/'
            );

            return () => {
                chatSocket.close();
            }
    
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        chatSocket.onmessage = function(e) {
            const data = JSON.parse(e.data);
            setMessages([...Messages,data.message])
        };
    }, [Messages])

    function handleSubmit(e) {
        e.preventDefault()
        if(Message)
        {
            chatSocket.send(JSON.stringify({
                'message': Message,
                'name':name
            }));
            setMessage({'message':'','name':''});
        }
    }
    return (
        <>
        <Container>
                <Box sx={{"maxHeight":"80vh","height":"80vh", "overflowY":"scroll"}}>
                    { Messages.map((msg, i) => {
                    return (
                        <div key={i} style={{"margin":"20px"}}>
                            <ListItemText align={msg.name===name ? "right" : "left"} primary={msg.message}></ListItemText>
                            <ListItemText align={msg.name===name ? "right" : "left"} secondary={`user ${msg.name}`}></ListItemText>                            
                        </div>)
                    })}
                </Box>
            
            <Box component="form" onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                    <Grid item xs={9} sm={11}>
                        <TextField fullWidth onKeyPress={(e)=> e.key === 'Enter' ? handleSubmit : null}
                        onChange={(e)=> setMessage({'message':e.target.value,'name':name})} variant="standard" value={Message.message} />
                    </Grid>
                    <Grid item xs={3} sm={1}>
                        <Fab component="button" type="submit" color="primary"><Send/></Fab>
                    </Grid>
                </Grid>
            </Box>
        </Container>
        </>
    )
}

export default Chat
