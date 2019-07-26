import React from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import SwipeableViews from 'react-swipeable-views';
import { Card, CardContent, CardActions } from '@material-ui/core';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Immutable from 'immutable'
import tinymce from 'tinymce/tinymce';
import { Editor } from '@tinymce/tinymce-react';
import AddIcon from '@material-ui/icons/Add';
import 'tinymce/skins/ui/oxide/skin.min.css'
import 'tinymce/skins/ui/oxide/content.min.css'
import 'tinymce/plugins/image'
import 'tinymce/plugins/link'
import 'tinymce/plugins/code'
import 'tinymce/themes/silver'

/**Import des données ou à remplacer avec un fetch */
import dataFAQ from './data/dataFAQ.js';


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
    <div>
      <Tabs
        value={props.selectedTopic}
        indicatorColor="primary"
        textColor="primary"
        onChange={props.handleChangeTabTopic}
        variant="fullWidth"
      >
        {onScreen}
        {props.topics.length < 4 &&
          <Button id="addTopicButton" color="primary" size="small" variant="contained" onClick={(e) => { props.addField('topic', e) }} > <AddIcon /> </Button>
        }
      </Tabs>

    </div>

  )
}

function TabTopics(props) {
  let topics = props.topics
  topics = topics.slice(0, 4)
  let onScreen = topics.map(
    (topic, index) => {
      return (
        <div className='tabTopic' key={topic + index}>
          <Card className='topicInput'>
            <CardContent>
              <center>
                <h4>
                  {topic.nameTopic}
                </h4>
              </center>
            </CardContent>
            <CardActions>
              <div className='TopicName'>
                <div className='inputTopicWrapper'>
                  <TextField className="inputTopic" label="Nom" onChange={(e) => { props.handleChange(e.target.value, [index, "topic", 'name']) }} value={topic.nameTopic}></TextField>
                  <TextField className="inputTopic" label="icône" onChange={(e) => { props.handleChange(e.target.value, [index, "topic", 'icon']) }} value={topic.icon}></TextField>
                </div>
                <div>
                  <Button color='primary' onClick={(e) => {
                    props.addField('subTopic', index)
                  }} size="small">Ajouter un sous-topic </Button>
                  <Button color='secondary' onClick={(e) => {
                    props.removeField('topic', index)
                  }} size="small">Supprimer</Button>
                </div>

              </div>

            </CardActions>
          </Card>
          <div className='topicContent'>
            {React.cloneElement(props.children, { topics: topics[index], idx: index })}
          </div>
        </div>
      )
    })
  return (
    <SwipeableViews
      axis={'x'}
      index={props.selectedTopic}
      onChangeIndex={props.handleChangeTabTopic}
    >
      {onScreen}
    </SwipeableViews>
  )
}

function SubTopics(props) {

  let topics = props.topics
  let onScreen = topics.content.map(
    (subTopic, index) => {
      return (
        <ExpansionPanel key={index} >
          <ExpansionPanelSummary
            className='sousTopic'
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <h3>{subTopic.nameSubTopic}</h3>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className="subTopicFields">
            <TextField label="Nom du sous-topic" onChange={(e) => { props.handleChange(e.target.value, [props.idx, "subtopic", index]) }} fullWidth rows='12' value={subTopic.nameSubTopic}></TextField>
            {React.cloneElement(props.children, { data: subTopic.content, topic: props.idx, subTopic: index })}
          </ExpansionPanelDetails>
          <ExpansionPanelActions>
            <Button color='primary' onClick={(e) => {
              props.addField('question', props.idx, index)
            }} size="small">Ajouter une question </Button>
            <Button color='secondary' onClick={(e) => {
              props.removeField('subTopic', props.idx, index)
            }} size="small">Supprimer</Button>
          </ExpansionPanelActions>

        </ExpansionPanel>
      )
    })
  return (
    <div>
      {onScreen}
    </div>
  )
}

