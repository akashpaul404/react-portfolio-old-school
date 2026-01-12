import Loader from "react-loaders";
import "./index.scss";
import AnimatedLetters from "../AnimatedLetters";
import React,{ useEffect, useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
// import 'leaflet/dist/leaflet.css';


const Contact = () => {
  const [letterClass, setLetterClass] = useState("text-animate");
  const refForm = useRef();
  const [position, setPosition] = useState([12.9119, 77.5647]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLetterClass("text-animate-hover");
    }, 3000);

    return () => clearTimeout(timeout);
  }, []);

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_gezask7",
        "template_vq40eyi",
        refForm.current,
        "jzu-1v-jNZJPR8fA0"
      )
      .then(
        () => {
          alert("Message sent successfully");
          window.location.reload(false);
        },
        () => {
          alert("Failed to send message, please try again");
        }
      );
  };

  return (
    <>
      <div className="container contact-page">
        <div className="text-zone">
          <h1>
            <AnimatedLetters
              letterClass={letterClass}
              strArray={["C", "o", "n", "t", "a", "c", "t", "", "M", "e"]}
              idx={15}
            />
          </h1>
          <p>contact me details</p>
          <div className="contact-form">
            <form ref={refForm} onSubmit={sendEmail}>
              <ul>
                <li className="half">
                  <input type="text" name="name" placeholder="Name" required />
                </li>
                <li className="half">
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    required
                  />
                </li>
                <li>
                  <input
                    type="text"
                    name="subject"
                    placeholder="Subject"
                    required
                  />
                </li>
                <li>
                  <textarea
                    placeholder="Message"
                    name="message"
                    required
                  ></textarea>
                </li>
                <li>
                  <input type="submit" className="flat-button" value="Send" />
                </li>
              </ul>
            </form>
          </div>
        </div>
        <div className="info-map">
          Akash Paul,
          <br />
          India,
          <br />
          BTM 2nd Stage
          <br />
          Bangalore, Karnataka
          <br />
          <span>akash.paul8080@gmail.com</span>
        </div>
        <div className="map-wrap">
          <MapContainer center={position} zoom={13} scrollWheelZoom={false}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={position}>
              <Popup>
                Paul lives here, come for a cup of coffee :)</Popup>
            </Marker>
          </MapContainer>
        </div>
      </div>
      <Loader type="pacman" />
    </>
  );
};

export default Contact;
