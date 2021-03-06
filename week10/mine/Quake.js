
import { getJSON } from './utilities.js';
// Quake Model
export default class Quake {
  constructor() {
    this.baseUrl ='https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2019-01-01&endtime=2019-03-02';
    // this is where we will store the last batch of retrieved quakes in the model.  I don't always do this...in this case the api doesn't have an endpoint to request one quake.
    this._quakes = [];
  }

  async getEarthQuakesByRadius(position, radius = 100) {

    position = position.coords;
    const query = this.baseUrl + `&latitude=${position.latitude}&longitude=${position.longitude}&maxradiuskm=${radius}`;
    //let query = "https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2019-01-01&endtime=2019-03-02&latitude=%2036.114647&longitude=-113.4241471&maxradiuskm=100";

    this._quakes = await getJSON(query);
    return this._quakes;
  }
    

  getQuakeById(id) {
    // filter this._quakes for the record identified by id and return it
    return this._quakes.features.filter(item => item.id === id)[0];
  }
}