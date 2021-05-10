import React, {useState} from 'react';
import {Form, Button, Input} from 'semantic-ui-react';
import '../styles/NewIdea.css'
import {connect} from 'react-redux';
import {createIdea, updateIdea} from '../actions';
import Alert from './Alert';

const NewIdea=({createIdea, updateIdea, idea, mode, goBack})=>{
    
    const [formData, setFormData] = useState({
        title: '', description: '', tags:'', date:'', time:'', hrs:0, mms:0});
    const [errorData, setErrorData] = useState({
        title:false, description:false, date:false, time:false, duration:false});

    React.useEffect(()=>{if(mode==="edit"){
        const dateTime = new Date(idea.startDate).toISOString().split('T');
        const time = dateTime[1].split(':');
        setFormData({title:idea.title,
        description:idea.description,
        tags:idea.tags,
        date:dateTime[0],
        time:`${time[0]}:${time[1]}`,
        hrs: idea.duration.split(':')[0],
        mms: idea.duration.split(':')[1]});
    }}, [mode,idea]);
    const onChange = e =>
        setFormData({ ...formData, [e.target.name]: e.target.value });
    const onSubmit = ()=>{
        let noError = true;
        if(!formData.title || !formData.description || !formData.date || !formData.time 
            || (!formData.hrs && !formData.mms) || formData.hrs < 0 || formData.mms<0|| formData.mms>59){
            noError=false;
            setErrorData({ title: !formData.title, description: !formData.description, date:!formData.date,
                time:!formData.time, duration:(!formData.hrs && !formData.mms)|| formData.hrs < 0 || formData.mms<0|| formData.mms>59});
        }
        
        if(noError)
        {
            const newIdea = {
                title:formData.title,
                description:formData.description,
                tags:formData.tags,
                startDate: Date.parse(`${formData.date}T${formData.time}`),
                duration: `${formData.hrs}:${formData.mms}`
            }
            if(mode==="edit")
                updateIdea(newIdea, idea._id);
            else
                createIdea(newIdea);
        }
       
    }
    return (
        <Form className="new-idea" error>
            <Form.Input label='Title' placeholder='Title' name="title" value={formData.title} onChange={onChange} 
                error={errorData.title} autoComplete="off"/>
            <Form.TextArea rows={7} label='Description' 
                placeholder='Tell us more about your idea...' name="description" value={formData.description}
                 onChange={onChange} error={errorData.description}/>
            <Form.Input label='Tags' placeholder='Ex: feature,tech,etc...'  name="tags" onChange={onChange} 
                value={formData.tags} autoComplete="off" />
            <Form.Group className="time" widths='equal' inline>
                <Form.Input label='Start Date' type='date' name="date" value={formData.date} onChange={onChange}
                    error={errorData.date}/>
                <Form.Input label='Start Time' type='time' name="time" value={formData.time} onChange={onChange}
                    error={errorData.time}/>
            </Form.Group>
            <Form.Field inline error={errorData.duration}>
                    <label>Duration</label>
                    <Input className="duration" type='number' label={{ basic: true, content: 'hr' }} labelPosition='right'
                        placeholder='00' name="hrs" min="0" value={formData.hrs} onChange={onChange} />
                    <Input className="duration" type='number' value={formData.mms} label={{ basic: true, content: 'mm' }} labelPosition='right'
                        placeholder='00' name="mms" min="0" max="59" onChange={onChange} />  
            </Form.Field>
            <Form.Group inline>

            {mode==="edit"&&<Form.Button negative basic onClick={goBack}>Back</Form.Button>}
            <Form.Button positive basiconClick={onSubmit}>{mode==="edit"?"Update":"Create"}</Form.Button>
            </Form.Group>
            <Alert></Alert>
        </Form>
    );
};

export default connect(null, {createIdea, updateIdea})(NewIdea);