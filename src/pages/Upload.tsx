import { RouteComponentProps } from '@reach/router';
import React from 'react';
import Dropzone from 'react-dropzone';
import { connect, ConnectedProps } from 'react-redux';
import { upload } from '../apis/Images';
import { LoadingIcon } from '../components/LoadingIcon';
import { RootState } from '../reducers';
import styles from './styles.module.scss';

type PropsFromRedux = ConnectedProps<typeof connector>

type Props = PropsFromRedux & RouteComponentProps;


const UploadInternal = (props: Props) => {

  const onDrop = (acceptedFiles: File[]) => {
    for ( const file of acceptedFiles ) {
      props.upload(file);
    }
  }

  if ( props.uploading ) {
    return <LoadingIcon />
  }
  
  return (
    <>
      <div className={styles.dropzone}>
        <Dropzone onDrop={onDrop} accept={[".png", ".jpg"]} multiple={false}>
            {({getRootProps, getInputProps}) => (
            <section>
                <div {...getRootProps()}>
                    <input {...getInputProps()} />

                    <p>Drag 'n' drop cat picture here, or click to select file.</p>
                    <p><span>Valid types: .png .jpg</span></p>
                </div>
            </section>
            )}
        </Dropzone>
      </div>
    </>
  );
}


const mapState = (state: RootState) => ({
  uploading: state.cats.uploading,
})

const mapDispatch = {
  upload: (file: File) => upload(file),
}

const connector = connect(mapState, mapDispatch)

export const Upload = connector(UploadInternal);

