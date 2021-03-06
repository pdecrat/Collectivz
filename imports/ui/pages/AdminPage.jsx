import React, { Component, PropTypes } from "react";
import { Meteor } from "meteor/meteor";
import json2csv from "json2csv";

import AppNav from "../components/AppNav.jsx";
import List from "../components/List.jsx";
import Breadcrumb from "../components/Breadcrumb.jsx";
import UserItem from "../components/UserItem.jsx";
import { Toast } from "../helpers/Toast";

export default class AdminPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userNumber: 0,
      coinTotal: "Le montant total s'affichera quand vous aurez entré une valeur."
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.getTotal = this.getTotal.bind(this);
    this.addMoney = this.addMoney.bind(this);
    this.addAdmin = this.addAdmin.bind(this);
    this.removeAdmin = this.removeAdmin.bind(this);
  }

  componentWillMount() {
    Meteor.call("admin.exportData", (err, res) => {
      if (err) {
      } else {
        const xls = json2csv({ data: res });
        const blob = new Blob(["\ufeff", xls]);
        const url = URL.createObjectURL(blob);
        this.setState({
          downloadReady: true,
          fileName: "Utilisateurs de CollectivZ.csv",
          downloadUrl: url
        });
      }
    });
  }

  componentDidMount() {
    Meteor.call("users.getUserNumber", (err, res) => {
      this.setState({
        userNumber: res
      });
    });
  }

  addAdmin(e) {
    e.preventDefault();
    const adminName = this.refs.adminName.value;

    if (adminName.length > 0) {
      Meteor.call("admin.addAdmin", adminName, (err, res) => {
        if (!err) {
          Toast(`${adminName} ajouté aux coordinateurs.`, "success");
          this.refs.adminName.value = "";
        } else {
          Toast(err.reason, "danger");
        }
      });
    }
  }

  removeAdmin(userId, e) {
    e.preventDefault();

    Meteor.call("admin.removeAdmin", userId, (err, res) => {
      if (!err) {
        Toast("Utilisateur supprimé des coordinateurs.", "success");
      } else {
        Toast(err.reason, "danger");
      }
    });
  }

  getTotal() {
    const { userNumber } = this.state;
    const amount = parseInt(this.refs.amount.value);
    const coinTotal = amount > 0
      ? `Cela représente un total de ${userNumber * amount}`
      : "Entrez une valeur supérieure à 0.";

    this.setState({
      coinTotal
    });
  }

  addMoney(e) {
    e.preventDefault();
    const amount = parseInt(this.refs.amount.value);

    if (amount > 0) {
      Meteor.call("admin.addMoney", amount, (err, res) => {
        if (!err) {
          Toast(
            `Vous avez ajouté ${amount} euros à chaque utilisateur.`,
            "success"
          );
          this.refs.amount.value = "";
        } else {
          Toast(err.reason, "danger");
        }
      });
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    const groupName = this.refs.groupName.value;

    if (groupName) {
      Meteor.call("groups.insert", { name: groupName }, (err, res) => {
        if (!err) {
          Toast(`Groupe ${groupName} créé.`, "success");
        } else {
          Toast(err.reason, "danger");
        }
      });
      this.refs.groupName.value = "";
    }
  }

  render() {
    const { user, admins } = this.props;
    const {
      userNumber,
      coinTotal,
      downloadUrl,
      downloadReady,
      fileName
    } = this.state;

    const emptyListString = "Aucun coordinateur sur la plate-forme. Veuillez contacter CollectivZ.";

    return (
      <div className="screen-box">
        <Breadcrumb title="Coordination" hasBack={false} />
        <div className="sub-container">
          <div className="admin">
            <h5>Créer un nouveau groupe</h5>
            <div className="button-box">
              <form className="merged">
                <input
                  type="text"
                  className="small"
                  placeholder="Nom du groupe"
                  ref="groupName"
                />
                <button
                  onClick={this.handleSubmit}
                  className="small button info"
                >
                  <span>Ajouter</span>
                </button>
              </form>
            </div>
            <h5>Ajouter des points</h5>
            <div className="button-box">
              <form className="merged">
                <input
                  type="number"
                  className="small"
                  min="0"
                  placeholder="Montant par membre"
                  ref="amount"
                  onChange={this.getTotal}
                />
                <button onClick={this.addMoney} className="small button info">
                  <span>Ajouter</span>
                </button>
                <br />
                <label>{coinTotal}</label>
              </form>
            </div>
            {downloadReady
              ? <div className="button-box">
                  <label>Télécharger les données</label>
                  <a
                    download={fileName}
                    href={downloadUrl}
                    ref="downloadButton"
                  >
                    <button className="small button info">
                      Enregister le csv
                    </button>
                  </a>
                  <br />
                </div>
              : ""}
            <h5>Ajouter un coordinateur</h5>
            <div className="button-box">
              <form className="merged">
                <input
                  type="text"
                  className="small"
                  placeholder="Nom du coordinateur"
                  ref="adminName"
                />
                <button onClick={this.addAdmin} className="small button info">
                  <span>Ajouter</span>
                </button>
              </form>
            </div>
            <hr className="hidden" />
            <div className="list-sub-menu small">
              <i className="big-icon icon icon-bubble" />
              <h5>Liste des coordinateurs</h5>
            </div>
            <List
              data={admins}
              type="admin"
              removeAdmin={this.removeAdmin}
              emptyListString={emptyListString}
            >
              <UserItem />
            </List>
          </div>
        </div>
        <AppNav user={user} />
      </div>
    );
  }
}
