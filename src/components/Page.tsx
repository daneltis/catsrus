import { Link } from '@reach/router';
import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import Logo from '../assets/logo.svg';
import { RootState } from '../reducers';
import styles from './styles.module.scss';
import uuid from 'uuid-random';
import { Errors } from './Errors';

type PropsFromRedux = ConnectedProps<typeof connector>

type CombinedProps = PropsFromRedux & Props;

type Props = {
    children?: React.ReactNode,
}

class PageInner extends React.Component<CombinedProps> {

    componentDidMount() {
        if (this.props.user === null) {
            let id = window.localStorage.getItem('catsrus-user');

            if (id == null) {
                id = uuid();
                window.localStorage.setItem('catsrus-user', id);
            }

            this.props.setUser(id);
        }
    }

    render() {

        return (
            <>
                <header className={styles.header}>
                    <div className={styles.container}>
                        <nav>
                            <Link to="/" className={styles.logo}><img src={Logo} alt="Cats R Us" /></Link>
                            <Link to="/">Cats</Link>
                            <Link to="/upload">Upload</Link>
                        </nav>
                    </div>
                </header>

                <div className={styles.spacer} />

                <main className={styles.main}>
                    <div className={styles.container}>
                        <Errors />
                        {
                            this.props.user !== null &&
                            <>
                                {this.props.children}
                            </>
                        }
                    </div>
                </main>
            </>
        );
    }
}



const mapState = (state: RootState) => ({
    user: state.user.id
})

const mapDispatch = {
    setUser: (id: string) => ({ type: 'SETUSER', id: id })
}



const connector = connect(mapState, mapDispatch)

export const Page = connector(PageInner);

