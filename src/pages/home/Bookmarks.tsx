import styled               from 'styled-components';

import { observer }         from 'mobx-react';
import { store }            from '../../store';

import React, { Component } from 'react';

import {
  AppBar,
  Avatar,
  Badge,
  Chip,
  Drawer,
  IconButton,
  Typography,
  Toolbar,
  Tooltip,
} from '@material-ui/core';

import {
  withStyles,
  createStyles,
} from '@material-ui/core/styles';

import DeleteIcon from '@material-ui/icons/Delete';
import CloseIcon from '@material-ui/icons/Close';

const styles = () => createStyles({
  chipsRoot: {
    maxWidth: 150,
    padding: 20,
  },
  chip: {
    marginBottom: 10,
  },
});

@observer
class Bookmarks extends Component<{ classes: any, history: any }, {}> {
  render() {
    const bookmarks = store.bookmarks;
    const content = this.getContent(bookmarks);

    const classes = this.props.classes;

    return (
      <Drawer
        anchor="right"
        open={store.isBookmarsPanelOpen}
        onClose={() => { store.setBookmarksPanelState(false) }}>

        <StyledContainer>
          <AppBar position="sticky">
            <Toolbar>
              <Badge badgeContent={store.bookmarks.size} color="secondary">
                <Typography variant="h4" color="inherit">
                  Favorites
                </Typography>
              </Badge>
            </Toolbar>
          </AppBar>

          <StyledSubHeader>
            <Tooltip title="Clear favorites">
              <IconButton aria-label="delete"
                onClick={ () => { store.clearBookmarks() } }
              >
                <DeleteIcon />
              </IconButton>
            </Tooltip>

            <Tooltip title="Close panel">
              <IconButton aria-label="close"
                onClick={ () => { store.setBookmarksPanelState(false) } }
              >
                <CloseIcon />
              </IconButton>
            </Tooltip>
          </StyledSubHeader>

          <div className={classes.chipsRoot}>
            { content }
          </div>
        </StyledContainer>
      </Drawer>
    );
  }

  private getContent(bookmarks: Map<number, MinimalPokemon>) {
    if (bookmarks.size === 0) {
      return (
        <Typography>
          Nothing in favorites yet.
        </Typography>
      );
    }

    const classes = this.props.classes;

    return [...bookmarks].map(([key, poke]) => {
      return (
        <Chip
          avatar={<Avatar>{ poke.id }</Avatar>}
          className={classes.chip}
          key={key}
          label={poke.name}
          onClick={() => { this.goTo(poke) }}
          onDelete={() => { store.removeBookmark(poke) }}
        />
      )
    });
  }

  private goTo(poke: MinimalPokemon) {
    store.setPartialPokemon(poke);
    this.props.history.push(`/pokemon/${poke.id}`)
  }
}

export default withStyles(styles)(Bookmarks);

const StyledContainer = styled.div`
  min-width: 100px;
`;

const StyledSubHeader = styled.div`
  display: flex;
  justify-content: center;

  padding-top: 10px;
  padding-bottom: 10px;
`;
