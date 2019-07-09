import request from '../utils/request';

export async function prepareToPlan(params) {
  //debugger
  //const reqHeader = getAuthRequestHeader()
  return request('/dev/',{
    method: 'POST',
    body: JSON.stringify(params)
  });
}

export async function getTheRoute() {
  //const reqHeader = getAuthRequestHeader()
  return request('/dev/',{
    method: 'GET',
  });
}