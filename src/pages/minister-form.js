import React from 'react';
import { Row, Col, Card, Form, Button, Badge, InputGroup, FormControl } from 'react-bootstrap';
import { Formik } from 'formik';

import Aux from "../hoc/_Aux";
import { getMinisterById } from '../services/ministers.service';

class MinisterForm extends React.Component {
    state = {
        minister: {
            id: undefined,
            name: undefined,
            color: undefined,
            functions: undefined
        }
    }

    async componentDidMount() {
        const { pathname } = this.props.location
        if (pathname.startsWith('/ministers')) {
            const id = pathname.split('/')[2]
            console.log(id)

            const minister = await getMinisterById(id)
            this.setState({ minister: { ...minister, functions: minister.functions.map(func => ({ name: func, saved: true })) } })
        } else {
            this.props.history.push('/datta-able/react/default/ministers')
        }
    }

    async saveMinister(minister) {
        minister.functions = minister.functions.map(f => f.name)
        delete minister.newFunction
        console.log('minister', minister)
    }

    generateNewColor() {
        return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    }

    render() {
        const { minister } = this.state
        console.log('minister', minister)

        return (
            <Aux>
                <Row>
                    <Col md={12}>
                        <Card>
                            <Card.Body>
                                {
                                    minister.id && (
                                        <Formik
                                            enableReinitialize={true}
                                            initialValues={{ ...minister, newFunction: '' }}
                                            onSubmit={(values, { setSubmitting }) => {
                                                setTimeout(() => {
                                                    this.saveMinister({ ...values })
                                                    setSubmitting(false);
                                                }, 1000);
                                            }}
                                        >
                                            {({
                                                values,
                                                handleChange,
                                                handleSubmit,
                                                isSubmitting,
                                                setFieldValue,
                                            }) => (
                                                <Form onSubmit={handleSubmit}>
                                                    <Row>
                                                        <Col md={6}>
                                                            <Form.Group controlId="exampleForm.ControlInput1">
                                                                <Form.Label>name</Form.Label>
                                                                <Form.Control
                                                                    type="text"
                                                                    placeholder="nome"
                                                                    name="name"
                                                                    onChange={handleChange}
                                                                    value={values.name} />
                                                            </Form.Group>
                                                        </Col>
                                                        <Col md={6}>
                                                            <label style={{
                                                                marginBottom: '0.3rem'
                                                            }}>
                                                                cor
                                                            </label>
                                                            <InputGroup
                                                                style={{
                                                                    borderRadius: '20px'
                                                                }}>
                                                                <InputGroup.Prepend>
                                                                    <InputGroup.Text onClick={() => {
                                                                        setFieldValue('color', this.generateNewColor())
                                                                    }}>
                                                                        <i className="feather icon-refresh-cw" />
                                                                    </InputGroup.Text>
                                                                </InputGroup.Prepend>
                                                                <FormControl
                                                                    placeholder="selecione uma cor"
                                                                    aria-label="cor"
                                                                    name="color"
                                                                    onChange={handleChange}
                                                                    value={values.color}
                                                                    style={{
                                                                        backgroundColor: values.color
                                                                    }}
                                                                />
                                                            </InputGroup>
                                                        </Col>
                                                        <Col md={12}>
                                                            <Form.Group controlId="exampleForm.ControlInput1">
                                                                <Form.Label>funções</Form.Label>
                                                                <Form.Control
                                                                    type="text"
                                                                    placeholder="digite uma nova função"
                                                                    name="newFunction"
                                                                    onChange={handleChange}
                                                                    value={values.newFunction}
                                                                    onKeyPress={event => {
                                                                        if (event.charCode == 13) {
                                                                            console.log(values.newFunction)
                                                                            values.functions.push({ name: values.newFunction, saved: false })
                                                                            console.log('values.functions', values.functions)
                                                                            setFieldValue('functions', values.functions)
                                                                            setFieldValue('newFunction', '')
                                                                        }
                                                                    }}
                                                                    autoComplete={'off'} />
                                                            </Form.Group>

                                                            {
                                                                values.functions.map(func => (
                                                                    <Button key={func.name} variant={'primary'} size={'sm'}>
                                                                        {func.name.toLowerCase()}
                                                                        <Badge variant="light" className="ml-1" onClick={() => {
                                                                            let functions = values.functions.filter(f => f.name != func.name)
                                                                            setFieldValue('functions', functions)
                                                                        }}>
                                                                            <i className="feather icon-trash" />
                                                                        </Badge>
                                                                    </Button>
                                                                ))
                                                            }
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col md={12} style={{
                                                            textAlign: 'end'
                                                        }}>
                                                            <Button type={'submit'} variant={'primary'} size={'sm'} disabled={isSubmitting}>salvar</Button>
                                                        </Col>
                                                    </Row>
                                                </Form>
                                            )}
                                        </Formik>
                                    )
                                }
                            </Card.Body>
                        </Card >
                    </Col>
                </Row>
            </Aux>
        );
    }
}

export default MinisterForm;