import React from 'react'
import {connect} from 'react-redux'
import {
  Grid,
  Input,
  Container,
  Button,
  Form,
  FormField,
} from 'semantic-ui-react'
import {colors, pickRandom} from '../../script/utility/colors'
import {joinRoom} from '../store'

class QuestionBox extends React.Component {
  constructor() {
    super()
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit = async (e) => {
    e.preventDefault()
    await this.props.joinRoom({hashedRoomId: e.target.roomCode.value})
  }

  render() {
    const {hashedRoomId = '', error} = this.props
    return (
      <Grid padded>
        <Grid.Row columns={2}>
          <Grid.Column
            color={pickRandom(colors)}
            floated="left"
            width={16}
            textAlign="center"
          >
            {hashedRoomId.length > 1 ? (
              <Form>
                <FormField></FormField>
                <Input
                  name="question"
                  icon="question circle"
                  iconPosition="left"
                  label={{tag: true, content: 'Enter Question'}}
                  labelPosition="right"
                  placeholder="Let me think..."
                />
                <Button color={pickRandom(colors)}>Submit</Button>
                {error && error.response && <div> {error.response.data} </div>}
                <FormField></FormField>
              </Form>
            ) : (
              <Form onSubmit={this.handleSubmit}>
                <FormField>
                  <Input
                    name="roomCode"
                    icon="puzzle piece"
                    iconPosition="left"
                    label={{tag: true, content: 'Enter Room Code'}}
                    labelPosition="right"
                    placeholder="Ask your host..."
                  />
                  <Button type="submit" color={pickRandom(colors)}>
                    Submit
                  </Button>
                  {error && error.response && (
                    <div> {error.response.data} </div>
                  )}
                </FormField>
              </Form>
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

const mapDispatch = (dispatch) => {
  return {
    joinRoom: (hashedRoomIdObj) => dispatch(joinRoom(hashedRoomIdObj)),
  }
}

const mapState = (state) => {
  return {
    hashedRoomId: state.user.hashedRoomId,
    host: state.user.host,
  }
}

export default connect(mapState, mapDispatch)(QuestionBox)
