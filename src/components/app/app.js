import React, { Component } from "react";
import { Col, Row, Container } from "reactstrap";
import Header from "../header";
import RandomChar from "../randomChar";
import ErrorMessage from "../errorMessage";
import { CharacterPage, BookPage, HousePage, BooksItem } from "../pages";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

import GotService from "../../services/gotService";

export default class App extends Component {
  gotService = new GotService();
  constructor() {
    super();
    this.changeShow = this.changeShow.bind(this);
  }

  state = {
    showRandomChar: true,
    selectedItem: null,
    error: false,
  };

  componentDidCatch() {
    console.log("error");
    this.setState({
      error: true,
    });
  }
  changeShow() {
    this.setState((state) => {
      return {
        showRandomChar: !state.showRandomChar,
      };
    });
  }

  render() {
    if (this.state.error) {
      return <ErrorMessage />;
    }
    return (
      <Router>
        <div className="app">
          <Container>
            <Header />
          </Container>
          <Container>
            <Row>
              <Col lg={{ size: 5, offset: 0 }}>
                {this.state.showRandomChar ? <RandomChar /> : ""}
                <button
                  className="btn btn-danger mb-5"
                  onClick={this.changeShow}
                >
                  Показать скрыть
                </button>
              </Col>
            </Row>

            <Switch>
              <Route path="/" exact component={() => <h1 className="bg-light px-5 py-5">Welcome GOT </h1>} />
              <Route path="/characters" component={CharacterPage} />
              <Route path="/houses" component={HousePage} />
              <Route path="/books" exact component={BookPage} />
              <Route
                path="/books/:id"
                render={({ match, location, history }) => {
                  const { id } = match.params;

                  return <BooksItem bookId={id} />;
                }}
              />
              <Route
                path="*"
                render={(obj) => {
                  return <My404Component link={obj} />;
                }}
              />
            </Switch>
          </Container>
        </div>
      </Router>
    );
  }
}

const My404Component = (props) => {
  console.log(props);
  return (
    <>
     <Link to='/' className='btn btn-danger' >На главную</Link>
      <img
        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAATYAAACjCAMAAAA3vsLfAAAArlBMVEXC3u/19fX///8YdfBgZHLN5PIAb/CbufcAbfC/2+u40uKxytmy0u+pxNXB3e/U5vHp7fDY2+VbX25RVWaBhI6Ulp5UWWjQ0dS3ub6WvvBCiO3b6/XFxsq0y9X09/l6fYifoajf4OLg4urs8/7J2vu/0/qQkpvNztFKT2CqrLKytLmItPAeePBYlfC41++szu17rPBXkfNqnPSkyO96pvWpxfgtffEAaPBpbXrG1uEFYSc0AAAExklEQVR4nO3cbXfSShiFYRggDWAxTeiANUJplVKkanuOFf//H3OeSUoSyus2lAT3/aHQELPMtWYyAVxWKmz/Gsf+C5QzskGRDYpsUGSDIhsU2aDIBkU2KLJBkQ2KbFBkgyIbFNmgyAZFNiiyQZENimxQZIMiGxTZoMgGRTYoskEdgK3R+PauKB1qWOR/2MbXmVucHr7lfoL2JHM/4INbK1CO8z3vM7RnmffxfqxQc96eK2nWbHZyPskDjDZL5D7aMec8XZkHZ/Y0OyKc87XVzPskc2f7T7jcL0p9Nk9ulTpzao9KqcfjsdUePrVyH295s32QcfWsRMr9IQ+u+1lFiMfqqixsM/G6cv43PweuDD315ahs7dyn6UHYnDOlfro1GWdPTu35Vt0+H0+tPGyydNpr3Mxx7MNR70nKw1aoSsH2yylYbhnY3p0Vrp/twrN1PqridU42oAHZkMgGRTaoMrC9rxYuj2xIZIMiGxTZoMgGRTYoskGRDYpsUGSDIhsU2aDIBkU2KLJBkQ3qX2KTj2VzOtRJs416psVv4WW3O+57S3K9zD5kM+empei5uvO1b9J6mnHrTbQOhnsPwhNmU2O/bop+uQvkuWzQ12mkuWztki3pTtcTNnmuh115CJI5qe412Zaq1xds6t6MM90zK4IZXX4yJ0fRGCTbInXtp9hEy07Onhlegfeyz9AnW7ZoIMVsXiCDzW6XYRfGav1oGpNtkZobH5malk3GmPai7YbpPt7JbB2aQUm2hdpU13W//8Imq0MQvWDmZTRd7UobjC7JljotLVf+BVuYsHUN06Vl6gXyjGxJghOMtrDJVa1KtlRhYGfiJjZZaYOQbOlirk1sZqUVLrItEgpzb1uNJqlayWaXBo9sqcy1vj6/C8PwUtjCcKTCVyupWWn9rtklNIz1YRh6W455+mwyoMxtmsm+B9DBVCXvDaL7NqXkJT/ZZ7LnZ0enyDaO31bF+X0lbxn0yL4qSP2qqmfTZFPjSRBl+YLJNLrZsB+0xYCqHqT28QOOtlSLlVTZq1xVxSMxtQJwSdjAVh1NzJiaT/ty2dPT1C5k28QWfx7p+/JxW3oXsq1gM3cZfsxzHV3pfJ1RI9sqtvlw+KKkemOzDPjDfpZIXZt9xmTLoqS/GVWLH8u77P/t6WmzHSyyQZENimxQZIMiGxTZoMgGRTYoskGRDYpsUGSDOgm2nP5zjz2+9CNb0sXubmRLse3uRrY0285uZMuw7epGtizbjm5kW2LbzY1sy2w7uZHtFdsubmR7zbaDG9lWsG13O3m2wc1g9QveqxcGSf88mxk7qzkvLm7W/ymyrWGTt1JkW9+aObrhBbKhkY1sf8tmlkiy7cE28G5uzMppM4+et42PbJ6FSjsNjOLSJrJlh5m5zVh7u7vu1oRsaGQjG9n2iGxQZIMiGxTZoMgGRTYoskGRDYpsUGSDIht4PLIhdYrH9rsMbNtm6ZuzmcFWfLZK52Ox2Lx2Kdgqzd8b/zHL27J5F+dWrZPzSebPVmm2zgtUu10Stk6z1S5UuU/Rg7BVms1Wocpf7SBsAleg8p6g0mHYTj6yQZENimxQZIMiGxTZoMgGRTYoskGRDYpsUGSDIhsU2aDIBkU2KLJBkQ2q8QcGXOdwdL/6hgAAAABJRU5ErkJggg=="
        alt="ss"
      />
    </>
  );
};
