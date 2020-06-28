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
import {joinRoom, fetchQuestions} from '../store'

class QuestionBox extends React.Component {
  constructor() {
    super()
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit = async (e) => {
    e.preventDefault()
    if (this.props.hashedRoomId.length > 1) {
      console.log(e.target.question.value)
      e.target.question.value = ''
    } else {
      let roomCode = e.target.roomCode.value
      await this.props.joinRoom({hashedRoomId: roomCode})
      await this.props.fetchQuestions(roomCode)
      document.getElementById('question-box').value = ''
    }
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
              <Form onSubmit={this.handleSubmit}>
                <FormField>
                  <Input
                    name="question"
                    id="question-box"
                    icon="question circle"
                    iconPosition="left"
                    label={{tag: true, content: 'Enter Question'}}
                    labelPosition="right"
                    placeholder="Let me think..."
                  />
                  <Button color={pickRandom(colors)}>Submit</Button>
                  {error && error.response && (
                    <div> {error.response.data} </div>
                  )}
                </FormField>
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
    fetchQuestions: (roomId) => dispatch(fetchQuestions(roomId)),
  }
}

const mapState = (state) => {
  return {
    hashedRoomId: state.user.hashedRoomId,
    host: state.user.host,
  }
}

export default connect(mapState, mapDispatch)(QuestionBox)
