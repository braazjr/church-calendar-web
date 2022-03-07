import React from 'react'
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import { Col, Row } from 'react-bootstrap'
import moment from 'moment';

import Aux from '../../hoc/_Aux'
import { getTasks } from '../../services/tasks.service'

class Calendar extends React.Component {
    state = {
        events: []
    }

    async componentDidMount() {
        let tasks = await getTasks()
        const userLogged = {
            id: 'F78BWrquvISRXa61FxYVy9oicJ42',
            ministers: [
                'j4VAtix3PgGwL81eRhn2',
                '7Z4vpetGKSvqfNJpuxss',
                'XYZ1e3yP5pRMXpHlqfcD',
                'JQtrg0giWVlepscv7bxP'
            ],
            ministersLead: [
                '7Z4vpetGKSvqfNJpuxss'
            ]
        }

        const events = tasks
        // .filter(task => userLogged.ministersLead.includes(task.minister.id)
        //     || (userLogged.ministers.includes(task.minister.id) && userLogged.id == task.ministry.id))
        .map(task => ({
            title: `[${moment(task.date.toDate()).format('HH:mm')}] ${task.ministry.name}`,
            date: moment(task.date.toDate()).format('yyyy-MM-DD'),
            color: task.minister.color
        }))


        this.setState({ events })
    }

    render() {
        const { events } = this.state
        console.log('events', events)
        return (
            <Aux>
                <Row>
                    <Col md={12}>
                        <FullCalendar
                            plugins={[dayGridPlugin]}
                            initialView="dayGridMonth"
                            events={events}
                            progressiveEventRendering={true}
                            height={650}
                            eventClick={console.log}
                        />
                    </Col>
                </Row>
            </Aux>
        )
    }
}

export default Calendar;