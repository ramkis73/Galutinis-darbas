import http from "../http-common";

class DalyvisDataService {
  getAll() {
    return http.get("/dalyviai");
  }

  get(id) {
    return http.get(`/dalyviai/${id}`);
  }

  create(data) {
    return http.post("/dalyviai", data);
  }

  update(id, data) {
    return http.put(`/dalyviai/${id}`, data);
  }

  delete(id) {
    return http.delete(`/dalyviai/${id}`);
  }

  findByFullName(title) {
    return http.get(`/dalyviai?fullName=${title}`);
  }
}

export default new DalyvisDataService();