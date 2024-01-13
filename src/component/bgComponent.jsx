
import './App.css';

var nightMode = false; 

export function isNightModeOn() {
  return nightMode;
}

export function setNightMode(value) {
  nightMode = value;
}

export function Clouds() {
  return (
    <div className={nightMode ? 'nightbody stars' : 'fullBody'}>

    <div className="cloud-container">
        <div className="cloud cloud1" />
        <div className="cloud cloud2" />
        <div className="cloud cloud3" />
    </div>

    </div>

  );
}

export function Ocean() {
    return (

    <section>
        <div className="wave wave1" />
        <div className="wave wave2" />
        <div className="wave wave3" />
    </section>

    );
  }

