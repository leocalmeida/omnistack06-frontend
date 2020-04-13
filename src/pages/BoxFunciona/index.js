import React, { Component } from "react";
import {Link} from "react-router-dom";
import api from "../../services/api";
import {MdInsertDriveFile} from "react-icons/md";
import logo from "../../assets/logo.svg";

import "./styles.css";

export default class Box extends Component {

  state = { caixa: {} }

  async componentDidMount() {
    const box = this.props.match.params.id;
    const response = await api.get(`boxes/${box}`);

    this.setState({ caixa: response.data });
  }


  render() {
    return (
      <div className="box-container">
        <header>
          <img src={logo} alt="rocketbox"/>
          <h1>{this.state.caixa.title}</h1>
        </header>
        <ul>
        {this.state.caixa.files && this.state.caixa.files.map( file => (
          <li key={file._id}>
          <Link className="fileInfo" to="">
            <MdInsertDriveFile size={24} color="#A5Cfff" />
            <strong> {file.title} </strong>
          </Link>
          <span> {file.createdAt} </span>

          </li>
        ))}
          
        </ul>
      </div>
    );
  }
}
