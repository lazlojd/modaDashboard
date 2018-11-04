import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import { Row,
    Col,
    PaginationItem,
    PaginationLink,
    Pagination,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Button,
    Table,
    Badge,
    Input,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    Form} from 'reactstrap'
import { rgbToHex } from '@coreui/coreui/dist/js/coreui-utilities'


class Colors extends Component {
  constructor(props) {
    super(props);

    this.addCol = this.addCol.bind(this)
    this.addRow = this.addRow.bind(this)
    this.handleInput = this.handleInput.bind(this)
    // model choice array will represent the choices as such
    // [1st Model choices, 2nd model choices, 3rd model choices, ..]
    // Designers choose multiple models in the case that they do not
    // get their first choice
    this.state = {
        additionalColumns: 0,
        additionalRows: 0,
        modelChoices: [[], [], []]
    };
  }

  handleInput(event, modelChoice, selectionNumber) {
    console.log("handleinput: " + modelChoice + " , " + selectionNumber)
    var list = this.state.modelChoices
    list[modelChoice][selectionNumber] = event.target.value
    this.setState({
        modelChoices: list
    })
      console.log(list)
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

  render() {

    // const { className, children, ...attributes } = this.props
    const { className, children } = this.props

    const classes = classNames(className, 'theme-color w-75 rounded mb-3')

    var moreRows = (() => {
      var rows = []
      for (let i = 0; i < this.state.additionalRows; i++) {
        rows.push(
            <tr>
              <td>Selection {4 + i}</td>
              <td><Input type="number" id="name" placeholder="Model Number"
                         value={this.state.modelChoices[0][3 + i]}
                         onChange={(event) => this.handleInput(event, 0, 3 + i)}/></td>
              <td><Input type="number" id="name" placeholder="Model Number"
                         value={this.state.modelChoices[1][3 + i]}
                         onChange={(event) => this.handleInput(event, 1, 3 + i)}/></td>
              <td><Input type="number" id="name" placeholder="Model Number"
                         value={this.state.modelChoices[2][3 + i]}
                         onChange={(event) => this.handleInput(event, 2, 3 + i)}/></td>
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
    return (
        <Row>
        <Form onSubmit={this.handleFormSubmit}>
        <Col xs="12" lg="6">
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
                                       onChange={(event) => this.handleInput(event, 0, 0)}/></td>
                            <td><Input type="number" id="name" placeholder="Model Number"
                                       required value={this.state.modelChoices[1][0]}
                                       onChange={(event) => this.handleInput(event, 1, 0)}/></td>
                            <td><Input type="number" id="name" placeholder="Model Number"
                                       required value={this.state.modelChoices[2][0]}
                                       onChange={(event) => this.handleInput(event, 2, 0)}/></td>
                            {moreColumns(0)}
                            <td></td>
                        </tr>
                        <tr>
                            <td>Selection 2</td>
                            <td><Input type="number" id="name" placeholder="Model Number"
                                       required value={this.state.modelChoices[0][1]}
                                       onChange={(event) => this.handleInput(event, 0, 1)}/></td>
                            <td><Input type="number" id="name" placeholder="Model Number"
                                       required value={this.state.modelChoices[1][1]}
                                       onChange={(event) => this.handleInput(event, 1, 1)}/></td>
                            <td><Input type="number" id="name" placeholder="Model Number"
                                       requiredvalue={this.state.modelChoices[2][1]}
                                       onChange={(event) => this.handleInput(event, 2, 1)}/></td>
                            {moreColumns(1)}
                            <td></td>
                        </tr>
                        <tr>
                            <td>Selection 3</td>
                            <td><Input type="number" id="name" placeholder="Model Number"
                                       required value={this.state.modelChoices[0][2]}
                                       onChange={(event) => this.handleInput(event, 0, 2)}/></td>
                            <td><Input type="number" id="name" placeholder="Model Number"
                                       required value={this.state.modelChoices[1][2]}
                                       onChange={(event) => this.handleInput(event, 1, 2)}/></td>
                            <td><Input type="number" id="name" placeholder="Model Number"
                                       required value={this.state.modelChoices[2][2]}
                                       onChange={(event) => this.handleInput(event, 2, 2)}/></td>
                            {moreColumns(2)}
                            <td></td>
                        </tr>
                        {moreRows()}
                        <tr>
                            <td><i className="icon-plus icons font-2xl d-block" onClick={() => this.addRow()}></i></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        </tbody>
                    </Table>
                </CardBody>
                <CardFooter>
                    <Button type="submit" size="sm" color="primary"><i className="fa fa-dot-circle-o"></i> Submit</Button>
                </CardFooter>
            </Card>
        </Col>
        </Form>
      </Row>
    )
  }
}


export default Colors;
