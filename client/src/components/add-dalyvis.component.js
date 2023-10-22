import React, { Component } from "react";
import DalyvisDataService from "../services/dalyvis.service";

export default class PridetiDalyvi extends Component {
  constructor(props) {
    super(props);
    this.onChangeFullName = this.onChangeFullName.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangeBirthDate = this.onChangeBirthDate.bind(this);
    this.saveDalyvis = this.saveDalyvis.bind(this);
    this.newDalyvis = this.newDalyvis.bind(this);

    this.state = {
      id: null,
      fullName: "",
      email: "",
      birthDate: "", 


      message: "",
      submitted: false
    };
  }

  onChangeFullName(e) {
    this.setState({
      fullName: e.target.value
    });
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value
    });
  }

  onChangeBirthDate(e) {
    this.setState({
      birthDate: e.target.value
    });
  }

  saveDalyvis() {
    var data = {
      fullName: this.state.fullName,
      email: this.state.email,
      birthDate: this.state.birthDate
    };

    DalyvisDataService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          fullName: response.data.fullName,
          email: response.data.email,
          birthDate: response.data.birthDate,

          submitted: true
        });
        console.log(response.data);
      })
      .catch(e => {
        if(e.response.status === 400) {
            this.setState({
                message: e.response.data.message
            });
        }
        console.log(e);
      });
  }

  newDalyvis() {
    this.setState({
      id: null,
      fullName: "",
      email: "",
      birthDate: "", 

      submitted: false
    });
  }

  render() {
    return (
        <div className="submit-form">
          {this.state.submitted ? (
            <div>
              <h4>Sėkminga registracija!</h4>
              <button className="btn btn-success" onClick={this.newDalyvis}>
                Registruoti
              </button>
            </div>
          ) : (
            <div>
                {this.state.message ? (
                    <div className="alert alert-danger" role="alert">
                        {this.state.message}
                    </div>
                ) : ''}
              <div className="form-group">
                <label htmlFor="fullName">Vardas ir pavardė</label>
                <input
                  type="text"
                  className="form-control"
                  id="fullName"
                  required
                  value={this.state.fullName}
                  onChange={this.onChangeFullName}
                  name="fullName"
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">El. paštas</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  required
                  value={this.state.email}
                  onChange={this.onChangeEmail}
                  name="email"
                />
              </div>

              <div className="form-group">
                <label htmlFor="birthDate">Gimimo data</label>
                <input
                  type="date"
                  className="form-control"
                  id="birthDate"
                  required
                  value={this.state.birthDate}
                  onChange={this.onChangeBirthDate}
                  name="birthDate"
                />
              </div>

              <button onClick={this.saveDalyvis} className="btn btn-success">
                Pateikti
              </button>
            </div>
          )}
        </div>
      );
  }
}