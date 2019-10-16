import React, { Component } from 'react';
import {
    IconButton,
    Menu,
    MenuItem,
} from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

const styles = theme => ({
    profileMenu: {
        zIndex: theme.zIndex.modal + 1,
        paddingTop: '5px',
    },
    userLink: {
        color: theme.palette.getContrastText(theme.palette.background.appBar),
        fontSize: theme.typography.fontSize,
        textTransform: 'uppercase',
    },
    accountIcon: {
        marginRight: 10,
    },
});

/**
 * Render the User Avatar with their name inside the Top AppBar component
 *
 * @class Avatar
 * @extends {Component}
 */
class Avatar extends Component {
    /**
     *Creates an instance of Avatar.
     * @param {Object} props @inheritdoc
     * @memberof Avatar
     */
    constructor(props) {
        super(props);
        this.state = { anchorEl: null };
        this.handleClick = this.handleClick.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    /**
     *
     * Open Avatar dropdown menu
     * @param {React.SyntheticEvent} event `click` event on Avatar
     * @memberof Avatar
     */
    handleClick(event) {
        this.setState({ anchorEl: event.currentTarget });
    }

    /**
     *
     * Close Avatar dropdown menu
     * @memberof Avatar
     */
    handleClose() {
        this.setState({ anchorEl: null });
    }

    /**
     * Do OIDC logout redirection
     * @param {React.SyntheticEvent} e Click event of the submit button
     */
    doOIDCLogout = (e) => {
        e.preventDefault();
        window.location = '/publisher/services/logout';
    };

    /**
     *
     * @inheritdoc
     * @returns {React.Component} @inheritdoc
     * @memberof Avatar
     */
    render() {
        const { classes, user } = this.props;
        const { anchorEl } = this.state;
        return (
            <React.Fragment>
                <IconButton
                    id='profile-menu-btn'
                    aria-owns='profile-menu-appbar'
                    aria-haspopup='true'
                    color='inherit'
                    onClick={this.handleClick}
                    className={classes.userLink}
                >
                    <AccountCircle className={classes.accountIcon} /> {user.name}
                </IconButton>
                <Menu
                    id='logout-menu'
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={this.handleClose}
                    getContentAnchorEl={null}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                    }}
                    className={classes.profileMenu}
                >
                    <Link to={{ pathname: '/services/logout' }}>
                        <MenuItem onClick={this.doOIDCLogout} id='logout'>
                            <FormattedMessage
                                id='Base.Header.avatar.Avatar.logout'
                                defaultMessage='Logout'
                            />
                        </MenuItem>
                    </Link>
                </Menu>
            </React.Fragment>
        );
    }
}
Avatar.propTypes = {
    classes: PropTypes.shape({
        userLink: PropTypes.string,
        profileMenu: PropTypes.string,
        accountIcon: PropTypes.string,
    }).isRequired,
    user: PropTypes.shape({ name: PropTypes.string.isRequired }).isRequired,
};

export default withStyles(styles)(Avatar);
