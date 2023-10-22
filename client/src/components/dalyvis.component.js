import React, { Component } from "react";
import DalyvisDataService from "../services/dalyvis.service";
import { withRouter } from '../common/with-router';

class Dalyvis extends Component {
  constructor(props) {
    super(props);
    this.onChangeFullName = this.onChangeFullName.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangeBirthDate = this.onChangeBirthDate.bind(this);
    this.getDalyvis = this.getDalyvis.bind(this);
    this.updateDalyvis = this.updateDalyvis.bind(this);
    this.deleteDalyvis = this.deleteDalyvis.bind(this);

    this.state = {
      currentDalyvis: {
        id: null,
        fullName: "",
        email: "",
        birthDate: "", 
      },
      message: "",
      error: "",
    };
  }

  componentDidMount() {
    this.getDalyvis(this.props.router.params.id);
  }

  onChangeFullName(e) {
    const fullName = e.target.value;

    this.setState(function(prevState) {
      return {
        currentDalyvis: {
          ...prevState.currentDalyvis,
          fullName: fullName
        }
      };
    });
  }

  onChangeEmail(e) {
    const email = e.target.value;

    this.setState(function(prevState) {
      return {
        currentDalyvis: {
          ...prevState.currentDalyvis,
          email: email
        }
      };
    });
  }

  onChangeBirthDate(e) {
    const birthDate = e.target.value;

    this.setState(function(prevState) {
      return {
        currentDalyvis: {
          ...prevState.currentDalyvis,
          birthDate: birthDate
        }
      };
    });
  }

  getDalyvis(id) {
    DalyvisDataService.get(id)
      .then(response => {
        this.setState({
          currentDalyvis: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateDalyvis() {
    DalyvisDataService.update(
      this.state.currentDalyvis.id,
      this.state.currentDalyvis
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "Dalyvio informacija atnaujinta sėkmingai!",
          error: ""
        });
      })
      .catch(e => {
        if(e.response.status === 400) {
            this.setState({
                message: "",
                error: e.response.data.message
            });
        }
        console.log(e);
      });
  }

  deleteDalyvis() {
    if (window.confirm("Delete the item?")) {
        DalyvisDataService.delete(this.state.currentDalyvis.id)
        .then(response => {
            console.log(response.data);
            this.props.router.navigate('/dalyviai');
        })
        .catch(e => {
            console.log(e);
        });
    }
  }

  render() {
    const { currentDalyvis } = this.state;

    return (
      <div>
        {currentDalyvis ? (
          <div className="edit-form">
            <h4>Dalyvio redagavimas</h4>
            {this.state.message ? (
                <div className="alert alert-success" role="alert">
                    {this.state.message}
                </div>
            ) : ''}
            {this.state.error ? (
                <div className="alert alert-danger" role="alert">
                    {this.state.error}
                </div>
            ) : ''}
            <form>
              <div className="form-group">
                <label htmlFor="fullName">Vardas ir pavardė</label>
                <input
                  type="text"
                  className="form-control"
                  id="fullName"
                  value={currentDalyvis.fullName}
                  onChange={this.onChangeFullName}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">El. paštas</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  value={currentDalyvis.email}
                  onChange={this.onChangeEmail}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="birthDate">Gimimo data</label>
                <input
                  type="date"
                  className="form-control"
                  id="birthDate"
                  value={new Date(currentDalyvis.birthDate).toLocaleDateString()}
                  onChange={this.onChangeBirthDate}
                  required
                />
              </div>
            </form>

            <button
              type="submit"
              className="btn btn-success mr-2"
              onClick={this.updateDalyvis}
            >
              Atnaujinti
            </button>

            <button
              className="btn btn-danger"
              onClick={this.deleteDalyvis}
            >
              Trinti
            </button>
          </div>
        ) : (
          <div>
            <br />
            <p>Prašome pasirinkti dalyvį...</p>
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(Dalyvis);