import React from 'react';
import { Tab } from 'semantic-ui-react';
import '../styles/Landing.css';
import ListIdea from './ListIdea';
import NewIdea from './NewIdea';

const Landing =()=>{
    const panes = [
        {
          menuItem: 'All',
          render: () => <Tab.Pane attached={false}><ListIdea/></Tab.Pane>,
        },
        {
          menuItem: 'Manage',
          render: () => <Tab.Pane attached={false}>Tab 2 Content</Tab.Pane>,
        },
        {
          menuItem: 'Create',
          render: () => <Tab.Pane attached={false}><NewIdea/></Tab.Pane>,
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

export default Landing;