import React, {useState} from 'react';
import {Form, Dropdown, Input} from 'semantic-ui-react';
import '../styles/NewIdea.css'
import {connect} from 'react-redux';
import {createIdea} from '../actions';

const NewIdea=({createIdea, idea, mode})=>{
    
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        tags:'',
        date:'',
        time:'',
        hrs:0,
        mms:0
      });
    React.useEffect(()=>{if(mode==="edit"){
        const dateTime = new Date(idea.startDate).toISOString().split('T');
        const time = dateTime[1].split(':');
        setFormData({title:idea.title,
        description:idea.description,
        tags:idea.tags.join(),
        date:dateTime[0],
        time:`${time[0]}:${time[1]}`,
        hrs: idea.duration.split(':')[0],
        mms: idea.duration.split(':')[1]});
    }}, [mode,idea]);
    const onChange = e =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async ()=>{
        const newIdea = {
            title:formData.title,
            description:formData.description,
            tags:formData.tags.split(','),
            startDate: Date.parse(`${formData.date}T${formData.time}`),
            duration: `${formData.hrs}:${formData.mms}`
        }
        await createIdea(newIdea)
    }
    return (
        <Form className="new-idea">   
            <Form.Input label='Title' placeholder='Title' name="title" value={formData.title} onChange={onChange} />
            <Form.TextArea rows={7} label='Description' 
                placeholder='Tell us more about your idea...' name="description" value={formData.description} onChange={onChange}/>
            <Form.Input label='Tags' placeholder='Ex: feature,tech,etc...'  name="tags" onChange={onChange} />
            <Form.Group className="time" widths='equal' inline >
                <Form.Input label='Start Date' type='date' name="date" value={formData.date} onChange={onChange}/>
                <Form.Input label='Start Time' type='time' name="time" value={formData.time} onChange={onChange}/>
            </Form.Group>
            <Form.Field inline>
                    <label>Duration</label>
                    <Input className="duration" type='number' label={{ basic: true, content: 'hr' }} labelPosition='right'
                        placeholder='00' name="hrs" value={formData.hrs} onChange={onChange} />
                    <Input className="duration" type='number' value={formData.mms} label={{ basic: true, content: 'mm' }} labelPosition='right'
                        placeholder='00' name="mms" onChange={onChange} />  
            </Form.Field>
            <Form.Button positive onClick={onSubmit}>Submit</Form.Button>
        </Form>
    );
};

export default connect(null, {createIdea})(NewIdea);