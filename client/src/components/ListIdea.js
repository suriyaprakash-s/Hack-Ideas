import React from 'react';
import _ from 'lodash';
import {Table, Pagination, Button, Loader} from 'semantic-ui-react';
import {connect} from 'react-redux'
import Detail from './Detail';
import {getAllIdeas, deleteIdea} from '../actions';
import NewIdea from './NewIdea';

const ListIdea=({ideaList, deleteIdea, mode})=>{
  const {ideas, loading} = ideaList;

  React.useEffect(()=>{
    setContent({...content, data: _.sortBy(ideas, ['title']).slice((page.activePage-1)*7, 7*page.activePage)});
  }, [ideaList]);
  React.useEffect(()=>{
    setShowDetail({show: false, id: null});
    setShowEdit({show: false, idea: null});
  }, [mode]);
  const [page, setPage]=React.useState({
      activePage: 1,
      totalPages: _.ceil(ideas.length/7)
  });
  const [content, setContent]= React.useState({
      column: 'title',
      data: _.sortBy(ideas, ['title']).slice((page.activePage-1)*7, 7*page.activePage),
      direction: 'ascending'
  });
  const [showDetail, setShowDetail] = React.useState({
    show: false,
    id: null
  });
  const [showEdit, setShowEdit] = React.useState({
    show: false,
    info: null
  });
  const { column, data, direction } = content;     
  const handleChangePage=(event, data)=>{
      setPage({...page, activePage:data.activePage });
      setContent({...content,
          data: _.orderBy(ideas, [column],[direction === 'ascending' ? 'asc' : 'desc'])
          .slice((data.activePage-1)*7,7*data.activePage)})
  }
  const sort=(target)=>{
    if(target == "votes")
      target=`${target}.length`
      setContent({
            column: target,
            data: _.orderBy(ideas, [target],[direction === 'ascending' ? 'desc' : 'asc']).slice((page.activePage-1)*7,7*page.activePage),
            direction: direction === 'ascending' ? 'descending' : 'ascending'
          });
    }
  
  const titleElement = (title, id)=>{
    if(mode==="manage")
    return(
      <span>{title}</span>
    );
    else
    return(
      <span style={{cursor:'pointer'}} onClick={()=>setShowDetail({show:true, id:id})}>{title}</span>
    );
  }
  const getDetail=()=>{
    return <Detail id={showDetail.id} goBack={()=>setShowDetail({...showDetail, show:false})}/>
  }
  const getEdit=()=>{
    return <NewIdea idea={showEdit.idea} mode="edit" goBack={()=>setShowEdit({...showEdit, show:false})}/>
  }
  const getNoIdeaText=()=>{
    if(mode==="manage")
      return <h4 style={{textAlign:'center'}}>You have not created any ideas, create to manage</h4>
    else
      return <h4 style={{textAlign:'center'}}>No Ideas available at the moment, come back later</h4>
  }
  const getTable = ()=>{
    return(ideas.length ===0 ? getNoIdeaText():<Table sortable celled>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell
            sorted={column === 'title' ? direction : null}
            onClick={() => sort('title')}
          >
            Title
          </Table.HeaderCell>
          <Table.HeaderCell
            sorted={column === 'startDate' ? direction : null}
            onClick={() => sort('startDate')}
          >
            Start Date
          </Table.HeaderCell>
          <Table.HeaderCell
            sorted={column === 'duration' ? direction : null}
            onClick={() => sort('duration')}
          >
            Duration
          </Table.HeaderCell>
          <Table.HeaderCell
            sorted={column === 'votes' ? direction : null}
            onClick={() => sort('votes')}
          >
            Votes
          </Table.HeaderCell>
          {mode==="manage" && <Table.HeaderCell>
            Actions
          </Table.HeaderCell>}
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {data.map((row) => (
          <Table.Row key={row._id}>
            <Table.Cell>{titleElement(row.title, row._id)}</Table.Cell>
            <Table.Cell>{new Date(row.startDate).toLocaleDateString()}</Table.Cell>
            <Table.Cell>{`${row.duration.split(':').join('hrs ')}mins`}</Table.Cell>
            <Table.Cell>{row.votes.length}</Table.Cell>
            {mode==="manage" && <Table.Cell>
                <Button icon='edit' onClick={()=>{setShowEdit({idea:{...row}, show:true})}}></Button>
                <Button icon='delete' onClick={()=>{deleteIdea(row._id)}}></Button>
            </Table.Cell>}
            
          </Table.Row>
        ))}
      </Table.Body>
      {ideas.length>7 &&<Table.Footer>
        <Table.Row>
            <Table.HeaderCell colSpan='4' key='page'>
                <Pagination totalPages={page.totalPages} activePage={page.activePage} 
                    onPageChange={handleChangePage}
                style={{float:'right'}}/>
            </Table.HeaderCell>
        </Table.Row>
      </Table.Footer>}
    </Table>);
  }
  return (
    loading?<Loader active content="Loading"/>
            : mode==="manage" ?  showEdit.show?  getEdit():getTable()
                        : showDetail.show?  getDetail(): getTable()
                   
);
};


export default connect(null, {getAllIdeas, deleteIdea})(ListIdea);