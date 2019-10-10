import React from 'react';
import tinymce from 'tinymce/tinymce';
import { Editor } from '@tinymce/tinymce-react';
import Modal from '@material-ui/core/Modal';
import Container from '@material-ui/core/Container';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility'
import CloseIcon from '@material-ui/icons/Close'
import SwipeableViews from 'react-swipeable-views';
import { Card, CardContent, CardActions } from '@material-ui/core';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import 'tinymce/skins/ui/oxide/skin.min.css'
import 'tinymce/skins/ui/oxide/content.min.css'
import 'tinymce/plugins/image'
import 'tinymce/plugins/link'
import 'tinymce/plugins/code'
import 'tinymce/themes/silver'
import 'tinymce/themes/silver'

const localize = {
    en : {
      name : "Name",
      image : "Image",
      delete : "Delete",
      addSubTopic : "Add a subTopics",
      subTopicName : "Subtopics name",
      addQuestion : "Add a question",
      answer : "Answer",
      cancel : "Cancel",
      submit : "Submit",
      onChange : "Unsaved changes",
    },
    fr : {
      name : "Nom",
      image : "Icône",
      delete : "Supprimer",
      addSubTopic : "Ajouter un sous-topic",
      subTopicName : "Nom de sous-topic",
      addQuestion : "Ajouter une question",
      answer : "Réponse",
      cancel : "Annuler",
      submit : "Valider",
      onChange : "Des changements sont en cours ",
    }
}


function TabTopics(props) {
    const [open, setOpen] = React.useState(false);
    let topics = props.topics
    topics = topics.slice(0, 4)
    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };
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
                                    <TextField
                                        className="inputTopic"
                                        label="icône"
                                        onChange={(e) => { props.handleChange(e.target.value, [index, "topic", 'icon']) }} value={topic.icon}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        edge="end"
                                                        aria-label="Toggle Image"
                                                        onClick={handleOpen}
                                                    >
                                                        <Visibility size="small" />
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                        }}
                                    >

                                    </TextField>
                                </div>
                                <div>
                                    <Button className='buttonStylised' color='primary' style={{color:"#fff"}} variant="contained" onClick={(e) => {
                                        props.addField('subTopic', index)
                                    }} size="small">{localize[props.lang].addSubTopic} </Button>
                                    <Button className='buttonStylised' color='secondary' style={{ color: "#fff" }} variant="contained" onClick={(e) => {
                                        props.removeField('topic', index)
                                    }} size="small">{localize[props.lang].delete</Button>
                                </div>

                            </div>

                        </CardActions>
                    </Card>
                    <div className='topicContent'>
                        {React.cloneElement(props.children, { topics: topics[index], idx: index })}
                    </div>
                    <div className="buttonWrapper">
                        <Button className="submitJson buttonStylised" style={{ color: '#fff' }} color="primary" size="small" variant="contained" onClick={(e) => {
                            props.handleSubmit(e)
                        }} > {localize[props.lang].submit </Button>
                        {
                            props.change === true &&
                            <div id="cancel">
                                <p className='buttonStylised warningChange'>Des Changements sont en cours</p>
                                <Button className='buttonStylised' className="reinitJson" style={{ color: '#fff' }} color="secondary" size="small" variant="contained" onClick={(e) => {
                                    props.handleCancel(e)
                                }} > {localize[props.lang].delete </Button>

                            </div>

                        }

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
            <Modal open={open}
                onClose={handleClose}
                style={{ textAlign:"center",display: "grid" }}
            >
                    <div>

                    <span style={{ height: '100%', verticalAlign: "middle", display: "inline-block" }}></span>
                    <img className='previewImg' src={props.topics[props.selectedTopic].icon} alt={props.topics[props.selectedTopic].icon} />
                        <IconButton
                        style={{ position: "absolute", backgroundColor:'#ff6d00'}}
                            edge="end"
                            aria-label="Close Image"
                            onClick={handleClose}
                        color="secondary"

                        >
                            <CloseIcon style={{color:"white"}} size="small" />
                        </IconButton>


                    </div>






            </Modal>
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
                        }} size="small">{localize[props.lang].addQuestion </Button>
                        <Button color='secondary' onClick={(e) => {
                            props.removeField('subTopic', props.idx, index)
                        }} size="small">{localize[props.lang].delete</Button>
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
                        <p>{localize[props.lang].response:</p>
                        <Editor inline className="tiny" init={{  plugins: 'link image code' }} initialValue={topic.response} onChange={(e) => { props.handleChange(e.level.content, [props.topic, props.subTopic, "response", index]) }} />
                    </ExpansionPanelDetails>
                    <ExpansionPanelActions>
                        <Button color='secondary' onClick={(e) => {
                            props.removeField('question', props.topic, props.subTopic, index)
                        }} size="small">{localize[props.lang].delete</Button>
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

export { QAndA , TabTopics, SubTopics  }
