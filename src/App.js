import './App.css';
import Grid from './components/Grid';
import useWindowSize from "./hooks/UseWindowSize";
import {images} from './mocks/images';

function App() {
  let windowSize = useWindowSize();

  return (
    <div className="App" style={{ display: 'flex', alignItems: 'center', flexDirection: 'column',fontSize:'30px'}}>
      <div>Wedding Gallery</div>
       <Grid
        images={images}
        rowHeight={200}
        margin={5}
        isLightboxEnabled={true}
        width={Math.floor(windowSize.innerWidth * 0.9)}
      />
    </div>
  );
}

export default App;
