import Express from 'express';
import CORS from 'cors';
import http from 'http';
import axios from 'axios';
import { AddressInfo } from 'net';
import TownsServiceClient from '../client/TownsServiceClient';
import addTownRoutes from '../router/towns';

const baseURL = 'http://localhost:3001';
const axiosClient = axios.create( { baseURL } );

export interface ResponseEnvelope<T> {
  isOK: boolean;
  message?: string;
  response?: T;
}


describe('Chat API test', () => {
  let server: http.Server;
  let apiClient: TownsServiceClient;
  beforeAll(async () => {
    const app = Express();
    app.use(CORS());
    server = http.createServer(app);
    
    addTownRoutes(server, app);
    await server.listen();
    const address = server.address() as AddressInfo;
    
    apiClient = new TownsServiceClient(`http://127.0.0.1:${address.port}`);
  });
  it('test that the API server is running', async () => {
    const responseWrapper = await axiosClient.get<ResponseEnvelope<string>>('/');
    expect(responseWrapper.data.message).toBe('yaaay');

  });
  it('test post /message and get /fetchAllMessages/:roomId endpoints', async () => {
    const ret = await apiClient.createTown({
      friendlyName: 'dummy',
      isPubliclyListed: true,
    });

    const requestBody = {
      from: 'john doe',
      to: 'all',
      message: 'greetings from earth',
      roomId: ret.coveyTownID,
    };
    // console.log(ret.coveyTownID);
    // post data to db
    const postResponse = await axiosClient.post<ResponseEnvelope<string>>('/message', requestBody);
    // console.log(postResponse.data);
    // get the messages for the room
    const responseWrapper = await axiosClient.get<ResponseEnvelope<string>>(`/fetchAllMessages/${ret.coveyTownID}`);
    // console.log(responseWrapper.data);
    // make sure that the data sent is equal to the data retrieved
    expect(responseWrapper.data).toEqual([postResponse.data]);
  });

  it('test get /fetchAllMessages endpoint', async () => {
    const ret = await apiClient.createTown({
      friendlyName: 'dummy',
      isPubliclyListed: true,
    });

    const requestBody = {
      from: 'john doe',
      to: 'all',
      message: 'greetings from earth',
      roomId: ret.coveyTownID,
    };
    // console.log(ret.coveyTownID);
    // post data to db
    await axiosClient.post<ResponseEnvelope<string>>('/message', requestBody);
    // console.log(postResponse.data);
    // get the messages for the room
    const responseWrapper = await axiosClient.get<ResponseEnvelope<string>>('/fetchAllMessages');
    // console.log(responseWrapper.data);
    // make sure that there is data posted in the db after our post request. in general, there should be data
    // from previous sessions, but our post makes it certain that there is data for this test.
    expect(responseWrapper.data).toBeDefined();
  });

  it('test post /room endpoint', async () => {
    const ret = await apiClient.createTown({
      friendlyName: 'dummy',
      isPubliclyListed: true,
    });

    // console.log(ret.coveyTownID);

    const postRequestData = {
      roomId: ret.coveyTownID,
      password: ret.coveyTownPassword,
      friendlyName: 'dummy',
      isPublic: true,
    };

    const postResponse = await axiosClient.post<ResponseEnvelope<string>>('/room', postRequestData);
    // console.log(postResponse);
    // check that a room has been created. this test is a bit flimsy
    expect(postResponse.data).toBeDefined();
  });
});