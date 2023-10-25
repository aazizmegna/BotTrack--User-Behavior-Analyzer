import axios from "axios";

export async function makeProductive(id, data) {
  const response = await axios.post(`/api/productive/create/${id}`, {
    productive: data,
    withCredentials: true,
  });
  return response.data;
}
export async function ApproveActivityRequest(id, data) {
  const response = await axios.post(`/api/productive/createbyadmin/${id}`, {
    productive: data,
    withCredentials: true,
  });
  return response.data;
}
export async function RejectActivityRequest(data) {
  const response = await axios.put("/api/productive/reject", {
    reject: data,
    withCredentials: true,
  });
  return response.data;
}

// List of activity request for productive
export async function getAllPoductiverequest(data) {
  const response = await axios.get("/api/search/requestproduct", {
    withCredentials: true,
    params: {
      data,
    },
  });
  return response.data;
}

// List of activity approuved request for productive
export async function getAllActvApprouvedrequest(data) {
  const response = await axios.get("/api/search/approvedproduct", {
    withCredentials: true,
    params: {
      data,
    },
  });
  return response.data;
}
// List of activity rejected  for productive
export async function getAllActivitiesRejected(data) {
  const response = await axios.get("/api/search/rejected", {
    withCredentials: true,
    params: {
      data,
    },
  });
  return response.data;
}
//----------------------------------For No Activity------------------------------
// For no activity
export async function noActivityToProductive(id, data) {
  const response = await axios.post(`/api/pendingidl/create/${id}`, {
    noactivity: data,
    withCredentials: true,
  });
  return response.data;
}
// List of no activity request for productive
export async function getAllPendingidlrequest(data) {
  const response = await axios.get("/api/search/requestednoact", {
    withCredentials: true,
    params: {
      data,
    },
  });
  return response.data;
}
// List of no activity approuved request
export async function getAllApprouvedrequest(data) {
  const response = await axios.get("/api/search/approvednoact", {
    withCredentials: true,
    params: {
      data,
    },
  });
  return response.data;
}
// List of no activity denied request for productive
export async function getAllDeniedrequest(data) {
  const response = await axios.get("/api/search/rejectednoact", {
    withCredentials: true,
    params: {
      data,
    },
  });
  return response.data;
}

// Approuved requests For no activity
export async function ApprouveNoActivityRequest(id, data) {
  const response = await axios.post(`/api/pendingidl/accept/${id}`, {
    approve: data,
    withCredentials: true,
  });
  return response.data;
}
// Reject requests For no activity
export async function RejectNoActivityRequest(id, data) {
  const response = await axios.put(`/api/pendingidl/reject/${id}`, {
    reject: data,
    withCredentials: true,
  });
  return response.data;
}
