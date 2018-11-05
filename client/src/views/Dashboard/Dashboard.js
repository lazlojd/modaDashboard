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
  PaginationLink
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

    this.state = {
      dropdownOpen: false,
      radioSelected: 2,
      flickrURL: ['https://farm', '.staticflickr.com/', '.jpg'],
      response: [],
      activePage: 1,
      activePageList: [],
      post: '',
      responseToPost: '',
    };
  }

  handleClick(index) {
      // check if active page has been selected
      console.log(this.state.activePage)
      if (this.state.activePage == index)
          return;

      //check if index is within range of acceptable pages
      if(index > Math.ceil(this.state.response.length / 30) || index < 1)
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

  componentDidMount() {
        this.callApi()
            .then(res => {this.setState({ response: res.rows, activePageList: res.rows.slice(0, cardsPerPage)});
                //console.log(this.state.response);
            })
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


  render() {

    /*
    Limit the number of items on a page to 30 because flickr api usage
    request no more than 30 photos per page for bandwidth reasons
     */
    var pages = (() => {
        var numPages = Math.ceil(this.state.response.length / 30);
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

    var photoItems = this.state.activePageList.map(function(row) {
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
