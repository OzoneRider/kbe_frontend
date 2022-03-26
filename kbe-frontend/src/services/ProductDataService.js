import http from "../http-common";

class ProductDataService {
  getAll() {
    return http.get("/products");
  }
  findByName(name) {
    return http.get("/products/search?name=" + name);
  }
  get(id) {
    return http.get("/products/" + id);
  }
}
export default new ProductDataService();
