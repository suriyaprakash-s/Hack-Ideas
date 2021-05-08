import React, {useState} from 'react';
import {Form, Dropdown, Input} from 'semantic-ui-react';
import '../styles/NewIdea.css'

const NewIdea=({readMode})=>{
    const tags=[{key: 'Feature', text: 'Feature', value: 'Feature'},
    {key: 'Tech', text: 'Tech', value: 'Tech'}];
    const tag=(data)=>{
        tags.push({key: data.value, text: data.value, value: data.value});
    }
    return (
        <Form className="new-idea">   
            <Form.Input readOnly={readMode} label='Title' placeholder='Title' />
            <Form.TextArea readOnly={readMode} rows={7} label='Description' placeholder='Tell us more about your idea...' />
            <Form.Field>
                <label>Tags</label>
                <Dropdown disabled={readMode} style={{opacity:'1'}} value={['Feature','Tech']} placeholder='Select tags'search selection multiple allowAdditions
                onAddItem={(event, data) => tag(data)}
                options={tags} />
            </Form.Field>
            <Form.Group className="time" widths='equal' inline >
                <Form.Input readOnly={readMode} label='Start Date' type='date'/>
                <Form.Input readOnly={readMode} label='Start Time' type='time'/>
            </Form.Group>
            <Form.Field inline>
                    <label>Duration</label>
                    <Input className="duration" readOnly={readMode} type='number' label={{ basic: true, content: 'hr' }} labelPosition='right'
                        placeholder='00' />
                    <Input className="duration" readOnly={readMode} type='number' label={{ basic: true, content: 'mm' }} labelPosition='right'
                        placeholder='00' />  
            </Form.Field>
            <Form.Button positive>Submit</Form.Button>
        </Form>
    );
};

export default NewIdea;