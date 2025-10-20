import { useEffect, useState, useMemo, useCallback } from "react";
import { Col, Container, Nav, Navbar, Row, Tab } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchCountries } from "../app/actions";
import SliderComponent from "./Slider";
import CopyRights from "./CopyRights";
import CardContainer from "./CardContainer";

function Home() {
  const dispatch = useDispatch();
  const [activeKey, setActiveKey] = useState("All");
  const [loading, setLoading] = useState(false);
  const countriesData = useSelector((state) => state.countries.countriesData);
  const isRequesting = useSelector((state) => state.countries.isRequesting);
  let regionLists = useSelector((state) => state.countries.regionLists);
  regionLists = ["All", ...regionLists];

  useEffect(() => {
    dispatch(fetchCountries("https://restcountries.com/v2/all?fields=name,region,flag"));
  }, [dispatch]);

  const regionTabs = useMemo(() => {
    return regionLists?.map((region, index) => (
      <Nav.Item key={`${region}_${index}`}>
        <Nav.Link eventKey={region} className="filter-link active-filter">
          {region}
        </Nav.Link>
      </Nav.Item>
    ));
  }, [regionLists]);

  const regionPanes = useMemo(() => {
    return regionLists?.map((region, index) => (
      <Tab.Pane key={index} eventKey={region}>
        <CardContainer data={countriesData} regionName={region} selectedRegion={activeKey} />
      </Tab.Pane>
    ));
  }, [regionLists, countriesData, activeKey]);

  const handleSelect = useCallback((key) => {
    setLoading(true);
    setActiveKey(key);

    setTimeout(() => {
      setLoading(false);
    }, 300);
  }, []);

  if (isRequesting) {
    return <Container className="vh-100 d-flex align-items-center justify-content-center" fluid>
      <div>Loading...</div>
    </Container>
  }

  return (
    <Container className="country-container my-4">
      <Tab.Container activeKey={activeKey} onSelect={handleSelect}>
        <Row className="mx-0">
          <Col sm={12} className="custom-filter-row">
            <Navbar expand="lg" className="mb-3">
              <Navbar.Brand className="countries-title">Countries</Navbar.Brand>
              <Navbar.Toggle aria-controls="responsive-nav" />
              <Navbar.Collapse id="responsive-nav" className="justify-content-end">
                <Nav variant="tabs" className="filter-nav" activeKey={activeKey} onSelect={handleSelect}>
                  {regionTabs}
                </Nav>
              </Navbar.Collapse>
            </Navbar>
          </Col>

          <Col sm={12}>
            <div className="welcome-divider-container">
              <div className="welcome-line"></div>
              <h1 className="welcome-text">WELCOME</h1>
              <div className="welcome-line"></div>
            </div>
          </Col>

          <Col sm={12}>
            <SliderComponent loading={loading} />
            <Tab.Content>
              {regionPanes}
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
      <CopyRights />
    </Container>
  );
}

export default Home;
