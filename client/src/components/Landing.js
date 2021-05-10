import React from 'react';
import { Tab } from 'semantic-ui-react';
import {connect} from 'react-redux'
import {getAllIdeas, getUserIdeas} from '../actions'
import '../styles/Landing.css';
import ListIdea from './ListIdea';
import NewIdea from './NewIdea';

const Landing =({allIdeaList, userIdeaList, getAllIdeas, getUserIdeas})=>{
    const getAllIdeaList = ()=>{
      if(allIdeaList.loading===true)
        getAllIdeas();
    };
    const getUserIdeaList = ()=>{
      if(userIdeaList.loading===true)
        getUserIdeas();
    }
    const panes = [
        {
          menuItem: 'All',
          render: () => <Tab.Pane attached={false}>{getAllIdeaList()}<ListIdea ideaList={allIdeaList} mode="all"/></Tab.Pane>,
        },
        {
          menuItem: 'Manage',
          render: () => <Tab.Pane attached={false}>{getUserIdeaList()}<ListIdea ideaList={userIdeaList} mode="manage"/></Tab.Pane>,
        },
        {
          menuItem: 'Create',
          render: () => <Tab.Pane attached={false}><NewIdea mode="create"/></Tab.Pane>,
        },
        {
            menuItem: 'About us',
            render: () => <Tab.Pane attached={false}>About us</Tab.Pane>,
        }  
      ]
    return(
        <Tab className="landing" menu={{ fluid: true, vertical: true, tabular: true }} panes={panes} />
    );
};

const mapStateToProps = (state)=>{
  return {allIdeaList:state.ideaList,
          userIdeaList:state.userIdea}
}

export default connect(mapStateToProps, {getAllIdeas, getUserIdeas})(Landing);