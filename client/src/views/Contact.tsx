import React from 'react'
import 'antd/dist/antd.css'
import { Button, Input, Alert } from 'antd'
import '../css/Contact.css'

const { TextArea } = Input;

interface Props {
    
}
const Contact: React.FC<Props> = (props) => {

    const [message, setMessage] = React.useState('')
    const [show_error_alert, set_show_error_alert] = React.useState<boolean>(false)
    const [show_success_alert, set_show_success_alert] = React.useState<boolean>(false)

    const submit = () => {
        
        window.Email.send({
            Host : "smtp.gmail.com",
            Username : 'revsguy5@gmail.com',
            Password: process.env.REACT_APP_GMAIL_PASSWORD as string,
            To : 'revsguy5@gmail.com',
            From : 'revsguy5@gmail.com',
            Subject : 'new sound county message',
            Body : message,
        })
            .then( (message: any) => {
                set_show_success_alert(true)
            }).catch( (err: Error) => {
                set_show_error_alert(true)
                console.log(err)
            })
    }

    return (
        <div id='contact-root'>
            
            <span className='contact-text'>
                Have any idea as to how we could improve? Let us know!
            </span>

            <div id='contact-input-container'>

                { show_error_alert && <div style={{marginBottom: '1rem'}}>
                    <Alert showIcon message={'oops... something went wrong'} type='error' />
                </div> }
                { show_success_alert && <div style={{marginBottom: '1rem'}}>
                    <Alert showIcon message={'success... thank you for your feedback!'} type='success' />
                </div> }

                <TextArea id='contact-input' onChange={(e) => { setMessage(e.target.value) }} autoSize={{ minRows: 8, maxRows: 20}} placeholder='message'/>
                <Button className='default-button' style={{width: '120px', marginTop: '1.5rem'}} onClick={submit} > send </Button>
                
            </div>
            
        </div>
    )
}

export default Contact