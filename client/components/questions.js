import React from 'react'
import {connect} from 'react-redux'
import {Grid, Button, Menu, Icon, Label} from 'semantic-ui-react'
import {colors, pickRandom} from '../../script/utility/colors'
import {fetchQuestions} from '../store'

const Questions = ({questions, host}) => {
  console.log('questios render')
  return (
    <Grid padded>
      {questions.map((question) => (
        <Grid.Row key={question.id} columns={2}>
          <Grid.Column
            color={pickRandom(colors)}
            floated="left"
            width={12}
            textAlign="center"
          ></Grid.Column>
          {host ? (
            <Grid.Column
              color={pickRandom(colors)}
              floated="left"
              width={4}
              textAlign="center"
            >
              <Button color={pickRandom(colors)}>Submit</Button>
            </Grid.Column>
          ) : (
            <Grid.Column
              color={pickRandom(colors)}
              floated="left"
              width={4}
              textAlign="center"
            >
              <Menu compact>
                <Menu.Item color="green" as="a">
                  <Icon name="like" /> Messages
                  <Label color="green" floating>
                    22
                  </Label>
                </Menu.Item>
                <Menu.Item color="red" as="a">
                  <Icon name="dislike" /> Friends
                  <Label color="red" floating>
                    22
                  </Label>
                </Menu.Item>
              </Menu>
            </Grid.Column>
          )}
        </Grid.Row>
      ))}
    </Grid>
  )
}

/**
 * CONTAINER
 */

// const mapDispatch = (dispatch) => {
//   return {
//     fetchQuestions
//   }
// }

const mapState = (state) => {
  return {
    questions: state.questions,
    host: state.host,
  }
}

export default connect(mapState)(Questions)
