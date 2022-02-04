import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyAU1n2vzeK-y3SRdmmRVsWYUaplKEKpMMI',
  authDomain: 'queenmovl-92694.firebaseapp.com',
  databaseURL: 'https://queenmovl-92694-default-rtdb.firebaseio.com',
  projectId: 'queenmovl-92694',
  storageBucket: 'queenmovl-92694.appspot.com',
  messagingSenderId: '198171334505',
  appId: '1:198171334505:web:c8c4c0f2eeee4273cecff8',
};

export const app = initializeApp(firebaseConfig);
