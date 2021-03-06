import React, { Component, PropTypes } from "react";
import { Meteor } from "meteor/meteor";

import AppNav from "../components/AppNav.jsx";
import Breadcrumb from "../components/Breadcrumb.jsx";
import TouchEvent from "../components/TouchEvent.jsx";
import List from "../components/List";
import GroupItem from "../components/GroupItem.jsx";
import GroupForm from "../components/GroupForm.jsx";
import { openModal } from "../helpers/Modal.js";

export default class GroupList extends Component {
  constructor(props) {
    super(props);

    this.state = { isLoaded: false };
    this.openModal = this.openModal.bind(this);
  }

  componentDidMount() {
    this.isLoaded();
  }

  openModal() {
    const component = <GroupForm />;

    openModal(component, "Créer un nouveau groupe");
  }

  isLoaded() {
    setTimeout(
      () => {
        this.setState({ isLoaded: true });
      },
      1350
    );
  }

  render() {
    const {
      groups,
      user
    } = this.props;

    return (
      <div className="screen-box">
        <Breadcrumb title="Groupes" hasBack={false}>
          <TouchEvent class="right-button touch-event" onClick={this.openModal}>
            <i className="icon icon-rotate-45 icon-cross" />
          </TouchEvent>
        </Breadcrumb>
        <div className="sub-container">
          <div className="list-sub-menu small">
            <i className="big-icon icon icon-users" />
            <h5>Vos Groupes</h5>
          </div>
          <div>
            <List
              data={groups}
              user={user}
              type="group"
              emptyListString="Il n'y a pas de groupe de discussion. Créez le votre !"
            >
              <GroupItem />
            </List>
            {/* (!this.state.isLoaded && groups && groups.length > 0)
                ?
                ""
                :
                <a className="success self-center button" onClick={this.openModal}> En créer un </a>
              */
            }
          </div>
        </div>
        <AppNav user={user} />
      </div>
    );
  }
}

GroupList.propTypes = {
  groups: PropTypes.array.isRequired
};
