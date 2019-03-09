import React, { Component } from 'react';
import classNames from 'classnames';
import { Row,
    Col,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Button,
    Table,
    Input,
    Form,
    FormGroup,
    Label,
    FormText,
    Alert} from 'reactstrap'

import Dashboard from '../../Dashboard'


class Colors extends Component {
  constructor(props) {
    super(props);

    this.addCol = this.addCol.bind(this)
    this.addRow = this.addRow.bind(this)
    this.handleInput = this.handleInput.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.onDismiss = this.onDismiss.bind(this);
    // model choice array will represent the choices as such
    // [1st Model choices, 2nd model choices, 3rd model choices, ..]
    // Designers choose multiple models in the case that they do not
    // get their first choice
    this.state = {
        additionalColumns: 0,
        additionalRows: 0,
        designerCode: '',
        modelChoices: [[], [], []],
        submitSuccess: false,
        responseMessage: '',
        visible: true
    };
  }

  onDismiss() {
      this.setState({ visible: false });
  }

  handleInput(event, modelChoice, selectionNumber) {
    // if modelChoice is less then 0, we are dealing with designerCode
    if (modelChoice < 0) {
      this.setState({designerCode: event.target.value})
    } else {
      //console.log("handleinput: " + modelChoice + " , " + selectionNumber)
      var list = this.state.modelChoices
      list[modelChoice][selectionNumber] = event.target.value
      this.setState({
          modelChoices: list
      })
        //console.log(list)
    }
  }

  addCol() {
    //console.log("entered?")
    var list = this.state.modelChoices
    list.push([])
    this.setState(
        {additionalColumns: this.state.additionalColumns + 1,
          modelChoices: list});
    //console.log("done? " + this.state.modelChoices[0])
  }

  addRow() {
      this.setState(
          {additionalRows: this.state.additionalRows + 1});
  }

