import React from 'react'
import 'antd/dist/antd.css'
import { Button, Input, Typography, Alert } from 'antd'
import './Contact.css'

const { TextArea } = Input;

interface Props {
    
}
const Contact: React.FC<Props> = (props) => {

    const [message, setMessage] = React.useState('')
    const [showErrorAlert, setShowErrorAlert] = React.useState<boolean>(false)
    const [showSuccessAlert, setShowSuccessAlert] = React.useState<boolean>(false)

    const submit = () => {
        fetch('/contact', {
            method: 'POST',
            body: JSON.stringify({
                content: message
            })
        })
        .then(() => {
            setShowSuccessAlert(true)
            setShowErrorAlert(false)
        })
        .catch(() => {
            setShowSuccessAlert(false)
            setShowErrorAlert(true)
        })
    }

    return (
        <div id='contact-root'>
            <div id='input-container'>
                { showErrorAlert && <div>
                    <Alert showIcon message={'oops... something went wrong'} type='error' />
                </div> }
                { showSuccessAlert && <div>
                    <Alert showIcon message={'success... thank you for your feedback!'} type='success' />
                </div> }
                <div>
                    <TextArea onChange={(e) => { setMessage(e.target.value) }} autoSize={{ minRows: 4, maxRows: 8 }} id='messageInput' placeholder='message'/>
                </div>
                <div>
                    <Button onClick={submit} type='primary' > send </Button>
                </div>
            </div>
            <span>
                <Typography >
                    Have any idea as to how we could improve? Let us know!
                </Typography>
            </span>
        </div>
    )
}

export default Contact