
import { useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";
import "./IndiaMap.css";

const INDIA_URL =
  "https://cdn.jsdelivr.net/gh/udit-001/india-maps-data@main/geojson/india.geojson";

const TAMIL_NADU_URL =
  "https://cdn.jsdelivr.net/gh/udit-001/india-maps-data@main/geojson/states/tamil-nadu.geojson";

const districts = [
  ["Chennai", 80.27, 13.08],
  ["Tiruvallur", 79.91, 13.14],
  ["Kancheepuram", 79.70, 12.83],
  ["Chengalpattu", 79.98, 12.69],
  ["Ranipet", 79.33, 12.92],
  ["Vellore", 79.13, 12.92],
  ["Tirupathur", 78.57, 12.50],
  ["Tiruvannamalai", 79.07, 12.23],
  ["Villupuram", 79.49, 11.94],
  ["Kallakurichi", 78.96, 11.74],
  ["Cuddalore", 79.77, 11.75],
  ["Krishnagiri", 78.22, 12.52],
  ["Dharmapuri", 78.16, 12.12],
  ["Salem", 78.15, 11.66],
  ["Namakkal", 78.17, 11.22],
  ["Erode", 77.72, 11.34],
  ["Tiruppur", 77.34, 11.10],
  ["Coimbatore", 76.96, 11.02],
  ["The Nilgiris", 76.64, 11.41],
  ["Karur", 78.08, 10.96],
  ["Tiruchirappalli", 78.69, 10.79],
  ["Perambalur", 78.87, 11.23],
  ["Ariyalur", 79.08, 11.14],
  ["Thanjavur", 79.14, 10.79],
  ["Tiruvarur", 79.63, 10.77],
  ["Nagapattinam", 79.84, 10.77],
  ["Mayiladuthurai", 79.65, 11.10],
  ["Pudukkottai", 78.82, 10.38],
  ["Sivaganga", 78.48, 9.84],
  ["Madurai", 78.12, 9.92],
  ["Theni", 77.48, 10.01],
  ["Dindigul", 77.95, 10.37],
  ["Virudhunagar", 77.96, 9.59],
  ["Ramanathapuram", 78.83, 9.37],
  ["Thoothukudi", 78.13, 8.80],
  ["Tirunelveli", 77.70, 8.73],
  ["Tenkasi", 77.30, 8.96],
  ["Kanniyakumari", 77.54, 8.09],
];

function getName(properties) {
  return (
    properties?.name ||
    properties?.NAME_1 ||
    properties?.st_nm ||
    properties?.shapeName ||
    properties?.district ||
    properties?.dtname ||
    properties?.DISTRICT ||
    properties?.dt_name ||
    "Unknown"
  );
}

function IndiaMap() {
  const [page, setPage] = useState("india");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [collegeType, setCollegeType] = useState("");
  const [selectedCollege, setSelectedCollege] = useState(null);
  const [hoveredName, setHoveredName] = useState("");

  function goBack() {
    if (page === "districts") {
      setPage("india");
    } else if (page === "categories") {
      setPage("districts");
    } else if (page === "colleges") {
      setPage("categories");
    } else if (page === "details") {
      setPage("colleges");
    }
  }

  function selectState(name) {
    if (name.toLowerCase().includes("tamil nadu")) {
      setPage("districts");
      setHoveredName("");
    }
  }

  function selectDistrict(name) {
    setSelectedDistrict(name);
    setPage("categories");
  }

  return (
    <section className="india-map-section">

      <div className="india-map-heading">
        <div>
          <span className="section-kicker">COLLEGE HUB / EXPLORE</span>
          <h2>
            {page === "india" && <>Explore <span>India.</span></>}
            {page === "districts" && <>Tamil <span>Nadu.</span></>}
            {page === "categories" && <><span>{selectedDistrict}</span></>}
            {page === "colleges" && <><span>{collegeType}</span> Colleges</>}
            {page === "details" && <>College <span>Profile.</span></>}
          </h2>
          <p>
            {page === "india" && "Choose a state to discover colleges."}
            {page === "districts" && "Select one of Tamil Nadu's 38 districts."}
            {page === "categories" && `Explore colleges in ${selectedDistrict}.`}
            {page === "colleges" && `${collegeType} colleges in ${selectedDistrict}.`}
            {page === "details" && "College information and facilities."}
          </p>
        </div>

        <span className="india-count">
          {page === "india" ? "INDIA" :
           page === "districts" ? "38 DISTRICTS" :
           "COLLEGE HUB"}
        </span>
      </div>

      {page !== "india" && (
        <button className="map-back-button" onClick={goBack}>
          ← Back
        </button>
      )}

      {page === "india" && (
        <div className="india-map-layout">
          <div className="india-map-visual">
            <ComposableMap
              projection="geoMercator"
              projectionConfig={{
                center: [82.8, 22.5],
                scale: 950,
              }}
              width={700}
              height={650}
              style={{ width: "100%", height: "auto" }}
            >
              <Geographies geography={INDIA_URL}>
                {({ geographies }) =>
                  geographies.map((geo) => {
                    const name = getName(geo.properties);
                    const isTN = name.toLowerCase().includes("tamil nadu");

                    return (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        onMouseEnter={() => setHoveredName(name)}
                        onMouseLeave={() => setHoveredName("")}
                        onClick={() => selectState(name)}
                        style={{
                          default: {
                            fill: isTN ? "#9664f5" : "#e9e5f1",
                            stroke: "#ffffff",
                            strokeWidth: 1,
                            outline: "none",
                          },
                          hover: {
                            fill: isTN ? "#7942e6" : "#c9b6ed",
                            stroke: "#ffffff",
                            strokeWidth: 1.2,
                            outline: "none",
                            cursor: "pointer",
                          },
                          pressed: {
                            fill: "#7942e6",
                            outline: "none",
                          },
                        }}
                        className={isTN ? "tamil-nadu-state" : ""}
                      />
                    );
                  })
                }
              </Geographies>
            </ComposableMap>

            <div className="map-legend">
              <span>🟣 Tamil Nadu</span>
              <span>Hover and select a state</span>
            </div>
          </div>

          <div className="map-selection-info">
            <span className="section-kicker">YOUR LOCATION</span>
            <h3>{hoveredName || "India"}</h3>
            <p>
              {hoveredName
                ? `Explore ${hoveredName}.`
                : "Move your cursor over the map to explore states."}
            </p>
            <button
              onClick={() => selectState(hoveredName)}
              disabled={!hoveredName.toLowerCase().includes("tamil nadu")}
            >
              Explore Tamil Nadu ↗
            </button>
          </div>
        </div>
      )}

      {page === "districts" && (
        <div className="district-map-card">
          <ComposableMap
            projection="geoMercator"
            projectionConfig={{
              center: [78.4, 10.7],
              scale: 5700,
            }}
            width={700}
            height={650}
            style={{ width: "100%", height: "auto" }}
          >
            <Geographies geography={TAMIL_NADU_URL}>
              {({ geographies }) =>
                geographies.map((geo, index) => {
                  const name = getName(geo.properties);

                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      onMouseEnter={() => setHoveredName(name)}
                      onMouseLeave={() => setHoveredName("")}
                      onClick={() => selectDistrict(name)}
                      style={{
                        default: {
                          fill: `hsl(${(index * 37) % 360}, 48%, 91%)`,
                          stroke: "#ffffff",
                          strokeWidth: 1.5,
                          outline: "none",
                        },
                        hover: {
                          fill: "#a987f4",
                          stroke: "#ffffff",
                          strokeWidth: 2,
                          outline: "none",
                          cursor: "pointer",
                        },
                        pressed: {
                          fill: "#8050e8",
                          outline: "none",
                        },
                      }}
                    />
                  );
                })
              }
            </Geographies>

            {districts.map(([name, longitude, latitude]) => (
              <Marker
                key={name}
                coordinates={[longitude, latitude]}
              >
                <text
                  textAnchor="middle"
                  className="district-map-label"
                >
                  {name}
                </text>
              </Marker>
            ))}
          </ComposableMap>

          <div className="district-map-footer">
            <span>{hoveredName || "Tamil Nadu District Map"}</span>
            <span>38 Districts · Select a district</span>
          </div>
        </div>
      )}

      {page === "categories" && (
        <div className="college-category-grid">
          <button
            className="college-category-card government-card"
            onClick={() => {
              setCollegeType("Government");
              setPage("colleges");
            }}
          >
            <span className="category-icon">🏛️</span>
            <h3>Government Colleges</h3>
            <p>Explore government institutions in {selectedDistrict}.</p>
            <span className="category-link">Explore Colleges ↗</span>
          </button>

          <button
            className="college-category-card private-card"
            onClick={() => {
              setCollegeType("Private");
              setPage("colleges");
            }}
          >
            <span className="category-icon">🏢</span>
            <h3>Private Colleges</h3>
            <p>Explore private institutions in {selectedDistrict}.</p>
            <span className="category-link">Explore Colleges ↗</span>
          </button>
        </div>
      )}

      {page === "colleges" && (
        <div className="college-results">
          <div className="college-results-heading">
            <div>
              <span className="section-kicker">COLLEGE DIRECTORY</span>
              <h3>{selectedDistrict} / {collegeType}</h3>
            </div>
          </div>

          <div className="college-empty-state">
            <span>🏫</span>
            <h3>College directory is being prepared</h3>
            <p>
              Verified {collegeType.toLowerCase()} college information
              for {selectedDistrict} will appear here.
            </p>
            <small>We will add verified college records before publishing.</small>
          </div>
        </div>
      )}

      {page === "details" && selectedCollege && (
        <div className="college-details">
          <h3>{selectedCollege}</h3>
          <p>Verified college profile information will appear here.</p>
        </div>
      )}

    </section>
  );
}

export default IndiaMap;