  async handleSubmit() {
    const response = await fetch('/api/selection', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({code: this.state.designerCode , choices: this.state.modelChoices}),
    });
    const body = await response.text();
    var code = body.slice(0, 3)
    if (code != '200')
      this.setState({submitSuccess: false, responseMessage: body.replace(code, ""), visible: true})
    else
      this.setState({submitSuccess: true, responseMessage: body.replace(code, ""), visible: true})


  };

  

  render() {

    // const { className, children, ...attributes } = this.props
    const { className, children } = this.props

    const classes = classNames(className, 'theme-color w-75 rounded mb-3')

    var successMessage = (() => {
      console.log(this.state.submitSuccess + " -- " + this.state.responseMessage)
      if (this.state.submitSuccess) {
        return (<Alert color="success" isOpen={this.state.visible} toggle={this.onDismiss}>
                          {this.state.responseMessage}
                        </Alert>)
      } else if (!this.state.submitSuccess && this.state.responseMessage != '') {
        return (<Alert color="danger" isOpen={this.state.visible} toggle={this.onDismiss}>
                           {this.state.responseMessage}
                        </Alert>)
      }

    })


    var moreRows = (() => {
      var rows = []
      for (let i = 0; i < this.state.additionalRows; i++) {
        rows.push(
            <tr>
              <td>Selection {4 + i}</td>
              <td><Input type="number" id="name" placeholder="Model Number"
                         value={this.state.modelChoices[0][3 + i]}
                         onChange={(event) => this.handleInput(event, 0, 3 + i)} min="1"/></td>
              <td><Input type="number" id="name" placeholder="Model Number"
                         value={this.state.modelChoices[1][3 + i]}
                         onChange={(event) => this.handleInput(event, 1, 3 + i)} min="1"/></td>
              <td><Input type="number" id="name" placeholder="Model Number"
                         value={this.state.modelChoices[2][3 + i]}
                         onChange={(event) => this.handleInput(event, 2, 3 + i)} min="1"/></td>
              {moreColumns(i + 3)}
            </tr>
        )
      }
      return rows
    })


    var moreColumns = ((selectionNo) => {
      var columns = []
     
      //console.log(this.state.additionalColumns)
      for (let i = 0; i < this.state.additionalColumns; i++) {
        console.log("input params " + (i + 3) + " , " + i)
          columns.push(
            <td><Input type="number" id="name" placeholder="Model Number"
                                     value={this.state.modelChoices[i + 3][selectionNo]}
                                     onChange={(event) => this.handleInput(event, i + 3, selectionNo)}
                                     min="1"
            /></td>
        )
      }
      //console.log(i)
      return columns
    })

    var moreColHeaders = (() => {
        var headers = []
        for (let i = 0; i < this.state.additionalColumns; i++) {
            headers.push(
                <th>Model {4 + i}</th>
            )
        }
        return headers
    })
    var cardWidth = {width: 1000} 
    return (
      <div>
      <Row>
      <Col>
        <Form onSubmit={() => this.handleSubmit()}>
            <Card>
                <CardHeader>
                    <i className="fa fa-align-justify"></i> Your Model Choices
                </CardHeader>
                <CardBody>
                    <Table responsive>
                        <thead>
                        <tr>
                            <th></th>
                            <th>Model 1</th>
                            <th>Model 2</th>
                            <th>Model 3</th>
                            {moreColHeaders()}
                            <th><i className="icon-plus icons font-2xl d-block" onClick={() => this.addCol()}></i></th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>Selection 1</td>
                            <td><Input type="number" id="name" placeholder="Model Number"
                                       required value={this.state.modelChoices[0][0]}
                                       onChange={(event) => this.handleInput(event, 0, 0)} min="1"/></td>
                            <td><Input type="number" id="name" placeholder="Model Number"
                                       required value={this.state.modelChoices[1][0]}
                                       onChange={(event) => this.handleInput(event, 1, 0)} min="1"/></td>
                            <td><Input type="number" id="name" placeholder="Model Number"
                                       required value={this.state.modelChoices[2][0]}
                                       onChange={(event) => this.handleInput(event, 2, 0)} min="1"/></td>
                            {moreColumns(0)}
                           
                        </tr>
                        <tr>
                            <td>Selection 2</td>
                            <td><Input type="number" id="name" placeholder="Model Number"
                                       required value={this.state.modelChoices[0][1]}
                                       onChange={(event) => this.handleInput(event, 0, 1)} min="1"/></td>
                            <td><Input type="number" id="name" placeholder="Model Number"
                                       required value={this.state.modelChoices[1][1]}
                                       onChange={(event) => this.handleInput(event, 1, 1)} min="1"/></td>
                            <td><Input type="number" id="name" placeholder="Model Number"
                                       requiredvalue={this.state.modelChoices[2][1]}
                                       onChange={(event) => this.handleInput(event, 2, 1)} min="1"/></td>
                            {moreColumns(1)}
                           
                        </tr>
                        <tr>
                            <td>Selection 3</td>
                            <td><Input type="number" id="name" placeholder="Model Number"
                                       required value={this.state.modelChoices[0][2]}
                                       onChange={(event) => this.handleInput(event, 0, 2)} min="1"/></td>
                            <td><Input type="number" id="name" placeholder="Model Number"
                                       required value={this.state.modelChoices[1][2]}
                                       onChange={(event) => this.handleInput(event, 1, 2)} min="1"/></td>
                            <td><Input type="number" id="name" placeholder="Model Number"
                                       required value={this.state.modelChoices[2][2]}
                                       onChange={(event) => this.handleInput(event, 2, 2)} min="1"/></td>
                            {moreColumns(2)}
                           
                        </tr>
                        {moreRows()}
                        <tr>
                            <td><i className="icon-plus icons font-2xl d-block" onClick={() => this.addRow()}></i></td>
                        </tr>
                        </tbody>
                    </Table>
                     <hr />
                    <FormGroup row>
                      <Col md="3">
                        <Label htmlFor="text-input">Code</Label>
                      </Col>
                      <Col xs="12" md="9">
                        <Input type="text" id="code" name="codeInput" 
                            placeholder="Your designer code"
                            required value={this.state.designerCode}
                            onChange={(event) => this.handleInput(event, -1, 0)}/>
                        <FormText color="muted">First 3 letters of first name + year in college + first 3 letters of email</FormText>
                      </Col>
                    </FormGroup>
                </CardBody>
                <CardFooter>
                    <Button type="submit" size="sm" color="primary"><i className="fa fa-dot-circle-o"></i> Submit</Button>
                </CardFooter>
            </Card>

        </Form>
        </Col>
        <Col>
            <Dashboard></Dashboard>
        </Col>
        </Row>

      <Row>
        {successMessage()}
      </Row>
      </div>
    )
  }
}


export default Colors;
