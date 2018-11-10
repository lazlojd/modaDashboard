import React, { Component } from 'react';
import { Badge,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Col,
    Row,
    Collapse,
    Fade,
    Form,
    FormGroup,
    Label,
    Input,
    Button,
    Alert,
    Table} from 'reactstrap';
import { AppSwitch } from '@coreui/react'

class Cards extends Component {
  constructor(props) {
    super(props);
    this.handleActivation = this.handleActivation.bind(this)
    this.handleGenerate = this.handleGenerate.bind(this)
    this.onDismiss = this.onDismiss.bind(this)
    this.verifyAccessKey = this.verifyAccessKey.bind(this)
    this.state = {
        accessKey: '',
        authorizedAccessKey: false,
        activateResponse: '',
        generateResponse: '',
        designerInfo: {},
        generateSuccess: false,
        activateVisible: false,
        generateVisible: false,
        designerInfoVisible: false,
    };
  }

  callApi = async (endpoint) => {
          const response = await fetch(endpoint);
          const body = await response.json();

          if (response.status !== 200) throw Error(body.message);

          return body;
     };

  verifyAccessKey() {
    var verified = true;
    if (this.state.accessKey.length == 0) {
        alert("Error - no access key provided")
        verified = false
    }
    else if (!this.state.authorizedAccessKey) {
        alert("Unauthorized access key - to activate this functionality, please input correct access key")
        verified = false
    }
    return verified
  }

  onDismiss(field) {
    if (field == 0)
       this.setState({activateVisible: false});
    else if (field == 1)
       this.setState({generateVisible: false});
  }



