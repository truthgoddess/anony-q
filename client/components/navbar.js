import React from 'react'
import {connect} from 'react-redux'
import {Grid, Button} from 'semantic-ui-react'
import {colors, pickRandom} from '../../script/utility/colors'

const Navbar = ({isHost, roomCode}) => (
  <Grid>
    <Grid.Row verticalAlign="middle" columns={2}>
      <Grid.Column color={pickRandom(colors)} width={8} textAlign="center">
        <div>Anoyn-Q {isHost ? 'host' : 'non-host'}</div>
      </Grid.Column>
      <Grid.Column
        verticalAlign="middle"
        color={pickRandom(colors)}
        floated="left"
        textAlign="center"
        width={8}
      >
        {roomCode ? (
          roomCode
        ) : (
          <Button color={pickRandom(colors)}>Make New Room</Button>
        )}
      </Grid.Column>
    </Grid.Row>
  </Grid>
)

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isHost: state.host,
    roomCode: state.roomCode,
  }
}

export default connect(mapState)(Navbar)
