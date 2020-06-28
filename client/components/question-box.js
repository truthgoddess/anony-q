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
import {joinRoom, fetchQuestions, addQuestion} from '../store'

class QuestionBox extends React.Component {
  constructor() {
    super()
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit = async (e) => {
    e.preventDefault()
    if (this.props.roomId.length > 1) {
      // console.log(e.target.question.value)
      // console.log(this.props)
      await this.props.addQuestion(this.props.userId, e.target.question.value)
      await this.props.fetchQuestions(this.props.roomId)
      document.getElementById('question-box').value = ''
    } else {
      let roomCode = e.target.roomCode.value
      await this.props.joinRoom({hashedRoomId: roomCode})
      await this.props.fetchQuestions(roomCode)
      document.getElementById('question-box').value = ''
    }
  }

  render() {
    const {roomId = '', error} = this.props
    return (
      <Grid padded>
        <Grid.Row columns={2}>
          <Grid.Column
            color={pickRandom(colors)}
            floated="left"
            width={16}
            textAlign="center"
          >
            {roomId.length > 1 ? (
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
                    id="question-box"
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
    addQuestion: (userId, question) => dispatch(addQuestion(userId, question)),
  }
}

const mapState = (state) => {
  return {
    roomId: state.user.hashedRoomId,
    host: state.user.host,
    userId: state.user.id,
  }
}

export default connect(mapState, mapDispatch)(QuestionBox)
