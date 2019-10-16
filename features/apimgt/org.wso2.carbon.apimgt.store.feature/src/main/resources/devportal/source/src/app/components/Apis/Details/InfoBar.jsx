/*
 * Copyright (c) 2019, WSO2 Inc. (http://www.wso2.org) All Rights Reserved.
 *
 * WSO2 Inc. licenses this file to you under the Apache License,
 * Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import { Link } from 'react-router-dom';
import Collapse from '@material-ui/core/Collapse';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Grade from '@material-ui/icons/Grade';
import LaunchIcon from '@material-ui/icons/Launch';
import { FormattedMessage, injectIntl } from 'react-intl';
import API from 'AppData/api';
import StarRatingBar from 'AppComponents/Apis/Listing/StarRatingBar';
import VerticalDivider from '../../Shared/VerticalDivider';
import ImageGenerator from '../Listing/ImageGenerator';
import ResourceNotFound from '../../Base/Errors/ResourceNotFound';
import AuthManager from '../../../data/AuthManager';
import { ApiContext } from './ApiContext';
import Environments from './Environments';
import Labels from './Labels';
/**
 *
 *
 * @param {*} theme
 */
const styles = (theme) => {
    const mainBack = theme.custom.infoBar.background || '#ffffff';
    const infoBarHeight = theme.custom.infoBar.height || 70;
    const backIconDisplay = theme.custom.infoBar.showBackIcon ? 'flex' : 'none';
    const starColor = theme.custom.infoBar.starColor || theme.palette.getContrastText(mainBack);

    return {
        table: {
            minWidth: '100%',
        },
        root: {
            height: infoBarHeight,
            background: mainBack,
            color: theme.palette.getContrastText(mainBack),
            borderBottom: 'solid 1px ' + theme.palette.grey.A200,
            display: 'flex',
            alignItems: 'center',
            paddingLeft: theme.spacing.unit * 2,
        },
        backIcon: {
            color: theme.palette.primary.main,
            fontSize: 56,
            cursor: 'pointer',
        },
        backText: {
            color: theme.palette.primary.main,
            cursor: 'pointer',
            fontFamily: theme.typography.fontFamily,
        },
        starRate: {
            fontSize: 40,
            color: starColor,
        },
        infoContent: {
            color: theme.palette.getContrastText(mainBack),
            background: mainBack,
            padding: theme.spacing.unit * 3,
            '& td, & th': {
                color: theme.palette.getContrastText(mainBack),
            },
        },
        infoContentBottom: {
            background: theme.custom.infoBar.sliderBackground,
            color: theme.palette.getContrastText(theme.custom.infoBar.sliderBackground),
            borderBottom: 'solid 1px ' + theme.palette.grey.A200,
        },
        contentWrapper: {
            maxWidth: theme.custom.contentAreaWidth - theme.custom.leftMenu.width,
            alignItems: 'center',
        },
        backLink: {
            alignItems: 'center',
            textDecoration: 'none',
            display: backIconDisplay,
        },
        infoBarMain: {
            width: '100%',
        },
        buttonView: {
            textAlign: 'left',
            justifyContent: 'left',
            display: 'flex',
            paddingLeft: theme.spacing(3),
            cursor: 'pointer',
        },
        buttonOverviewText: {
            display: 'inline-block',
            paddingTop: 3,
        },
        paper: {
            margin: theme.spacing.unit,
        },
        leftCol: {
            width: 200,
        },
        iconAligner: {
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center',
        },
        iconTextWrapper: {
            display: 'inline-block',
            paddingLeft: 20,
        },
        iconEven: {
            color: theme.custom.infoBar.iconEvenColor,
            width: theme.spacing.unit * 3,
        },
        iconOdd: {
            color: theme.custom.infoBar.iconOddColor,
            width: theme.spacing.unit * 3,
        },
        margin: {
            marginLeft: 30,
        },
        contentToTop: {
            verticlaAlign: 'top',
        },
        viewInPubStoreLauncher: {
            display: 'flex',
            flexDirection: 'column',
            color: theme.palette.getContrastText(mainBack),
            textAlign: 'center',
            textDecoration: 'none',
        },
        linkText: {
            fontSize: theme.typography.fontSize,
        },
    };
};

