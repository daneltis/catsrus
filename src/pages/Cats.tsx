import { Link, RouteComponentProps } from '@reach/router';
import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { getFavourites } from '../apis/Favourites';
import { getImages } from '../apis/Images';
import { getVotes } from '../apis/Votes';
import { CatCard } from '../components/Cat';
import { LoadingIcon } from '../components/LoadingIcon';
import { CatModel } from '../models/CatModel';
import { RootState } from '../reducers';
import styles from './styles.module.scss';


type PropsFromRedux = ConnectedProps<typeof connector>

type Props = PropsFromRedux & RouteComponentProps;

class CatsInternal extends React.Component<Props> {

  componentDidMount() {
    this.props.getImages(1);
    this.props.getFavourites();
    this.props.getVotes();
  }

  moveToPage(page: number) {
    this.props.getImages(page);
  }

  render() {

    if ( !this.props.catsloaded || !this.props.favouritesloaded || !this.props.votesloaded ) {
      return <LoadingIcon />;
    }

    return (
      <>
        <div className={styles.grid}>
          {
            this.props.cats.map((cat: CatModel) =>
              <CatCard cat={cat} key={cat.id} />
            )
          }

          {
            this.props.cats.length === 0 &&
              <p className={styles.noimages}>No cats found. <Link to="/upload">Upload</Link> a picture to get started!</p>
          }
        </div>
        {
          this.props.cats.length > 0 &&
            <div className={styles.pagination}>
              {
                Array.from(Array(this.props.pages), (e, i) => {
                  return <button key={i} className={this.props.page === (i+1) ? styles.selected : ''} onClick={() => this.moveToPage(i+1)}>Page {i+1}</button>
                })
              }
            </div>
        }
      </>
    )
  }

}

const mapState = (state: RootState) => ({
  cats: state.cats.cats,
  catsloaded: state.cats.loaded,
  favouritesloaded: state.favourites.loaded,
  votesloaded: state.votes.loaded,
  pages: state.cats.pages,
  page: state.cats.page
})

const mapDispatch = {
  getImages: (page: number) => getImages(page),
  getFavourites: () => getFavourites(),
  getVotes: () => getVotes(),
}

const connector = connect(mapState, mapDispatch)

export const Cats = connector(CatsInternal);




