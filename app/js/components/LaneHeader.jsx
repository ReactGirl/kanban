import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DropdownMenu from 'react-dd-menu';
import { Add, MoreVert, Remove } from './icons';

class Lane extends Component {
  constructor() {
    super();

    this.state = {
      isMenuOpen: false,
    };

    this.handleDeleteLane = this.handleDeleteLane.bind(this);
  }

  handleDeleteLane() {
    const lane = this.props.lane;
    this.props.onDeleteLane(lane.id);
    lane.cards.forEach(cardId => this.props.onDeleteCard(null, cardId));
  }

  toggleLane() {
    const { lane } = this.props;
    lane.collapsed = !lane.collapsed;
    this.props.onEditLane(lane);
  }

  render() {
    const { isMenuOpen } = this.state;
    const { lane, label, labels } = this.props;

    const menuOptions = {
      isOpen: isMenuOpen,
      close: () => this.setState({ isMenuOpen: false }),
      toggle: (
        <a onClick={() => this.setState({ isMenuOpen: !isMenuOpen })}>
          <MoreVert size={20} />
        </a>
      ),
      align: 'right',
    };
    const toggleIcon = lane.collapsed ? (
      <Add size={14} />
    ) : (
      <Remove size={14} />
    );

    const options = labels.map(lb => (
      <option
        key={lb.id}
        value={lb.id}
      >
        {lb.value}
      </option>
    ));

    return (
      <div className="options">
        <a
          className="toggle"
          onClick={() => this.toggleLane()}
        >
          { toggleIcon }
        </a>
        <div className="label">
          <select
            className="select"
            defaultValue={label.id}
            disabled={lane.collapsed}
          >
            { options }
          </select>
        </div>
        <DropdownMenu
          className="more-options"
          {...menuOptions}
        >
          <li>
            <a onClick={() => this.handleDeleteLane()}>
              Delete
            </a>
          </li>
        </DropdownMenu>
      </div>
    );
  }
}

Lane.propTypes = {
  label: PropTypes.object.isRequired,
  labels: PropTypes.array.isRequired,
  lane: PropTypes.object.isRequired,
  onDeleteCard: PropTypes.func.isRequired,
  onDeleteLane: PropTypes.func.isRequired,
  onEditLane: PropTypes.func.isRequired,
};

export default Lane;
