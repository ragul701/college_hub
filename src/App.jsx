
import "./App.css";
import IndiaMap from "./components/IndiaMap";

function App() {
  return (
    <div className="college-hub">
      <header className="navbar">
        <div className="logo">
          <span>CH.</span>
          <div>
            <h2>COLLEGE HUB</h2>
            <p>YOUR FUTURE STARTS HERE</p>
          </div>
        </div>

        <nav>
          <a href="#home">Home</a>
          <a href="#explore">Explore India</a>
          <a href="#about">About</a>
        </nav>

        <button className="login-btn">Get Started ↗</button>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="hero-content">
            <span className="hero-tag">
              INDIA'S COLLEGE DISCOVERY PLATFORM
            </span>

            <h1>
              Every State.
              <br />
              Every College.
              <br />
              <span>One Destination.</span>
            </h1>

            <p>
              Explore India's educational landscape.
              Discover colleges, courses and opportunities
              that shape your future.
            </p>

            <a href="#explore" className="explore-btn">
              Explore India <span>↗</span>
            </a>

            <div className="hero-note">
              <span className="live-dot"></span>
              YOUR EDUCATION JOURNEY STARTS HERE
            </div>
          </div>
        </section>

        <div id="explore">
          <IndiaMap />
        </div>

        <section className="about" id="about">
          <span>THE COLLEGE HUB EXPERIENCE</span>
          <h2>
            Your College Search.
            <br />
            <span>Simplified.</span>
          </h2>
          <p>
            One platform to discover colleges,
            courses and educational opportunities
            across India.
          </p>
        </section>

        <footer>
          <h2>COLLEGE HUB.</h2>
          <p>Explore. Discover. Achieve.</p>
        </footer>
      </main>
    </div>
  );
}

export default App;
