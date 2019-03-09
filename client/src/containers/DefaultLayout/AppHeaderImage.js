import React, { Component } from 'react';
import { Container, Row, Col} from 'reactstrap'

import './css/header.css'

class HeaderImage extends Component {
	render() {
		return (
			<Container fluid className="Section SectionBackground">
				<Row className="JustifyContentCenter">
					<Col className="AlignCenter">
						<h2 className="Upload"><i className="icon-arrow-up-circle UploadIcon"></i> Upload</h2>
					</Col>
				</Row>
			</Container>
		);
	}
	
}


export default HeaderImage