import React from 'react';
import {Label, Button, Icon} from 'semantic-ui-react';
import {connect} from 'react-redux'
import {vote as voteIdea} from '../actions'
import '../styles/Detail.css'

const Detail = ({id, ideaList, goBack, voteIdea, user})=>{
    React.useEffect(()=>{
        setIdea(ideaList.ideas.find((idea)=>idea._id === id));
    },[ideaList]);
    const [idea, setIdea] = React.useState({title:'', 
    description:'',
     tags:[],
     startDate:'',
     duration:'',
     votes:[]
    });
    var allowVote = (idea.votes.findIndex((voteId)=> voteId===user)===-1);
    const onVote =()=>{
        if(allowVote)
        {
            voteIdea(id);
            allowVote = false;
        }
    }; 
    return(
        <React.Fragment>
            <span className='detail-title detail-padding'>
                <h3><Button icon="arrow left" basic style={{boxShadow:'none'}} onClick={goBack}/>{idea.title}</h3>
                <Button as='div' labelPosition='right'>
                    <Button icon onClick={onVote}>
                        <Icon name='thumbs up' />
                        Votes
                    </Button>
                    <Label as='a' basic pointing='left'>
                        {idea.votes.length}
                    </Label>
                </Button>
            </span>
            <div className="detail-content">
                <p className='detail-desc'>{idea.description}</p>
                {idea.tags.length>0?<div className='detail-padding'>
                    {idea.tags.split(',').map((tag, index) => (
                        <Label color={'grey'} key={index}>
                            {tag}
                        </Label>
                    ))}
                </div>:null}
                <span className='detail-time detail-padding'> <h5>Start Time:</h5>&nbsp;{new Date(idea.startDate).toLocaleString()} </span>
                <span className='detail-time detail-padding'> <h5>Duration:</h5>&nbsp;{`${idea.duration.split(':').join('hrs ')}mins`} </span>
                <Button negative basic onClick={goBack}>Back</Button>

            </div>
        </React.Fragment>
    );
};

const mapStateToProps = (state)=>{
    return {ideaList:state.ideaList,
            user:state.user}
}
export default connect(mapStateToProps, {voteIdea})(Detail);