function QAndA(props) {
  let topics = props.data
  let onScreen = topics.map(
    (topic, index) => {
      return (
        <ExpansionPanel key={index} >
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <h4>{topic.question}</h4>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className="qAndAFields">
            <TextField label="Question" fullWidth rows='12' value={topic.question} onChange={(e) => { props.handleChange(e.target.value, [props.topic, props.subTopic, "question", index]) }}></TextField>
            <p>Réponse:</p>
            <Editor inline className="tiny" init={{ plugins: 'link image code' }} initialValue={topic.response} onChange={(e) => { props.handleChange(e.level.content, [props.topic, props.subTopic, "response", index]) }} />
          </ExpansionPanelDetails>
          <ExpansionPanelActions>
            <Button color='secondary' onClick={(e) => {
              props.removeField('question', props.topic, props.subTopic, index)
            }} size="small">Supprimer</Button>
          </ExpansionPanelActions>
        </ExpansionPanel>
      )
    })
  return (
    <div className="qAndAWrappers">
      {onScreen}
    </div>
  )
}

function Sidebar(props) {
  console.log(props.selectedTopic)
  return (
    <Card id='cardSidebar'>
      <CardContent>
        <h4>
          {props.topic.nameTopic}
        </h4>
      </CardContent>
      <CardActions>
        <div className='TopicName'>
          <h2>
            <TextField label="Topic" onChange={(e) => { props.handleChange(e.target.value, [props.index, "topic"]) }} value={props.topic.nameTopic}></TextField>
          </h2>

          <p className='deleteTarget' onClick={(e) => {
            props.removeField('topic', props.index)
          }}>Supprimer</p>
        </div>
        <div id="buttonWrapper">
          <Button className="submitJson" color="primary" size="small" variant="outlined" onClick={(e) => {
            props.handleSubmit(e)
          }} > Valider </Button>
          <div id="cancel">
            <Button className="reinitJson" color="secondary" size="small" variant="outlined" onClick={(e) => {
              props.handleCancel()
            }} > Annuler </Button>
            <p id='warningChange'>Des Changements sont en cours</p>
          </div>
        </div>
      </CardActions>
    </Card>
  )
}



