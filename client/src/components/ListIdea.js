import React from 'react';
import _ from 'lodash';
import {Table, Pagination, Button} from 'semantic-ui-react';
import Detail from './Detail';
const ListIdea=()=>{
    const tableData = [
        { title: 'Hack for frontend developer', startDate: Date.now(), duration: '10hrs30mins', votes:1 },
        { title: 'Fullstack developers hackathons', startDate: Date.now(), duration: '20hrs30mins', votes:2 },
        { title: 'Go Green Hacakathons', startDate: Date.now(), duration: '10hrs10mins', votes:3 },
        { title: 'Thanons hacks Earth but Iron man hacks thanos', startDate: Date.now(), duration: '10hrs30mins', votes:4 },
        { title: 'Hack for frontend developer', startDate: Date.now(), duration: '10hrs30mins', votes:5 },
        { title: 'Fullstack developers hackathons', startDate: Date.now(), duration: '20hrs30mins', votes:6 },
        { title: 'Go Green Hacakathons', startDate: Date.now(), duration: '10hrs10mins', votes:7 },
        { title: 'Thanons hacks Earth but Iron man hacks thanos', startDate: Date.now(), duration: '10hrs30mins', votes:8 },
        { title: 'Hack for frontend developer', startDate: Date.now(), duration: '10hrs30mins', votes:9 },
        { title: 'Fullstack developers hackathons', startDate: Date.now(), duration: '20hrs30mins', votes:10 },
        { title: 'Go Green Hacakathons', startDate: Date.now(), duration: '10hrs10mins', votes:11 },
        { title: 'Thanons hacks Earth but Iron man hacks thanos', startDate: Date.now(), duration: '10hrs30mins', votes:12 },
        { title: 'Hack for frontend developer', startDate: Date.now(), duration: '10hrs30mins', votes:13 },
        { title: 'Fullstack developers hackathons', startDate: Date.now(), duration: '20hrs30mins', votes:14 },
        { title: 'Go Green Hacakathons', startDate: Date.now(), duration: '10hrs10mins', votes:15 },
        { title: 'Thanons hacks Earth but Iron man hacks thanos', startDate: Date.now(), duration: '10hrs30mins', votes:16 },
        { title: 'Hack for frontend developer', startDate: Date.now(), duration: '10hrs30mins', votes:17 },
        { title: 'Fullstack developers hackathons', startDate: Date.now(), duration: '20hrs30mins', votes:18 },
        { title: 'Go Green Hacakathons', startDate: Date.now(), duration: '10hrs10mins', votes:19 },
        { title: 'Thanons hacks Earth but Iron man hacks thanos', startDate: Date.now(), duration: '10hrs30mins', votes:20 },
        { title: 'Hack for frontend developer', startDate: Date.now(), duration: '10hrs30mins', votes:21 },
        { title: 'Fullstack developers hackathons', startDate: Date.now(), duration: '20hrs30mins', votes:22 },
        { title: 'Go Green Hacakathons', startDate: Date.now(), duration: '10hrs10mins', votes:23 },
        { title: 'Thanons hacks Earth but Iron man hacks thanos', startDate: Date.now(), duration: '10hrs30mins', votes:24 },
      ]
    const [page, setPage]=React.useState({
        activePage: 1,
        totalPages: _.ceil(tableData.length/7)
    });
    const [content, setContent]= React.useState({
        column: 'votes',
        data: _.sortBy(tableData, ['votes']).slice((page.activePage-1)*7, 7*page.activePage),
        direction: 'ascending'
    });
    const [showDetail, setShowDeatils] = React.useState(false);
    const { column, data, direction } = content;     
    const handleChangePage=(event, data)=>{
        setPage({...page, activePage:data.activePage });
        setContent({...content,
            data: _.orderBy(tableData, [column],[direction === 'ascending' ? 'asc' : 'desc'])
            .slice((data.activePage-1)*7,7*data.activePage)})
    }
    const sort=(target)=>{
        setContent({
              column: target,
              data: _.orderBy(tableData, [target],[direction === 'ascending' ? 'desc' : 'asc']).slice((page.activePage-1)*7,7*page.activePage),
              direction: direction === 'ascending' ? 'descending' : 'ascending'
            });
      }
      return (
        showDetail? <Detail {...tableData[0]}/> : <Table sortable celled>
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
              <Table.HeaderCell>
                Actions
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {data.map(({ startDate, duration, title, votes }) => (
              <Table.Row key={votes}>
                <Table.Cell><span style={{cursor:'pointer'}} onClick={()=>setShowDeatils(true)}>{title}</span></Table.Cell>
                <Table.Cell>{new Date(startDate).toLocaleDateString()}</Table.Cell>
                <Table.Cell>{duration}</Table.Cell>
                <Table.Cell>{votes}</Table.Cell>
                <Table.Cell>
                    <Button icon='edit'></Button>
                    <Button icon='delete'></Button>
                </Table.Cell>
                
              </Table.Row>
            ))}
          </Table.Body>
          <Table.Footer>
            <Table.Row>
                <Table.HeaderCell colSpan='4' key='page'>
                    <Pagination totalPages={page.totalPages} activePage={page.activePage} 
                        onPageChange={handleChangePage}
                    style={{float:'right'}}/>
                </Table.HeaderCell>
            </Table.Row>
        </Table.Footer>
    </Table>
    );
};


export default ListIdea;