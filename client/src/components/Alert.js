import React from 'react';
import {Message, Button} from 'semantic-ui-react';
import {connect} from 'react-redux';
import {removeAlert} from '../actions'
import '../styles/Alert.css'
const Alert = (props)=>{
    const {message, type, show} = props.alert;
    
    return (<div className="alert">
            {show?<Message color={type==="success"?"green":"red"} ><Message.Header className="content">{message}
                <Button basic style={{boxShadow:'none'}} icon="close" onClick={props.removeAlert}/>
            </Message.Header></Message>:null}
    </div>);
};
const mapStateToProps=(state)=>{
    return {alert: state.alert}
};
export default connect(mapStateToProps, {removeAlert})(Alert);