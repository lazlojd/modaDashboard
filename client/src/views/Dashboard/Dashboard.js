import React, { Component } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import {
  Badge,
  Button,
  ButtonDropdown,
  ButtonGroup,
  ButtonToolbar,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardTitle,
  CardImg,
  CardSubtitle,
  Col,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Progress,
  Row,
  Table,
} from 'reactstrap';
import Widget03 from '../../views/Widgets/Widget03'
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities'

const brandPrimary = getStyle('--primary')
const brandSuccess = getStyle('--success')
const brandInfo = getStyle('--info')
const brandWarning = getStyle('--warning')
const brandDanger = getStyle('--danger')


class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.onRadioBtnClick = this.onRadioBtnClick.bind(this);
    this.render = this.render.bind(this)

    this.state = {
      dropdownOpen: false,
      radioSelected: 2,
      flickrURL: ['https://farm', '.staticflickr.com/', '.jpg'],
      response: [],
      photos: {},
      post: '',
      responseToPost: '',
    };
  }

  componentDidMount() {
        this.callApi()
            .then(res => {this.setState({ response: res.rows});
                console.log(this.state.response);})
            .catch(err => console.log(err));
    }

    callApi = async () => {
        const response = await fetch('/api/hello');
        const body = await response.json();

        if (response.status !== 200) throw Error(body.message);

        return body;
    };

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
    });
  }

  onRadioBtnClick(radioSelected) {
    this.setState({
      radioSelected: radioSelected,
    });
  }

  // hit pull data from backend (which pulls data from source)
  // every


    //
    // handleSubmit = async e => {
    //     e.preventDefault();
    //     const response = await fetch('/api/world', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify({ post: this.state.post }),
    //     });
    //     const body = await response.text();
    //
    //     this.setState({ responseToPost: body });
    // };
  // https://farm{farm-id}.staticflickr.com/{server-id}/{id}_{secret}.jpg
  //   [{"id":"31795935398","owner":"144887162@N03",
  //       "secret":"29e85a6e3c","server":"1972",
  //       "farm":2,"title":"1","ispublic":0,
  //       "isfriend":1,"isfamily":1}]},"stat":"ok"}

  render() {

    var photoItems = this.state.response.map(function(row) {
        return (<Col xs="12" sm="6" md="6" >
            <Card className="border-info">
                <CardHeader>
                    {row[0]}
                </CardHeader>
                <CardBody>
                    <Row>
                        <Col>
                            <CardImg
                                top width="100%" height="100%"
                                src={row[6]}
                                alt="Card image cap" />
                        </Col>
                        <Col>
                           <Row className="mb-5">
                               <Col>
                                   <CardSubtitle> Number:</CardSubtitle>
                                  <h3>{row[1]}</h3>
                               </Col>

                           </Row>
                          <Row className="mb-3">
                              <Col>
                                  <CardSubtitle> Year: </CardSubtitle>
                                  <div>{row[2]}</div>
                              </Col>
                          </Row>
                            <Row className="mb-3">
                                <Col>
                                    <CardSubtitle> Height</CardSubtitle>
                                    <div>{row[3]}</div>
                                </Col>
                            </Row>
                            <Row className="mb-3">
                                <Col>
                                    <CardSubtitle> Shoe size: </CardSubtitle>
                                    <div>{row[4]}</div>
                                </Col>
                            </Row>
                          <Row className="mb-3">
                              <Col>
                                  <CardSubtitle> Pronouns: </CardSubtitle>
                                  <div>{row[5]}</div>
                              </Col>
                          </Row>
                        </Col>
                    </Row>
                </CardBody>
            </Card>
        </Col>)
    })

    return (
      <div className="animated fadeIn">
        <Row>
            {photoItems}
          {/*<Col xs="12" sm="6" md="6" >*/}
            {/*<Card className="border-info">*/}
              {/*<CardHeader>*/}
                {/*Card outline info*/}
              {/*</CardHeader>*/}
              {/*<CardBody>*/}
                {/*<Row>*/}
                  {/*<Col>*/}
                    {/*<CardImg top width="100%" height="100%" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180" alt="Card image cap" />*/}
                  {/*</Col>*/}
                  {/*<Col>*/}
                    {/*Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut*/}
                    {/*laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation*/}
                    {/*ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.*/}
                  {/*</Col>*/}
                {/*</Row>*/}
              {/*</CardBody>*/}
            {/*</Card>*/}
          {/*</Col>*/}
            {/*<Col xs="12" sm="6" md="6" >*/}
                {/*<Card className="border-info">*/}
                    {/*<CardHeader>*/}
                        {/*Card outline info*/}
                    {/*</CardHeader>*/}
                    {/*<CardBody>*/}
                        {/*<Row>*/}
                            {/*<Col>*/}
                                {/*<CardImg top width="100%" height="100%" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180" alt="Card image cap" />*/}
                            {/*</Col>*/}
                            {/*<Col>*/}
                                {/*Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut*/}
                                {/*laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation*/}
                                {/*ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.*/}
                            {/*</Col>*/}
                        {/*</Row>*/}
                    {/*</CardBody>*/}
                {/*</Card>*/}
            {/*</Col>*/}
          {/*<Col xs="12" sm="6" md="4">*/}
            {/*<Card className="border-info">*/}
              {/*<CardHeader>*/}
                {/*Card outline info*/}
              {/*</CardHeader>*/}
              {/*<CardBody>*/}
                {/*<Row>*/}
                  {/*<Col>*/}
                    {/*<CardImg top width="100%" height="100%" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180" alt="Card image cap" />*/}
                  {/*</Col>*/}
                  {/*<Col>*/}
                    {/*Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut*/}
                    {/*laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation*/}
                    {/*ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.*/}
                  {/*</Col>*/}
                {/*</Row>*/}
              {/*</CardBody>*/}
            {/*</Card>*/}
          {/*</Col>*/}
          {/*<Col xs="12" sm="6" md="4">*/}
            {/*<Card className="border-info">*/}
              {/*<CardHeader>*/}
                {/*Card outline info*/}
              {/*</CardHeader>*/}
              {/*<CardBody>*/}
                {/*<Row>*/}
                  {/*<Col>*/}
                    {/*<CardImg top width="100%" height="100%" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180" alt="Card image cap" />*/}
                  {/*</Col>*/}
                  {/*<Col>*/}
                    {/*Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut*/}
                    {/*laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation*/}
                    {/*ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.*/}
                  {/*</Col>*/}
                {/*</Row>*/}
              {/*</CardBody>*/}
            {/*</Card>*/}
          {/*</Col>*/}
          {/*<Col xs="12" sm="6" md="4">*/}
            {/*<Card className="border-info">*/}
              {/*<CardHeader>*/}
                {/*Card outline info*/}
              {/*</CardHeader>*/}
              {/*<CardBody>*/}
                {/*<Row>*/}
                  {/*<Col>*/}
                    {/*<CardImg top width="100%" height="100%" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180" alt="Card image cap" />*/}
                  {/*</Col>*/}
                  {/*<Col>*/}
                    {/*Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut*/}
                    {/*laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation*/}
                    {/*ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.*/}
                  {/*</Col>*/}
                {/*</Row>*/}
              {/*</CardBody>*/}
            {/*</Card>*/}
          {/*</Col>*/}
          {/*<Col xs="12" sm="6" md="4">*/}
            {/*<Card className="border-info">*/}
              {/*<CardHeader>*/}
                {/*Card outline info*/}
              {/*</CardHeader>*/}
              {/*<CardBody>*/}
                {/*<Row>*/}
                  {/*<Col>*/}
                    {/*<CardImg top width="100%" height="100%" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180" alt="Card image cap" />*/}
                  {/*</Col>*/}
                  {/*<Col>*/}
                    {/*Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut*/}
                    {/*laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation*/}
                    {/*ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.*/}
                  {/*</Col>*/}
                {/*</Row>*/}
              {/*</CardBody>*/}
            {/*</Card>*/}
          {/*</Col>*/}
        </Row>






        {/*<Row>*/}
          {/*<Col>*/}
            {/*<Card>*/}
              {/*<CardBody>*/}
                {/*<Row>*/}
                  {/*<Col sm="5">*/}
                    {/*<CardTitle className="mb-0">Traffic</CardTitle>*/}
                    {/*<div className="small text-muted">November 2015</div>*/}
                  {/*</Col>*/}
                  {/*<Col sm="7" className="d-none d-sm-inline-block">*/}
                    {/*<Button color="primary" className="float-right"><i className="icon-cloud-download"></i></Button>*/}
                    {/*<ButtonToolbar className="float-right" aria-label="Toolbar with button groups">*/}
                      {/*<ButtonGroup className="mr-3" aria-label="First group">*/}
                        {/*<Button color="outline-secondary" onClick={() => this.onRadioBtnClick(1)} active={this.state.radioSelected === 1}>Day</Button>*/}
                        {/*<Button color="outline-secondary" onClick={() => this.onRadioBtnClick(2)} active={this.state.radioSelected === 2}>Month</Button>*/}
                        {/*<Button color="outline-secondary" onClick={() => this.onRadioBtnClick(3)} active={this.state.radioSelected === 3}>Year</Button>*/}
                      {/*</ButtonGroup>*/}
                    {/*</ButtonToolbar>*/}
                  {/*</Col>*/}
                {/*</Row>*/}
                {/*<div className="chart-wrapper" style={{ height: 300 + 'px', marginTop: 40 + 'px' }}>*/}
                  {/*<Line data={mainChart} options={mainChartOpts} height={300} />*/}
                {/*</div>*/}
              {/*</CardBody>*/}
              {/*<CardFooter>*/}
                {/*<Row className="text-center">*/}
                  {/*<Col sm={12} md className="mb-sm-2 mb-0">*/}
                    {/*<div className="text-muted">Visits</div>*/}
                    {/*<strong>29.703 Users (40%)</strong>*/}
                    {/*<Progress className="progress-xs mt-2" color="success" value="40" />*/}
                  {/*</Col>*/}
                  {/*<Col sm={12} md className="mb-sm-2 mb-0 d-md-down-none">*/}
                    {/*<div className="text-muted">Unique</div>*/}
                    {/*<strong>24.093 Users (20%)</strong>*/}
                    {/*<Progress className="progress-xs mt-2" color="info" value="20" />*/}
                  {/*</Col>*/}
                  {/*<Col sm={12} md className="mb-sm-2 mb-0">*/}
                    {/*<div className="text-muted">Pageviews</div>*/}
                    {/*<strong>78.706 Views (60%)</strong>*/}
                    {/*<Progress className="progress-xs mt-2" color="warning" value="60" />*/}
                  {/*</Col>*/}
                  {/*<Col sm={12} md className="mb-sm-2 mb-0">*/}
                    {/*<div className="text-muted">New Users</div>*/}
                    {/*<strong>22.123 Users (80%)</strong>*/}
                    {/*<Progress className="progress-xs mt-2" color="danger" value="80" />*/}
                  {/*</Col>*/}
                  {/*/!*<Col sm={12} md className="mb-sm-2 mb-0 d-md-down-none">*!/*/}
                    {/*/!*<div className="text-muted">Bounce Rate</div>*!/*/}
                    {/*/!*<strong>Average Rate (40.15%)</strong>*!/*/}
                    {/*/!*<Progress className="progress-xs mt-2" color="primary" value="40" />*!/*/}
                  {/*/!*</Col>*!/*/}
                {/*</Row>*/}
              {/*</CardFooter>*/}
            {/*</Card>*/}
          {/*</Col>*/}
        {/*</Row>*/}




      </div>
    );
  }
}

export default Dashboard;