/**
 *
 *
 * @class InfoBar
 * @extends {React.Component}
 */
class InfoBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            api: null,
            applications: null,
            policies: null,
            dropDownApplications: null,
            dropDownPolicies: null,
            notFound: false,
            tabValue: 'Social Sites',
            comment: '',
            commentList: null,
            showOverview: false,
            checked: false,
        };
        this.getSchema = this.getSchema.bind(this);
        this.getProvider = this.getProvider.bind(this);
    }

    /**
     *
     *
     * @memberof InfoBar
     */

    /**
     *
     *
     * @memberof InfoBar
     */
    toggleOverview = (todo) => {
        if (typeof todo === 'boolean') {
            this.setState({ showOverview: todo });
        } else {
            this.setState(state => ({ showOverview: !state.showOverview }));
        }
    };

    getProvider(api) {
        let { provider } = api;
        if (api.businessInformation && api.businessInformation.businessOwner
            && api.businessInformation.businessOwner.trim() !== '') {
            provider = api.businessInformation.businessOwner;
        }
        return provider;
    }

    getSchema() {
        const newAPI = new API();
        const { api } = this.context;
        const promisedGraphQL = newAPI.getGraphQLSchemaByAPIId(api.id);
        promisedGraphQL.then((response) => {
            const windowUrl = window.URL || window.webkitURL;
            const binary = new Blob([response.data]);
            const url = windowUrl.createObjectURL(binary);
            const anchor = document.createElement('a');
            anchor.href = url;
            anchor.download = this.getProvider(api) + '-' + api.name + '-' + api.version + '.graphql';
            anchor.click();
            windowUrl.revokeObjectURL(url);
        });
    }

    /**
     *
     *
     * @returns
     * @memberof InfoBar
     */
    render() {
        const { classes, theme, intl } = this.props;
        const {
            notFound, showOverview, prodUrlCopied, sandboxUrlCopied, epUrl,
        } = this.state;
        const {
            custom: {
                leftMenu: { position },
                infoBar: { showThumbnail, sliderPosition, sliderBackground },
            },
        } = theme;

        const { resourceNotFountMessage } = this.props;
        const user = AuthManager.getUser();
        if (notFound) {
            return <ResourceNotFound message={resourceNotFountMessage} />;
        }

        return (
            <ApiContext.Consumer>
                {({ api }) => (
                    <div className={classes.infoBarMain}>
                        <div className={classes.root}>
                            <Link to='/apis' className={classes.backLink}>
                                <Icon className={classes.backIcon}>keyboard_arrow_left</Icon>
                                <div className={classes.backText}>
                                    <FormattedMessage id='Apis.Details.InfoBar.back.to' defaultMessage='BACK TO' />
                                    <br />
                                    <FormattedMessage id='Apis.Details.InfoBar.listing' defaultMessage='LISTING' />
                                </div>
                            </Link>
                            {showThumbnail && (
                                <React.Fragment>
                                    <VerticalDivider height={70} />
                                    <ImageGenerator api={api} width='70' height='50' />
                                </React.Fragment>
                            )}
                            <div style={{ marginLeft: theme.spacing.unit }}>
                                <Typography variant='h4'>{api.name}</Typography>
                                <Typography variant='caption' gutterBottom align='left'>
                                    {this.getProvider(api)}
                                </Typography>
                            </div>
                            <VerticalDivider height={70} />
                            {!api.advertiseInfo.advertised && user && (
                                <StarRatingBar apiId={api.id} isEditable={false} showSummary />
                            )}
                            {api.advertiseInfo.advertised && (
                                <React.Fragment>
                                    <a
                                        target='_blank'
                                        rel='noopener noreferrer'
                                        href={api.advertiseInfo.originalStoreUrl}
                                        className={classes.viewInPubStoreLauncher}
                                    >
                                        <div>
                                            <LaunchIcon />
                                        </div>
                                        <div className={classes.linkText}>Visit Publisher Dev Portal</div>
                                    </a>
                                    <VerticalDivider height={70} />
                                </React.Fragment>
                            )}
                        </div>
                        {position === 'horizontal' && <div style={{ height: 60 }} />}
                        {showOverview && (
                            <Collapse in={showOverview}>
                                <div className={classes.infoContent}>
                                    <div className={classes.contentWrapper}>
                                        <Typography>{api.description}</Typography>
                                        <Table className={classes.table}>
                                            <TableBody>
                                                <TableRow>
                                                    <TableCell component='th' scope='row' className={classes.leftCol}>
                                                        <div className={classes.iconAligner}>
                                                            <Icon className={classes.iconOdd}>
                                                                settings_input_component
                                                            </Icon>
                                                            <span className={classes.iconTextWrapper}>
                                                                <FormattedMessage
                                                                    id='Apis.Details.InfoBar.list.version'
                                                                    defaultMessage='Version'
                                                                />
                                                            </span>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell>{api.version}</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell component='th' scope='row'>
                                                        <div className={classes.iconAligner}>
                                                            <Icon className={classes.iconEven}>
                                                                account_balance_wallet
                                                            </Icon>
                                                            <span className={classes.iconTextWrapper}>
                                                                <FormattedMessage
                                                                    id='Apis.Details.InfoBar.list.context'
                                                                    defaultMessage='Context'
                                                                />
                                                            </span>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell>{api.context}</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell component='th' scope='row'>
                                                        <div className={classes.iconAligner}>
                                                            <Icon className={classes.iconOdd}>account_circle</Icon>
                                                            <span className={classes.iconTextWrapper}>
                                                                <FormattedMessage
                                                                    id='Apis.Details.InfoBar.provider'
                                                                    defaultMessage='Provider'
                                                                />
                                                            </span>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell>{this.getProvider(api)}</TableCell>
                                                </TableRow>
                                                {/* <TableRow>
                                                    <TableCell component='th' scope='row'>
                                                        <div className={classes.iconAligner}>
                                                            <Icon className={classes.iconEven}>update</Icon>
                                                            <span className={classes.iconTextWrapper}>
                                                                <FormattedMessage
                                                                    id='Apis.Details.InfoBar.last.updated'
                                                                    defaultMessage='Last updated'
                                                                />
                                                            </span>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell>21 May 2018</TableCell>
                                                </TableRow> */}
                                                {user && !api.advertiseInfo.advertised && (
                                                    <TableRow>
                                                        <TableCell component='th' scope='row'>
                                                            <div className={classes.iconAligner}>
                                                                <Grade className={classes.iconEven} />
                                                                <span className={classes.iconTextWrapper}>
                                                                    <FormattedMessage
                                                                        id='Apis.Details.InfoBar.list.context.rating'
                                                                        defaultMessage='Rating'
                                                                    />
                                                                </span>
                                                            </div>
                                                        </TableCell>
                                                        <TableCell>
                                                            <StarRatingBar
                                                                apiId={api.id}
                                                                isEditable
                                                                showSummary={false}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                )}
                                                {api.type === 'GRAPHQL' && (
                                                    <TableRow>
                                                        <TableCell component='th' scope='row'>
                                                            <div className={classes.iconAligner}>
                                                                <Icon className={classes.iconOdd}>cloud_download</Icon>
                                                                <span className={classes.iconTextWrapper}>
                                                                    <FormattedMessage
                                                                        id='Apis.Details.InfoBar.download.Schema'
                                                                        defaultMessage='Download Schema'
                                                                    />
                                                                </span>
                                                            </div>
                                                        </TableCell>
                                                        <TableCell>
                                                            <Button
                                                                onClick={this.getSchema}
                                                                size='small'
                                                                fontSize='small'
                                                                variant='outlined'
                                                            >
                                                                <FormattedMessage
                                                                    id='Apis.Details.InfoBar.graphQL.schema'
                                                                    defaultMessage='GraphQL Schema'
                                                                />
                                                            </Button>
                                                        </TableCell>
                                                    </TableRow>
                                                )}
                                                {!api.advertiseInfo.advertised ? (
                                                    <React.Fragment>
                                                        <TableRow>
                                                            <TableCell
                                                                component='th'
                                                                scope='row'
                                                                className={classes.contentToTop}
                                                            >
                                                                <div className={classes.iconAligner}>
                                                                    <Icon className={classes.iconEven}>
                                                                        desktop_windows
                                                                    </Icon>
                                                                    <span className={classes.iconTextWrapper}>
                                                                        <FormattedMessage
                                                                            id='Apis.Details.InfoBar.available.environments'
                                                                            defaultMessage='Available Environments'
                                                                        />
                                                                    </span>
                                                                </div>
                                                            </TableCell>
                                                            <TableCell>
                                                                <Environments />
                                                            </TableCell>
                                                        </TableRow>
                                                        {api.labels.length !== 0 && (
                                                            <TableRow>
                                                                <TableCell
                                                                    component='th'
                                                                    scope='row'
                                                                    className={classes.contentToTop}
                                                                >
                                                                    <div className={classes.iconAligner}>
                                                                        <Icon className={classes.iconEven}>games</Icon>
                                                                        <span className={classes.iconTextWrapper}>
                                                                            <FormattedMessage
                                                                                id='Apis.Details.InfoBar.available.mgLabels'
                                                                                defaultMessage='Available Microgateways'
                                                                            />
                                                                        </span>
                                                                    </div>
                                                                </TableCell>
                                                                <TableCell>
                                                                    <Labels />
                                                                </TableCell>
                                                            </TableRow>
                                                        )}
                                                    </React.Fragment>
                                                ) : (
                                                    <TableRow>
                                                        <TableCell component='th' scope='row'>
                                                            <div className={classes.iconAligner}>
                                                                <Icon className={classes.iconOdd}>account_circle</Icon>
                                                                <span className={classes.iconTextWrapper}>
                                                                    <FormattedMessage
                                                                        id='Apis.Details.InfoBar.owner'
                                                                        defaultMessage='Owner'
                                                                    />
                                                                </span>
                                                            </div>
                                                        </TableCell>
                                                        <TableCell>{api.advertiseInfo.apiOwner}</TableCell>
                                                    </TableRow>
                                                )}
                                            </TableBody>
                                        </Table>
                                    </div>
                                </div>
                            </Collapse>
                        )}
                        <div className={classes.infoContentBottom}>
                            <div className={classes.contentWrapper} onClick={this.toggleOverview}>
                                <div className={classes.buttonView}>
                                    {showOverview ? (
                                        <Typography className={classes.buttonOverviewText}>
                                            <FormattedMessage id='Apis.Details.InfoBar.less' defaultMessage='LESS' />
                                        </Typography>
                                    ) : (
                                        <Typography className={classes.buttonOverviewText}>
                                            <FormattedMessage id='Apis.Details.InfoBar.more' defaultMessage='MORE' />
                                        </Typography>
                                    )}
                                    {showOverview ? <Icon>arrow_drop_up</Icon> : <Icon>arrow_drop_down</Icon>}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </ApiContext.Consumer>
        );
    }
}

InfoBar.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
    intl: PropTypes.shape({
        formatMessage: PropTypes.func,
    }).isRequired,
};

InfoBar.contextType = ApiContext;

export default injectIntl(withStyles(styles, { withTheme: true })(InfoBar));
