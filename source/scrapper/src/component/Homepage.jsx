import React , {useState} from 'react';
import { TextInput,Button,Heading,Pane, Text,Table,Tablist,Paragraph } from 'evergreen-ui'
import axios from 'axios'

//export default class Home extends React.Component {
export default function Home(){
  const [searchData, setSearchData] = useState([])
  const [keyword,setKeyword] = useState('')


function search(){
  if(keyword === undefined || keyword === ''){
    alert("Please enter a search keyword...")
    return
  }
    axios.post('http://127.0.0.1:5000/search',keyword)
      .then(res => {
        console.log(res);
        console.log(res.data);
        setSearchData(res.data)
      })
  }

  const test = [
    {name:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'}
    ]
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
  onChange={event => setKeyword(event.target.value)}
  width="10%"
/>
    <Button marginRight={16}>Clear</Button>
    <Button appearance="primary" onClick={search}> Search</Button>
     </Pane> 
    <main>  
<Table >
  <Table.Head >
    <Table.TextHeaderCell flexBasis={200} flexShrink={0} flexGrow={0} >
      User
    </Table.TextHeaderCell>
    <Table.TextHeaderCell>
      Tweet
    </Table.TextHeaderCell>
    <Table.TextHeaderCell>
      Location
    </Table.TextHeaderCell>
  </Table.Head>
  <Table.Body  
               allowAutoHeight>
    {searchData.map(user => (
      <Table.Row height='auto' key={user.id}>
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