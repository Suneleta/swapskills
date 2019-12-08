import firebase from 'firebase';
import uuidv1 from 'uuid/v1';

function uploadFile(file, setFileUploadPercent) {
  return new Promise((resolve, reject) => {
    const storageRef = firebase.storage().ref().child(`photos${uuidv1()}-${file.name}`);

    const uploadTask = storageRef.put(file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFileUploadPercent(`${progress.toFixed(2)}%`);

      },
      (error) => { 
        console.log(error)
        reject('error subiendo archivo');
      },
      async () => {
        const downloadURL = await uploadTask.snapshot.ref.getDownloadURL();
        resolve(downloadURL);
      },
    );
  });
}

export default uploadFile;
