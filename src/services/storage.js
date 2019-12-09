import firebase from 'firebase';

function uploadFile(file, setFileUploadPercent) {
  return new Promise((resolve, reject) => {
    const storageRef = firebase.storage().ref(`${file.name}`);

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
