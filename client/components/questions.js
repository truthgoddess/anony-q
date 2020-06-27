import React from 'react'
import {connect} from 'react-redux'
import {Grid, Input, Container, Button} from 'semantic-ui-react'
import {colors, pickRandom} from '../../script/utility/colors'

const Questions = ({messages = []}) => (
  <Grid padded>
    <Grid.Row columns={2}>
      <Grid.Column
        color={pickRandom(colors)}
        floated="left"
        width={16}
        textAlign="center"
      >
        {roomCode.length > 1 ? (
          <Container>
            <Input
              icon="question circle icon"
              iconPosition="left"
              label={{tag: true, content: 'Enter Question'}}
              labelPosition="right"
              placeholder="Let me think..."
            />
            <Button color={pickRandom(colors)}>Submit</Button>
          </Container>
        ) : (
          <Container>
            <Input
              icon="puzzle piece"
              iconPosition="left"
              label={{tag: true, content: 'Enter Room Code'}}
              labelPosition="right"
              placeholder="Ask your host..."
            />
            <Button color={pickRandom(colors)}>Submit</Button>
          </Container>
        )}
      </Grid.Column>
    </Grid.Row>
  </Grid>
)

/**
 * CONTAINER
 */

const mapDispatch = (dispatch) => {
  return {}
}

const mapState = (state) => {
  return {
    messages: state.messages,
  }
}

export default connect(mapState, mapDispatch)(Questions)
