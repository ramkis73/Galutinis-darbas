import React, { Component } from "react";
import DalyvisDataService from "../services/dalyvis.service";
import { Link } from "react-router-dom";

export default class DalyviuSarasas extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchFullName = this.onChangeSearchFullName.bind(this);
    this.onKeyDownSearchFullName = this.onKeyDownSearchFullName.bind(this);
    this.retrieveDalyviai = this.retrieveDalyviai.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.removeDalyvis = this.removeDalyvis.bind(this);
    this.searchFullName = this.searchFullName.bind(this);

    this.state = {
      dalyviai: [],
      searchFullName: ""
    };
  }

  componentDidMount() {
    this.retrieveDalyviai();
  }

  onChangeSearchFullName(e) {
    const searchFullName = e.target.value;

    this.setState({
        searchFullName: searchFullName
    });
  }

  onKeyDownSearchFullName(e) {
    if (e.key === 'Enter') {
        this.searchFullName();
    }
  }

  retrieveDalyviai() {
    DalyvisDataService.getAll()
      .then(response => {
        this.setState({
          dalyviai: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  getAge(birthDate) {
    var today = new Date();
    birthDate = new Date(birthDate);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
  }

  refreshList() {
    this.retrieveDalyviai();
  }

  setActiveTutorial(tutorial, index) {
    this.setState({
      currentTutorial: tutorial,
      currentIndex: index
    });
  }

  removeDalyvis(id) {
    if (window.confirm("Ar tikrai norite ištrinti šį dalyvį?")) {
        DalyvisDataService.delete(id)
        .then(response => {
            console.log(response.data);
            this.refreshList();
        })
        .catch(e => {
            console.log(e);
        });
    }
  }

  searchFullName() {
    DalyvisDataService.findByFullName(this.state.searchFullName)
      .then(response => {
        this.setState({
          dalyviai: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { searchFullName, dalyviai } = this.state;

    return (
        <div className="list row">
        <div className="col-md-4">
            <div className="input-group mb-3">
            <input
                type="text"
                className="form-control"
                placeholder="Paieška pagal vardą ir pavardę"
                value={searchFullName}
                onChange={this.onChangeSearchFullName}
                onKeyDown={this.onKeyDownSearchFullName}
            />
            <div className="input-group-append">
                <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchFullName}
                >
                Ieškoti
                </button>
            </div>
            </div>
        </div>
        <div className="col-md-12">
            <h4>Dalyvių sąrašas</h4>

            {dalyviai && dalyviai.length > 0 ? (
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">Vardas ir pavardė</th>
                        <th scope="col">El. paštas</th>
                        <th scope="col">Amžius</th>
                        <th scope="col">Veiksmai</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        dalyviai.map((dalyvis, index) => (
                        <tr>
                            <td>{dalyvis.fullName}</td>
                            <td>{dalyvis.email}</td>
                            <td>{this.getAge(dalyvis.birthDate)}</td>
                            <td>
                                <Link
                                    to={"/dalyviai/" + dalyvis.id}
                                    className="btn btn-warning mr-2"
                                >
                                    Redaguoti
                                </Link>
                                <button
                                    className="btn btn-danger"
                                    onClick={this.removeDalyvis.bind(this, dalyvis.id)}
                                >
                                    Trinti
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            ) : (
                <div className="alert alert-secondary">Nėra dalyvių</div>
            )}
        </div>
        </div>
    );
  }
}