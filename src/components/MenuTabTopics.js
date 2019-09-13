import React from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';

function MenuTabTopics(props) {
  let topics = props.topics
  topics = topics.slice(0, 4)
  let onScreen = topics.map(
    (topic, index) => {
      return (
        <Tab key={topic.nameTopic + index} label={topic.nameTopic} value={index} />
      )
    })
  return (
    <div id={'tabsWrapper'}>
      <Tabs
        id={'tabsElementWrapper'}
        value={props.selectedTopic}
        indicatorColor="primary"
        onChange={props.handleChangeTabTopic}
        variant="fullWidth"
      >
        {onScreen}

      </Tabs>
      {props.topics.length < 4 &&
        <Button id="addTopicButton" color="primary" size="small" variant="contained" onClick={(e) => { props.addField('topic', e) }} > <AddIcon /> </Button>
      }
    </div>
  )
}
export default MenuTabTopics