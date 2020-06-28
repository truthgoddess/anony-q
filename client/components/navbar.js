import React from 'react'
import {connect} from 'react-redux'
import {Grid, Button} from 'semantic-ui-react'
import {colors, pickRandom} from '../../script/utility/colors'
import {joinRoom} from '../store'
import {render} from 'enzyme'

class Navbar extends React.Component {
  constructor() {
    super()
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick = async () => {
    console.log('hi')
    await this.props.makeNewRoom({host: true})
  }

  render() {
    const {isHost, hashedRoomId = ''} = this.props
    return (
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
            {hashedRoomId.length > 1 ? (
              hashedRoomId
            ) : (
              <Button onClick={this.handleClick} color={pickRandom(colors)}>
                Make New Room
              </Button>
            )}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isHost: state.user.host,
    hashedRoomId: state.user.hashedRoomId,
  }
}

const mapDispatch = (dispatch) => {
  return {
    makeNewRoom: (putHostTrue) => dispatch(joinRoom(putHostTrue)),
  }
}

export default connect(mapState, mapDispatch)(Navbar)