  async handleCode(event) {
    let value = event.target.value
    const response = await fetch('/api/codeVerification', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({key: value}),
        });
    const body = await response.json();
    if (body.status != 200)
        this.setState({authorizedAccessKey: false, accessKey: value})
    else
        this.setState({authorizedAccessKey: true,  accessKey: value})
  }

  handleActivation(event) {
        if (!this.verifyAccessKey())
            return;

        this.callApi('/api/activate')
                    .then(res => {
                        console.log(res.message)
                        this.setState({activateResponse: res.message, activateVisible: true})
                    })
                    .catch(err => console.log(err));
  }

  handleGenerate(event) {
       if (!this.verifyAccessKey())
             return;
       this.callApi('/api/generate').then(res => {
           var code = res.message.slice(0, 3)
           if (code != '200')
                this.setState({generateResponse: res.message.replace(code, ""), generateSuccess: false, generateVisible: true})
       })
       .catch(err => console.log(err));
  }

  // Not necessary for version 1.0
  handleIds(event) {
      // TODO
   }

   handleShowDesignerInfo() {
         if (!this.verifyAccessKey())
            return;
         this.callApi('/api/showinfo')
            .then(res => {
                console.log(res)
                this.setState({designerInfo: res, designerInfoVisible: true})
            })
            .catch(err => console.log(err));
   }


  render() {
    var activateMessage = (() => {
        return(<Alert color="success" isOpen={this.state.activateVisible} toggle={() => this.onDismiss(0)}>
                 {this.state.activateResponse}
               </Alert>)
    })

    var generateMessage = (() => {
        var color;
        if (this.state.generateSuccess)
            color = "success"
        else
            color ="danger"

        return(<Alert color={color} isOpen={this.state.generateVisible} toggle={() => this.onDismiss(1)}>
                             {this.state.generateResponse}
                           </Alert>)
     })

    var accessKeyIndication = (() => {
        var color;
        if (this.state.authorizedAccessKey)
            return "bg-success"
        else
            return "bg-warning"

        return
    })

    var appSwitch = (() => {
        if (!this.state.authorizedAccessKey) {
            return (<AppSwitch
            className={'justify-center mb-0'}
            label color={'info'} size={'lg'}
            onChange={(e) => this.handleActivation(e)} disabled/>)
        } else {

            return(<AppSwitch
            className={'justify-center mb-0'}
            label color={'info'} size={'lg'}
            onChange={(e) => this.handleActivation(e)}/>)
        }

    })

    var designerInfo = (() => {
        var values = []
        var choices = ''
        for (var designer in this.state.designerInfo){
            var current = this.state.designerInfo[designer].choices
            for (let i = 0; i < current.length; i++) {
                var models = 'Model ' + i + ': '
                for (let j = 0; j < current[i].length; j++) {
                    models += current[i][j] + " | "
                }
                choices += models.slice(0, -2) + "\n"
            }
            console.log(designer)
            values.push(
                <tr>
                 <td>{designer}</td>
                 <td>{this.state.designerInfo[designer].info[0]}</td>
                 <td>{this.state.designerInfo[designer].info[1]}</td>
                 <td>{this.state.designerInfo[designer].info[2]}</td>
                 <td>{this.state.designerInfo[designer].info[3]}</td>
                 <td>{choices}</td>
                </tr>
            )
            choices = ''
        }

        return values
    })

    var designerInfoTable = (() => {
        console.log(this.state.designerInfoVisible && this.state.authorizedAccessKey)
        if (this.state.designerInfoVisible) {
            return(<Card> <CardBody>
                <Table responsive striped>
                    <thead>
                         <tr>
                           <th>Code</th>
                           <th>Name</th>
                           <th>Year</th>
                           <th>Email</th>
                           <th>Number</th>
                           <th>Choices (Ordered by choice number</th>
                         </tr>
                    </thead>
                    <tbody>
                        {designerInfo()}
                    </tbody>
                    </Table></CardBody> </Card>)
        }
    })

    return (
      <div className="animated fadeIn">
        <Card className={accessKeyIndication()}>
          <CardBody>
          <Form inline>
            <Label htmlFor="adminCode" className="pr-1"> Admin access key</Label>
            <Input type="text" id="adminCode" value={this.state.accessKey} onChange={(e) => this.handleCode(e)}/>
           </Form>
           </CardBody>
        </Card>

          <Card className="card-accent-primary">
            <CardHeader>
              Activate model decision submissions
            </CardHeader>
            <CardBody>
              Allow models to submit their ranked model preferences and view their choices.
            </CardBody>
            <CardFooter>
             {appSwitch()}
            </CardFooter>
          </Card>

          {activateMessage()}
          <Card className="card-accent-secondary">
              <CardHeader>
                Generate matching
              </CardHeader>
                <CardBody>
                  Generate designer - model matching based on matching algorithm and view results.
                </CardBody>
                <CardFooter>
                    <Button type="submit" size="sm" color="info" onClick = {() => this.handleGenerate()}><i className="fa icon-share"></i> Generate</Button>
                </CardFooter>
          </Card>
          {generateMessage()}
          <Card className="card-accent-warning">
            <CardHeader>
              Spreadsheet ID's
            </CardHeader>
            <CardBody>
              Enter the spreadsheet ID's of the google sheets with designer info and the google sheet
              with the model call form information -- NOT implemented in this version
            </CardBody>
            <CardFooter>
             <Form action="" inline>
                  <FormGroup className="pr-1">
                    <Label htmlFor="id1" className="pr-1">Model Form</Label>
                    <Input type="text" id="id1" required />
                  </FormGroup>
                  <FormGroup className="pr-1 text-right">
                    <Label htmlFor="id2" className="pr-1">Designer Form</Label>
                    <Input type="text" id="id2" required />
                  </FormGroup>
                  <Button type="submit" size="sm" color="primary"><i className="fa fa-dot-circle-o"></i> Submit</Button>
              </Form>
            </CardFooter>
          </Card>
          <Card className="card-accent-info">
            <CardHeader>
              Download CSV
            </CardHeader>
              <CardBody>
                Generate and download excel file of selected models, all their associated information,
                and the designer that selected them
              </CardBody>
              <CardFooter>
                  <Button type="submit" size="sm" color="info" onClick = {() => this.handleGenerate()}><i className="fa icon-share"></i> Generate</Button>
              </CardFooter>
          </Card>
          <Card className="card-accent-secondary">
            <CardHeader>
              Show designer information
            </CardHeader>
              <CardBody>
                 Show designer information from designer spreadsheet along with designer code
              </CardBody>
              <CardFooter>
                  <Button type="submit" size="sm" color="info" onClick = {() => this.handleShowDesignerInfo()}><i className="fa icon-eye"></i> Show</Button>
              </CardFooter>
          </Card>
          {designerInfoTable()}
      </div>
    );
  }
}

export default Cards;
