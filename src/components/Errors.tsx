import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '../reducers';
import styles from './styles.module.scss';

type Props = ConnectedProps<typeof connector>

const ErrorsInner = (props:Props) => (
    <div className={styles.errorcontainer}>
        {
            props.errors.map((error: string, id: number) =>
                <div className={styles.error} key={`error${id}`}>
                    <p>{error}</p>
                    <button onClick={() => props.dismissError(id)}>Dismiss</button>
                </div>
            )
        }
    </div>
)

const mapState = (state: RootState) => ({
    errors: state.errors.errors,
})

const mapDispatch = {
    dismissError: (id: number) => ({ type: 'DISMISS_ERROR', id: id})
}


const connector = connect(mapState, mapDispatch)

export const Errors = connector(ErrorsInner);

