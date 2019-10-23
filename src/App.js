import React from 'react';
import Button from '@material-ui/core/Button';
import Immutable from 'immutable'
import './App.css';
import MenuTabTopics from './components/MenuTabTopics';
import LangPicker from './components/LangPicker';
import { TabTopics, SubTopics, QAndA } from './components/TopicHandlers';
import CircularProgress from '@material-ui/core/CircularProgress';
import uid from 'uid';

const localizeApp = {
  en : {
    submit : 'Submit',
    cancel : 'Cancel',
    createTopic : 'Create a Topic',
    noTopic : 'You have no topic',
    onChange : "Unsaved changes"
  },
  fr : {
    submit : 'Valider',
    cancel : 'Annuler',
    createTopic : 'Créer un topic',
    noTopic : "Vous n'avez aucun topic",
    onChange : "Des changements sont en cours"
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lang: 'fr',
      selectedTopic: 0,
      expanded: false,
      data: [],
      dataOld:[],
      change : false,
      loading : true,
    }
    this.handleChangeTabTopic = this.handleChangeTabTopic.bind(this)
    this.handleChangeSubtopic = this.handleChangeSubtopic.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
    this.addField = this.addField.bind(this)
    this.removeField = this.removeField.bind(this)
    this.initData = this.initData.bind(this)
    this.fetchingData = this.fetchingData.bind(this)
    this.postingData = this.postingData.bind(this)
    this.selectLang = this.selectLang.bind(this)
  }
  fetchingData(){
    fetch('/tma_cms_apps/api/v1/microsite_manager/json/' + window.siteID.siteID + '/faq/',
        {
            credentials: "same-origin",
            method: "GET",
        }
    )
    .then(response => response.json())
    .then((json) => {
        var dataFetched = json
        this.setState({ data: Immutable.fromJS(dataFetched),loading:false,dataOld: Immutable.fromJS(dataFetched)})
      });
  }
  postingData(){
    fetch('/tma_cms_apps/api/v1/microsite_manager/json/' + window.siteID.siteID + '/faq/',
      {
        credentials: "same-origin",
        method: "PUT",
        body: JSON.stringify(this.state.data.toJS()),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'X-CSRFToken': window.csrf
        }
      }
    )
      .then(response => response.json())
      .then((json) => {
        this.fetchingData()
      });
  }
  selectLang(e){
    this.setState({
      lang: e.target.value,
      selectedTopic : 0
    })
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
          data: data.updateIn([this.state.lang], arr => arr.push(Immutable.fromJS({ content: [], icon: '', idTopic: '', nameTopic: 'TopicName' }))),
        }));
    }
    if (type === 'subTopic') {
      this.setState(({ data }) => (
        {
          data: data.updateIn([this.state.lang, e, 'content'], arr => arr.push(
            Immutable.fromJS({ nameSubTopic: 'SubTopicName', content: [] })
          ))
        }));
    }
    if (type === 'question') {
      let newId = uid(10);
      this.setState(({ data }) => (
        {
          data: data.updateIn([this.state.lang, e, 'content', a, 'content'], arr => arr.push(
            Immutable.fromJS({ namequestion: 'Question',questionId : newId ,question: 'Question', response: '' })))
        }));
    }
  }
  removeField(type, i, e, a) {

    if (type === 'topic') {
      if (this.state.selectedTopic > this.state.data.toJS()[this.state.lang].length - 2) {
        this.setState(({ data }) => (
          {
            selectedTopic: i>0? i - 1 : 0,
            data: data.deleteIn([this.state.lang, i])
          }));
      } else {
        this.setState(({ data }) => (
          {
            data: data.deleteIn([this.state.lang, i])
          }));
      }
    }
    if (type === 'subTopic') {
      this.setState(({ data }) => (
        {
          data: data.deleteIn([this.state.lang, i, 'content', e])
        }));
    }
    if (type === 'question') {
      this.setState(({ data }) => (
        {
          data: data.deleteIn([this.state.lang, i, 'content', e, 'content', a])
        }));
    }

  }
  handleChange(e, arr) {
    if (arr[1] === "topic") {

      if (arr[2] === 'name') {
        this.setState(({ data }) => (
          {
            data: data.updateIn([this.state.lang, arr[0], 'nameTopic'], nameSubTopic => e)

          }));
      } else if (arr[2] === 'icon') {
        this.setState(({ data }) => (
          {
            data: data.updateIn([this.state.lang, arr[0], 'icon'], nameSubTopic => e)

          }));
      }

    }
    else if (arr[1] === "subtopic") {
      this.setState(({ data }) => (
        {
          data: data.updateIn([this.state.lang, arr[0], 'content', arr[2], 'nameSubTopic'], nameSubTopic => e)

        }));
    } else if (arr[2] === "question") {

      this.setState(({ data }) => (
        {
          data: data.updateIn([this.state.lang, arr[0], 'content', arr[1], 'content', arr[3], 'question'], nameSubTopic => e)

        }));
    } else if (arr[2] === "response") {
      this.setState(({ data }) => (
        {
          data: data.updateIn([this.state.lang, arr[0], 'content', arr[1], 'content', arr[3], 'response'], nameSubTopic => e)

        }));
    }
  }
  detecteChange (changeBool){
    this.setState({ change: changeBool })
  }
  handleSubmit(e) {
    this.postingData()
  }
  handleCancel() {
    this.fetchingData()
  }
  componentWillMount(){
      this.state.data.length === 0 ? this.fetchingData() : alert('Ereur lors de la récupération des données, veuillez contacter un administrateur !')

  }
  componentDidUpdate() {

    if (!this.state.data.equals(this.state.dataOld)){
      if (!this.state.change) { this.detecteChange(true) }
    }else{
      if (this.state.change) { this.detecteChange(false) }
    }

  }
  initData(){
    this.setState(({ data }) => (
      {
        data: data.updateIn([this.state.lang], arr => arr.push(Immutable.fromJS({ content: [], icon: '', idTopic: '', nameTopic: 'TopicName' })))
      }
    ))

  }
  render() {
    return (

      <div className="wrapperFAQ">
        <h1>Administration FAQ <a href="/studio-new.phileasamundi.com/assets/course-v1:global+000+2019/">Manage images</a></h1>
        {!this.state.loading ? (
            this.state.data.toJS()[this.state.lang].length === 0 ? (
            <div>
              <LangPicker selectLang={this.selectLang} lang={this.state.lang}/>
              <div className={'noTopic'}> Vous n'avez aucun topic
              <Button id='initTopicButton' color='primary' variant="contained" onClick={() => {
                this.initData()
              }}>
                {localizeApp[this.state.lang].createTopic}
              </Button>
              <div className="buttonWrapper">
                  {
                      this.state.change === true &&
                      <div>
                        <Button className="submitJson buttonStylised" style={{ color: '#fff' }} color="primary" size="small" variant="contained" onClick={(e) => {
                            this.handleSubmit(e)
                        }} > {localizeApp[this.state.lang].submit}
                      </Button>
                        <div id="cancel">
                            <p className='buttonStylised warningChange'>{localizeApp[this.state.lang].onChange}</p>
                            <Button className='buttonStylised' className="reinitJson" style={{ color: '#fff' }} color="secondary" size="small" variant="contained" onClick={(e) => {
                                this.handleCancel(e)
                            }} > {localizeApp[this.state.lang].cancel} </Button>

                        </div>
                      </div>
                  }

              </div>
              </div>
              </div>
            ) : (
                <div id='mainWrapper'>
                <LangPicker selectLang={this.selectLang} lang={this.state.lang}/>
                  <MenuTabTopics topics={this.state.data.toJS()[this.state.lang]} selectedTopic={this.state.selectedTopic} handleChangeTabTopic={this.handleChangeTabTopic} addField={this.addField} />
                  <TabTopics lang={this.state.lang} change={this.state.change} handleSubmit={this.handleSubmit} handleCancel={this.handleCancel} topics={this.state.data.toJS()[this.state.lang]} selectedTopic={this.state.selectedTopic} removeField={this.removeField} handleChangeTabTopic={this.handleChangeTabTopic} handleChange={this.handleChange} addField={this.addField} >
                    <SubTopics lang={this.state.lang} handleChange={this.handleChange} selectedTopic={this.state.selectedTopic} addField={this.addField} removeField={this.removeField}>
                      <QAndA lang={this.state.lang} handleChange={this.handleChange} addField={this.addField} removeField={this.removeField} />
                    </SubTopics>
                  </TabTopics>

                </div>
              )
         ) : (
            <CircularProgress />
          )
         }
      </div>
    )
  }

}

export default App
