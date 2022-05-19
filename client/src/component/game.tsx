import AboutUser from "./aboutUser"
import HighScoreList from "./highScoreList"
import PlayingField from "./playing.field"

function Game() {

    return (
        <div>
            <AboutUser />
            <div style={{ display: "flex", alignItems: "center", justifyContent: 'space-between', padding: '0 200px 0 200px' }}>
            <HighScoreList />
            <PlayingField />
            </div>
        </div> 
    )
}

export default Game