import React from 'react';
import { Row, Col, Card, Table, Button, Badge } from 'react-bootstrap';

import Aux from "../hoc/_Aux";

import { getMinisters } from '../services/ministers.service';

class Ministers extends React.Component {
    state = {
        ministers: [],
    }

    async componentDidMount() {
        const ministers = await getMinisters()
        console.log(ministers)
        this.setState({ ministers })
    }

    render() {
        const { ministers } = this.state
        console.log('ministers', ministers)

        return (
            <Aux>
                <Row>
                    <Col md={12}>
                        <Card>
                            <Card.Header>
                                <Card.Title as="h5">ministérios</Card.Title>
                                {/* <span className="d-block m-t-5">use props <code>striped</code> with <code>Table</code> component</span> */}
                            </Card.Header>
                            <Card.Body
                                style={{
                                    paddingTop: 10,
                                }}>
                                <Row>
                                    <Col md={12} style={{
                                        textAlign: 'end',
                                    }}>
                                        <Button
                                            type={'submit'}
                                            variant={'primary'}
                                            size={'sm'}
                                            style={{
                                                marginRight: 50,
                                                marginBottom: 10,
                                            }}
                                            onClick={() => {
                                                this.props.history.push(`ministers/cadastro`)
                                            }}>
                                            criar novo
                                        </Button>
                                    </Col>
                                </Row>
                                <Table striped responsive>
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>name</th>
                                            <th>color</th>
                                            <th>funções</th>
                                            <th>opções</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            ministers.map(minister => (
                                                <tr
                                                    key={minister.id}
                                                >
                                                    <th scope="row">{minister.id}</th>
                                                    <td>{minister.name}</td>
                                                    <td>
                                                        <div
                                                            style={{
                                                                width: 50,
                                                                height: 20,
                                                                backgroundColor: minister.color,
                                                                borderRadius: 20,
                                                            }}
                                                        />
                                                    </td>
                                                    <td>
                                                        {minister.functions.map(f => (
                                                            <Badge
                                                                key={f}
                                                                variant="secondary"
                                                                style={{
                                                                    marginLeft: 3,
                                                                    marginRight: 3,
                                                                }}
                                                            >
                                                                {f}
                                                            </Badge>
                                                        ))}
                                                    </td>
                                                    <td>
                                                        <Button
                                                            // className="btn btn-primary btn-sm"
                                                            variant={'primary'}
                                                            size={'sm'}
                                                            // href={`/datta-able/react/default/ministers/${minister.id}`}
                                                            onClick={() => {
                                                                this.props.history.push(`ministers/${minister.id}`)
                                                            }}>
                                                            editar
                                                        </Button>
                                                        <Button variant={'danger'} size={'sm'}>excluir</Button>
                                                    </td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </Table>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Aux>
        );
    }
}

export default Ministers;