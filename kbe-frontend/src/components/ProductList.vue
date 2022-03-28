<template>
  <!-- source: https://bbbootstrap.com/snippets/bootstrap-ecommerce-category-product-list-page-93685579-->
  <div class="container mt-5 mb-5">
    <div class="d-flex justify-content-center row">
      <div class="col-md-10">
        <ul>
          <li v-for="product in products" v-bind:key="product.id">
            <div class="row p-2 bg-white border">
              <div class="col-md-3 mt-1">
                <img
                  class="img-fluid img-responsive product-image"
                  v-bind:src="require('../assets/' + product.name + '.jpg')"
                />
              </div>
              <div class="col-md-6 mt-1">
                <h5>{{ product.name }}</h5>
                <div class="d-flex flex-row">
                  <div class="ratings mr-2">
                    <i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i
                    ><i class="fa fa-star"></i>
                  </div>
                </div>
                <div class="mt-1 mb-1 spec-1">
                  <br />
                  <span>{{ product.displaySizeInches }} Zoll</span><span class="dot"></span
                  ><span>{{ product.refreshRateHz }} Hz</span><span class="dot"></span
                  ><span>{{ product.resolution }}<br /></span>
                </div>
              </div>
              <div class="align-items-center align-content-center col-md-3 border-left mt-1">
                <div class="d-flex flex-row align-items-center">
                  <h4 class="mr-1">{{ product.priceEuro }} €</h4>
                </div>
                <div class="d-flex flex-column mt-4">
                  <button type="button" id="detail-btn" @click="callProductDetails(product.id)">
                    Details
                  </button>
                </div>
              </div>
            </div>
            <br />
          </li>
        </ul>
      </div>
    </div>
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
    getProduct(id) {
      ProductDataService.get(id).then((response) => {
        this.currentProduct = response.data;
        console.log(response.data);
      });
    },
    refreshList() {
      this.retrieveProducts();
      this.currentProduct = null;
      this.currentIndex = -1;
    },
    callProductDetails(id) {
      this.$router.push("/products/" + id);
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

<style>
body {
  background: rgb(189, 207, 202);
}

.product-image {
  width: 100%;
}

.dot {
  height: 10px;
  width: 10px;
  margin-left: 15px;
  margin-right: 15px;
  margin-top: 3px;
  background-color: rgb(6, 161, 149);
  border-radius: 50%;
  display: inline-block;
}

.spec-1 {
  color: #758b8d;
  font-size: 15px;
}

h5 {
  font-weight: 400;
}

.para {
  font-size: 16px;
}

#detail-btn {
  margin-top: 30%;
  margin-bottom: 15%;
  background: rgb(6, 161, 149);
  color: #eee;
  padding: 3%;
  border-color: black;
  border-radius: 4px;
}
</style>
