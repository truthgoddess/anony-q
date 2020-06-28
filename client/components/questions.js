import React from 'react'
import {connect} from 'react-redux'
import {Grid, Button, Menu, Icon, Label} from 'semantic-ui-react'
import {
  fetchQuestions,
  likeQuestion,
  dislikeQuestion,
  deleteQuestion,
} from '../store'

class Questions extends React.Component {
  constructor() {
    super()
    this.handleLikeClick = this.handleLikeClick.bind(this)
    this.handleDislikeClick = this.handleDislikeClick.bind(this)
    this.handleDeleteClick = this.handleDeleteClick.bind(this)
  }
  handleDislikeClick = async (buttonId) => {
    console.log('dislike', buttonId)
    await this.props.dislikeQuestion(buttonId)
    await this.props.fetchQuestions(this.props.roomId)
  }

  handleLikeClick = async (buttonId) => {
    console.log('like', buttonId)
    await this.props.likeQuestion(buttonId)
    await this.props.fetchQuestions(this.props.roomId)
  }

  handleDeleteClick = async (buttonId) => {
    console.log('delete', buttonId)
    await this.props.deleteQuestion(buttonId)
    await this.props.fetchQuestions(this.props.roomId)
  }

  render() {
    const {questions, host} = this.props
    console.log(questions)
    return (
      <Grid padded>
        {questions.map((question) => (
          <Grid.Row key={question.id} columns={2}>
            <Grid.Column
              color={question.color}
              floated="left"
              width={12}
              textAlign="center"
            >
              {question.question}
            </Grid.Column>
            {host ? (
              <Grid.Column
                color={question.color}
                floated="left"
                width={4}
                textAlign="center"
              >
                <Button
                  color={question.color}
                  onClick={() => this.handleDeleteClick(question.id)}
                >
                  Delete
                </Button>
              </Grid.Column>
            ) : (
              <Grid.Column
                color={question.color}
                floated="left"
                width={4}
                textAlign="center"
              >
                <Menu compact>
                  <Button
                    type="button"
                    onClick={() => this.handleLikeClick(question.id)}
                  >
                    <Menu.Item color="green" as="a">
                      <Icon name="arrow up" />
                      <Label color="green" floating>
                        {question.likes}
                      </Label>
                    </Menu.Item>
                  </Button>
                  <Button
                    type="button"
                    onClick={() => this.handleDislikeClick(question.id)}
                  >
                    <Menu.Item color="red" as="a">
                      <Icon name="arrow down" />
                      <Label color="red" floating>
                        {question.dislikes}
                      </Label>
                    </Menu.Item>
                  </Button>
                </Menu>
              </Grid.Column>
            )}
          </Grid.Row>
        ))}
      </Grid>
    )
  }
}

/**
 * CONTAINER
 */

const mapDispatch = (dispatch) => {
  return {
    likeQuestion: (questionId) => dispatch(likeQuestion(questionId)),
    dislikeQuestion: (questionId) => dispatch(dislikeQuestion(questionId)),
    fetchQuestions: (roomId) => dispatch(fetchQuestions(roomId)),
    deleteQuestion: (questionId) => dispatch(deleteQuestion(questionId)),
  }
}

const mapState = (state) => {
  return {
    questions: state.questions,
    host: state.user.host,
    roomId: state.user.hashedRoomId,
  }
}

export default connect(mapState, mapDispatch)(Questions)
