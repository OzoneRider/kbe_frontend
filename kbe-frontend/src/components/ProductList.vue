<template>
  <div class="container">
    <h1 class="text-center">Products List</h1>

    <div class="list row">
      <div class="col-md-8">
        <div class="input-group mb-3">
          <input type="text" class="form-control" placeholder="Search by name" v-model="name" />
          <div class="input-group-append">
            <button class="btn btn-outline-secondary" type="button" @click="searchName">
              Search
            </button>
          </div>
        </div>
      </div>
    </div>

    <table class="table table-striped">
      <thead>
        <tr>
          <th>Product Id</th>
          <th>Name</th>
          <th>Price</th>
          <th>Displaysize</th>
          <th>Refreshrate</th>
        </tr>
      </thead>
      <tbody>
        <tr
          :class="{ active: index == currentIndex }"
          v-for="product in products"
          v-bind:key="product.id"
        >
          <td>{{ product.id }}</td>
          <td>{{ product.name }}</td>
          <td>{{ product.priceEuro }} €</td>
          <td>{{ product.displaySizeInches }} Zoll</td>
          <td>{{ product.refreshRateHz }} Hz</td>
          <td>
            <button class="btn btn-outline-secondary" type="button" @click="getProduct">
              Info
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import ProductDataService from "../services/ProductDataService";

export default {
  name: "Products",
  data() {
    return {
      products: [],
      currentProduct: null,
      name: "",
    };
  },
  methods: {
    getProducts() {
      ProductDataService.getAll().then((response) => {
        this.products = response.data;
        console.log(response.data);
      });
    },
    getProduct() {
      ProductDataService.get().then((response) => {
        this.currentProduct = response.data;
        console.log(response.data);
      });
    },
    refreshList() {
      this.retrieveProducts();
      this.currentProduct = null;
      this.currentIndex = -1;
    },
    setActiveProduct(product, index) {
      this.currentProduct = product;
      this.currentIndex = product ? index : -1;
    },
    searchName() {
      ProductDataService.findByName(this.name)
        .then((response) => {
          this.products = response.data;
          this.setActiveProduct(null);
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
  created() {
    this.getProducts();
  },
};
</script>
