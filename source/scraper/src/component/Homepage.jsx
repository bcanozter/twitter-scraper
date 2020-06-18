import React , {useState} from 'react';
import { Dialog,TextInput,Button,Heading,Pane, Text,Table,Tablist,Paragraph, Tab, TabNavigation } from 'evergreen-ui'
import axios from 'axios'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";

//export default class Home extends React.Component {
export default function App(){
  const [idx,setIdx] = useState()
  const tabs = [
    {
      name:'Home',
      value:'/'
    },
    {
      name:'About',
      value:'/about'
    }
  ]

  return( 
    <Router>
      <div>

      <TabNavigation>
      {tabs.map((tab, index) => (
        <Tab key={tab.name} id={tab.name} onSelect={() => setIdx(index)} isSelected={index === idx}>
          <Link style={{ color: 'inherit', textDecoration: 'inherit'}} to={tabs[index].value}>{tabs[index].name}</Link>
        </Tab>
      ))}
    </TabNavigation>
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {keyword:'', searchData:[]}
    this.handleSearch = this.handleSearch.bind(this);
  }

  handleSearch(){
      if(this.state.keyword === undefined || this.state.keyword === ''){
        alert("Please enter a search keyword...")
        return
      }
        axios.post('https://iron-arbor-280700.ue.r.appspot.com/search',this.state.keyword)
          .then(res => {
            console.log(res);
            console.log(res.data);
            this.setState({searchData:res.data})
            console.log(this.state.searchData)
          })
      }
  
    test = [
      {name:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'}
      ]
  
  render(){
  
    return( 
      <div>
        <Pane display="flex" padding={16} background="tint2" borderRadius={3} marginBottom={16}>
          <Pane flex={1} alignItems="center" display="flex">
            <Heading size={600}>Twitter Scrapper</Heading>
          </Pane>
        </Pane> 

        <Pane flex={1} alignItems="center" display="flex">
        {/* Below you can see the marginRight property on a Button. */}
          <TextInput
            name="Keyword"
            placeholder="Search keyword in tweets..."
            onChange={event => this.setState({keyword:event.target.value})}
            width="10%"
          />
          <Button marginRight={16}>Clear</Button>
          <Button appearance="primary" onClick={this.handleSearch}> Search</Button>
        </Pane> 
      <main>  
        <Table >
          <Table.Head >
            <Table.TextHeaderCell flexBasis={200} flexShrink={0} flexGrow={0} >User</Table.TextHeaderCell>
            <Table.TextHeaderCell>Tweet</Table.TextHeaderCell>
            <Table.TextHeaderCell>Location</Table.TextHeaderCell>
          </Table.Head>
          <Table.Body  allowautoheight='true'>
            {this.state.searchData.map((user,idx) => (
              <Table.Row height='auto' key={idx}>
                <Table.TextCell flexBasis={200} flexShrink={0} flexGrow={0}>{user.name}</Table.TextCell>
                <Table.Cell>
                  <Paragraph >{user.tweet}</Paragraph>
                </Table.Cell>
                <Table.TextCell  isNumber>
                  {user.location}
                </Table.TextCell>
              </Table.Row>
              ))}

          </Table.Body>
        </Table>
        </main>
    </div>  
    )}

}

function About(show2){

  const [show,setShow] = useState(false)
  return(
      <Dialog
        isShown={show2}
        title="About"
        onCloseComplete={() => setShow(false)}
        confirmLabel="OK"
      >
        This is to explore Twitter API.
      </Dialog>
  )
}
