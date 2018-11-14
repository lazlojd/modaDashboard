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
  Pagination,
  PaginationItem,
  PaginationLink,
  FormGroup,
  InputGroup,
  InputGroupAddon,
  Input
} from 'reactstrap';
import Widget03 from '../../views/Widgets/Widget03'
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities'

const brandPrimary = getStyle('--primary')
const brandSuccess = getStyle('--success')
const brandInfo = getStyle('--info')
const brandWarning = getStyle('--warning')
const brandDanger = getStyle('--danger')
const cardsPerPage = 30

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.onRadioBtnClick = this.onRadioBtnClick.bind(this);
    this.handleClick = this.handleClick.bind(this)
    this.setResponse = this.setResponse.bind(this)
    this.handleSearch = this.handleSearch.bind(this)

    this.state = {
      dropdownOpen: false,
      radioSelected: 2,
      response: [],
      activePage: 1,
      activePageList: [],
      post: '',
      responseToPost: '',
      search: ''
    };
  }

  handleSearch(event) {

    this.setState({search: event.target.value.trim()})
  }
  handleClick(index) {
      // check if active page has been selected
      console.log(this.state.activePage)
      if (this.state.activePage == index)
          return;

      //check if index is within range of a page
      if(index > Math.ceil(this.state.response.length / cardsPerPage) || index < 1)
          return;

      // calculate offset
      var offset = cardsPerPage * (index - 1);
      // console.log(offset)
      // console.log("starting slciing at " + this.state.response[offset])
      // console.log(this.state.response.slice(offset, offset + cardsPerPage))
      this.setState({
          activePageList: this.state.response.slice(offset, offset + cardsPerPage),
          activePage: index})

  }

    setResponse(response) {
        this.setState({response: response})
    }

    componentDidMount() {
        this.callApi()
            .then(res => {this.setState({ response: res.rows, activePageList: res.rows.slice(0, cardsPerPage)});
                console.log(this.state.response);
            })
            .catch(err => console.log(err));

        // Fetch fresh data from backend every 15 seconds
        setInterval(() => {
            //console.log("fetching ")
            var offset = cardsPerPage * (this.state.activePage - 1);
            var response = this.callApi()
            .then(res => {this.setState({response: res.rows, activePageList: res.rows.slice(offset, offset + cardsPerPage)})}).catch(err => console.log(err));

        }, 10000)
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


  render() {

    /*
    Limit the number of items on a page to 30 for non-violation
    of flickr api usage limits
     */
    var pages = (() => {
        var numPages = Math.ceil(this.state.response.length / cardsPerPage);
        var pages = []
        for (let i = 0; i < numPages; i++) {
            //console.log("page " + (i + 1) + " link")
            if (i + 1 == this.state.activePage) {
                pages.push(
                    <PaginationItem active>
                    <PaginationLink tag="button" onClick={() => this.handleClick(i + 1)}>{i + 1}</PaginationLink>
                </PaginationItem>)
            } else {
                pages.push(<PaginationItem>
                    <PaginationLink tag="button" onClick={() => this.handleClick(i + 1)}>{i + 1}</PaginationLink>
                </PaginationItem>)
            }
        }
        //console.log(pages)
        return pages
    })
    var searchInput = this.state.search;
    var photoItems = this.state.activePageList.map(function(row) {
        if (searchInput.length != 0 && parseInt(searchInput) != row[1])
            return;
        return (
        <Col xs="12" sm="6" md="6">
            <Card className="border-info">
                <CardHeader>
                    {row[0]}
                </CardHeader>
                <CardBody>
                    <Row>
                        <Col>
                            <CardImg
                                top width="100%" height="100%"
                                src={row[8]}
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
        <FormGroup row>
                  <Col md="12">
                    <InputGroup>
                      <InputGroupAddon addonType="prepend">
                        <Button type="button" color="primary"><i className="fa fa-search"></i> Search this page</Button>
                      </InputGroupAddon>
                      <Input type="text" id="searchInput" name="search" placeholder="Model Numbers" value={this.state.search} onChange={(event) => this.handleSearch(event)}/>

                    </InputGroup>
                  </Col>
               </FormGroup>
        <Row>
            {photoItems}
        </Row>
          <Pagination>
              <PaginationItem>
                  <PaginationLink previous tag="button" onClick={() => this.handleClick(this.state.activePage - 1)}></PaginationLink>
              </PaginationItem>
                {pages()}
              <PaginationItem>
                  <PaginationLink next tag="button" onClick={() => this.handleClick(this.state.activePage + 1)}></PaginationLink>
              </PaginationItem>
          </Pagination>
      </div>
    );
  }
}

export default Dashboard;
