import Button from '@mui/material/Button';

const RoomItem = ({roomName, chooseRoom, nowRoom}) => {

    function pick(){
        chooseRoom(roomName)
        nowRoom.current = roomName
    }

    return <div>
        <Button 
            margin="normal"
            fullWidth
            variant="outlined"
            onClick={pick} 
        >{roomName}</Button>
    </div>
}

export default RoomItem