class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lang: 'fr',
      selectedTopic: 0,
      expanded: false,
      data: Immutable.fromJS(dataFAQ)
    }
    this.handleChangeTabTopic = this.handleChangeTabTopic.bind(this)
    this.handleChangeSubtopic = this.handleChangeSubtopic.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
    this.addField = this.addField.bind(this)
    this.removeField = this.removeField.bind(this)
  }
  handleChangeTabTopic(e, value) {
    this.setState({
      selectedTopic: value
    })
  }

  handleChangeSubtopic = panel => (event, isExpanded) => {
    if (isExpanded) {
      return panel = true

    } else {
      return panel = false
    }
  }
  addField(type, e, a) {
    if (type === 'topic') {
      this.setState(({ data }) => (
        {
          data: data.updateIn([0, 'fr'], arr => arr.push(Immutable.fromJS({ content: [{ nameSubTopic: '', content: [{ namequestion: '', question: '', response: '' }] }], icon: '', idTopic: '', nameTopic: 'TopicName' })))
        }));
    }
    if (type === 'subTopic') {
      console.log(this.state.data.getIn([0, 'fr', e, 'content']))
      this.setState(({ data }) => (
        {
          data: data.updateIn([0, 'fr', e, 'content'], arr => arr.push(
            Immutable.fromJS({ nameSubTopic: '', content: [{ namequestion: '', question: '', response: '' }] })
          ))
        }));
    }
    if (type === 'question') {
      this.setState(({ data }) => (
        {
          data: data.updateIn([0, 'fr', e, 'content', a, 'content'], arr => arr.push(
            Immutable.fromJS({ namequestion: '', question: '', response: '' })))
        }));
    }
  }
  removeField(type, i, e, a) {

    if (type === 'topic') {
      if (this.state.selectedTopic > this.state.data.toJS()[0][this.state.lang].length - 2) {
        this.setState(({ data }) => (
          {
            selectedTopic: i - 1,
            data: data.deleteIn([0, 'fr', i])
          }));
      } else {
        this.setState(({ data }) => (
          {
            data: data.deleteIn([0, 'fr', i])
          }));
      }
    }
    if (type === 'subTopic') {
      this.setState(({ data }) => (
        {
          data: data.deleteIn([0, 'fr', i, 'content', e])
        }));
    }
    if (type === 'question') {
      this.setState(({ data }) => (
        {
          data: data.deleteIn([0, 'fr', i, 'content', e, 'content', a])
        }));
    }

  }
  handleChange(e, arr) {
    if (arr[1] === "topic") {

      if (arr[2] === 'name') {
        this.setState(({ data }) => (
          {
            data: data.updateIn([0, 'fr', arr[0], 'nameTopic'], nameSubTopic => e)

          }));
      } else if (arr[2] === 'icon') {
        this.setState(({ data }) => (
          {
            data: data.updateIn([0, 'fr', arr[0], 'icon'], nameSubTopic => e)

          }));
      }

    }
    else if (arr[1] === "subtopic") {
      this.setState(({ data }) => (
        {
          data: data.updateIn([0, 'fr', arr[0], 'content', arr[2], 'nameSubTopic'], nameSubTopic => e)

        }));
    } else if (arr[2] === "question") {

      this.setState(({ data }) => (
        {
          data: data.updateIn([0, 'fr', arr[0], 'content', arr[1], 'content', arr[3], 'question'], nameSubTopic => e)

        }));
    } else if (arr[2] === "response") {
      this.setState(({ data }) => (
        {
          data: data.updateIn([0, 'fr', arr[0], 'content', arr[1], 'content', arr[3], 'response'], nameSubTopic => e)

        }));
    }
  }
  handleSubmit(e) {
    //console.log(Immutable.fromJS(this.props.data))
    console.log(this.state.data.toJS())
  }
  handleCancel() {
    this.setState({ data: Immutable.fromJS(dataFAQ) })
  }
  componentDidUpdate() {

    if (this.state.data.equals(Immutable.fromJS(dataFAQ))) {
      document.getElementById('cancel').style.display = "none"
    } else {
      document.getElementById('cancel').style.display = "block"
    }
  }
  render() {
    return (
      <div className="wrapper">
        <div id='mainWrapper'>
          <MenuTabTopics topics={this.state.data.toJS()[0][this.state.lang]} selectedTopic={this.state.selectedTopic} handleChangeTabTopic={this.handleChangeTabTopic} addField={this.addField} />
          <TabTopics handleSubmit={this.handleSubmit} handleCancel={this.handleCancel} topics={this.state.data.toJS()[0][this.state.lang]} selectedTopic={this.state.selectedTopic} removeField={this.removeField} handleChangeTabTopic={this.handleChangeTabTopic} handleChange={this.handleChange} addField={this.addField} >
            <SubTopics handleChange={this.handleChange} selectedTopic={this.state.selectedTopic} addField={this.addField} removeField={this.removeField}>
              <QAndA handleChange={this.handleChange} addField={this.addField} removeField={this.removeField} />
            </SubTopics>
          </TabTopics>
          <div id="buttonWrapper">
            <Button className="submitJson" color="primary" size="small" variant="outlined" onClick={(e) => {
              this.handleSubmit(e)
            }} > Valider </Button>
            <div id="cancel">
              <Button className="reinitJson" color="secondary" size="small" variant="outlined" onClick={(e) => {
                this.handleCancel()
              }} > Annuler </Button>
              <p id='warningChange'>Des Changements sont en cours</p>
            </div>
          </div>
        </div>

      </div>
    )
  }

}

export default App