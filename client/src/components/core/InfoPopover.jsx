import React from 'react'
import 'antd/dist/antd.css'
import { Popover } from 'antd'
import { InfoCircleFilled } from '@ant-design/icons'

const InfoPopover = (props) => {

    const hover_title = props.hover_title
    const hover_content = props.hover_content
    
    const [hovered, set_hovered] = React.useState(false)

    const handle_hover_change = (visible) => {
        set_hovered(visible)
    };

    return (

        <Popover
            style={{ width: 300 }}
            content={hover_content}
            title={hover_title}
            trigger="hover"
            visible={hovered}
            onVisibleChange={handle_hover_change}
        >
            <InfoCircleFilled />
        </Popover>
        
    )
}

export default InfoPopover