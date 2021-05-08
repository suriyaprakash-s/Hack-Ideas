import React from 'react';
import {Label, Button, Icon} from 'semantic-ui-react';
import '../styles/Detail.css'

const Detail = ({title, startDate, duration, votes})=>{
    const tags=['feature', 'tech'];
    const description= "The web is a powerful place. Cliché, we know. But true nonetheless. Since no one can argue with kindness, we wanted to create a challenge that would harness that power and result in web apps for a good cause.So join us. Build a web app that will make the world a better place. It can be an app that impacts the world or a local community. Goodness no matter the scope is good.We don’t want to leave you hanging. We understand that sometimes coming up with the app idea is actually the hardest part.  So we’re sharing a few of our ideas. Use any or all of them. Or come up with your own. Apps will be judged on their merit – choosing one of our ideas will not help or hinder your chances of winning."
    return(
        <React.Fragment>
            <span className='detail-title detail-padding'><h3>{title}</h3>
                <Button as='div' labelPosition='right'>
                    <Button icon>
                        <Icon name='thumbs up' />
                        Votes
                    </Button>
                    <Label as='a' basic pointing='left'>
                        {votes}
                    </Label>
                </Button>
            </span>
            <p className='detail-desc'>{description}</p>
            <div className='detail-padding'>
                {tags.map((tag) => (
                    <Label color={'grey'} key={tag}>
                        {tag}
                    </Label>
                ))}
            </div>
            <span className='detail-time detail-padding'> <h5>Start Time:</h5>&nbsp;{new Date(startDate).toLocaleString()} </span>
            <span className='detail-time detail-padding'> <h5>Duration:</h5>&nbsp;{duration} </span>
        </React.Fragment>
    );
};

export default Detail;