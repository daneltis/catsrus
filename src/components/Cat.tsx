import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { deleteFavourite, addFavourite } from '../apis/Favourites';
import { vote } from '../apis/Votes';
import { CatModel } from '../models/CatModel';
import { FavouriteModel } from '../models/FavouriteModel';
import { RootState } from '../reducers';
import styles from './styles.module.scss';

type PropsFromRedux = ConnectedProps<typeof connector>

type CombinedProps = PropsFromRedux & Props;

type Props = {
  cat: CatModel;
}

class CatCardInner extends React.Component<CombinedProps> {

  constructor(props: CombinedProps) {
    super(props);

    this.isFavourite = this.isFavourite.bind(this);
    this.toggleFavourite = this.toggleFavourite.bind(this);
    this.upvote = this.upvote.bind(this);
    this.downvote = this.downvote.bind(this);
  }

  isFavourite(): boolean {
    return this.props.favourite !== null;
  }

  toggleFavourite() {
    if (this.props.favourite !== null) {
      this.props.deleteFavourite(this.props.cat.id, this.props.favourite.id);
    } else {
      this.props.addFavourite(this.props.cat.id);
    }
  }

  upvote() {
    if (this.props.myvote === null) {
      this.props.vote(this.props.cat.id, true);
    }
  }

  downvote() {
    if (this.props.myvote === null) {
      this.props.vote(this.props.cat.id, false);
    }
  }

  getStyle() {
    return this.props.cat.height > this.props.cat.width ? styles.stretchX : styles.stretchY;
  }

  render() {
    return (
      <div className={styles.card}>
        <img src={this.props.cat.url} alt={this.props.cat.original_filename} style={{ aspectRatio: `${this.props.cat.width} / ${this.props.cat.height}` }} />
        <div className={styles.controls}>
          <div className={styles.votes}>
            {
              this.props.myvote === null && <button className={styles.upvote} onClick={this.upvote} />
            }
            {
              this.props.myvote !== null && <button className={this.props.myvote === 1 ? styles.upvoted : styles.noupvote} />
            }
            <p>{this.props.score}</p>
            {
              this.props.myvote === null && <button className={styles.downvote} onClick={this.downvote} />
            }
            {
              this.props.myvote !== null && <button className={this.props.myvote === 0 ? styles.downvoted : styles.nodownvote} />
            }
          </div>
          <button className={this.isFavourite() ? styles.hearted : styles.heart} onClick={this.toggleFavourite} />
        </div>
      </div>
    )
  }

}

const getScore = (cat: CatModel, votes: Map<string, number>): number => {
  if (votes.has(cat.id)) {
    const vote = votes.get(cat.id);
    if (vote !== undefined) {
      return vote;
    }
  }
  return 0;
}

const getFavourite = (cat: CatModel, favourites: Map<string, FavouriteModel>): FavouriteModel | null => {
  if (favourites.has(cat.id)) {
    const favourite = favourites.get(cat.id);
    if (favourite !== undefined) {
      return favourite;
    }
  }
  return null;
}

const getMyVote = (cat: CatModel, myvotes: Map<string, number>): number | null => {
  if (myvotes.has(cat.id)) {
    const vote = myvotes.get(cat.id);
    if (vote !== undefined) {
      return vote;
    }
  }
  return null;
}

const mapState = (state: RootState, props: Props) => ({
  score: getScore(props.cat, state.votes.votes),
  favourite: getFavourite(props.cat, state.favourites.favourites),
  myvote: getMyVote(props.cat, state.votes.myvotes)
})

const mapDispatch = {
  deleteFavourite: (image_id: string, favourite_id: string) => deleteFavourite(image_id, favourite_id),
  addFavourite: (image_id: string) => addFavourite(image_id),
  vote: (image_id: string, up: boolean) => vote(image_id, up)
}



const connector = connect(mapState, mapDispatch)

export const CatCard = connector(CatCardInner);




