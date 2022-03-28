<template>
  <!-- source: https://bbbootstrap.com/snippets/checkout-form-12016070-->
  <div class="bg">
    <div class="row mainRow">
      <div class="col-sm-8">
        <div class="card card-cascade wider shadow p-3 mb-5">
          <div class="view view-cascade overlay text-center">
            <img
              class="card-img-top"
              v-bind:src="require('../assets/' + productDetails.product.name + '.jpg')"
            />
            <a>
              <div class="mask rgba-white-slight"></div>
            </a>
          </div>
          <div class="details">
            <div class="row subRow">
              <div class="col">
                <p class="text-muted row1">Refreshrate</p>
                <p class="row2">{{ productDetails.product.refreshRateHz }} Hz</p>
              </div>
              <div class="col">
                <p class="text-muted row1">Resolution</p>
                <p class="row2">{{ productDetails.product.resolution }}</p>
              </div>
              <div class="col">
                <p class="text-muted row1">Display Size</p>
                <p class="row2">{{ productDetails.product.displaySizeInches }} Zoll</p>
              </div>
            </div>
            <div class="row subRow">
              <div class="col">
                <p class="text-muted row1">Reactiomtime</p>
                <p class="row2">{{ productDetails.product.reactionTimeMs }} ms</p>
              </div>
              <div class="col">
                <p class="text-muted row1">Color</p>
                <p class="row2">{{ productDetails.product.color }}</p>
              </div>
              <div class="col">
                <p class="text-muted row1">Weight</p>
                <p class="row2">{{ productDetails.product.weightKg }} kg</p>
              </div>
            </div>
            <div class="row subRow">
              <div class="col">
                <p class="text-muted row1">Product Name</p>
                <p class="row2">{{ productDetails.product.name }}</p>
              </div>
              <div class="col">
                <p class="text-muted row1">Manufacturer</p>
                <p class="row2">{{ productDetails.product.manufacturer }}</p>
              </div>
              <div class="col">
                <p class="text-muted row1">DisplayInterface</p>
                <p class="row2">{{ productDetails.product.displayInterface }}</p>
              </div>
            </div>
          </div>
          <div class="details">
            <div class="row subRow"></div>
          </div>
          <div class="d-flex flex-column mt-4">
            <button type="button" id="back-btn" @click="callProductList()">Back</button>
          </div>
        </div>
      </div>
      <div class="col-sm-4">
        <div class="card card-cascade card-ecommerce wider shadow p-3 mb-5">
          <div class="card-body card-body-cascade">
            <div class="card2decs">
              <p class="heading1">
                <strong>{{ productDetails.product.name }}</strong>
              </p>
              <p class="subtotal">VAT</p>
              <p class="text1">{{ productDetails.vat }} €</p>
              <br />
              <p class="subtotal">Price</p>
              <p class="text1">{{ productDetails.product.priceEuro }} €</p>
              <p class="total">Total</p>
              <p class="text1">
                {{
                  (Number(productDetails.vat) + Number(productDetails.product.priceEuro)).toFixed(2)
                }}
                €
              </p>
            </div>
            <div class="info">
              <p class="heading2"><strong>Delivery Information</strong></p>
              <p class="cardAndExpire">Amount</p>
              <p class="infoValues">{{ productDetails.deliveryInformation.amount }} in store</p>
              <p class="cardAndExpire">Deliverytime</p>
              <p class="infoValues">
                {{ productDetails.deliveryInformation.deliveryTimeDays }} days
              </p>
              <p class="nameAndcvc">Deliverydate</p>
              <p class="infoValues">
                {{ productDetails.deliveryDate }}
              </p>
              <p class="nameAndcvc">Address</p>
              <p class="infoValues">
                {{ productDetails.deliveryInformation.productLocation.country }}
                <br />
                {{ productDetails.deliveryInformation.productLocation.street }}
                {{ productDetails.deliveryInformation.productLocation.homeNr }}
                <br />
                {{ productDetails.deliveryInformation.productLocation.postalCode }},
                {{ productDetails.deliveryInformation.productLocation.city }}
              </p>
              <p class="nameAndcvc">Coordinates</p>
              <p class="infoValues">
                Lat: {{ productDetails.geocode.lat }}
                <br />
                Lon: {{ productDetails.geocode.lon }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ProductDataService from "../services/ProductDataService";

export default {
  name: "ProductDetails",
  data() {
    return {
      productDetails: null,
    };
  },
  methods: {
    getProduct(id) {
      ProductDataService.get(id).then((response) => {
        this.productDetails = response.data;
        console.log(response.data);
      });
    },
    callProductList() {
      this.$router.push("/products/");
    },
  },
  created() {
    this.getProduct(this.$route.params.id);
    this.$watch(
      () => this.$route.params,
      (toParams, previousParams) => {
        this.getProduct(toParams);
        previousParams;
      }
    );
  },
};
</script>

<style>
.bg {
  width: 100%;
  height: auto;
  min-height: 100vh;
  background-color: rgb(189, 207, 202);
  background-size: 100% 100%;
  background-position: top center;
  margin: auto;
}

.mainRow {
  margin-left: 10%;
  margin-right: 10%;
}

p {
  margin: 0px;
}

.details {
  background-color: rgb(206, 233, 220);
  margin-top: 5%;
  margin-left: 5%;
  margin-right: 50px;
  margin-bottom: 4%;
}

.card-body {
  padding: 0;
  margin: 0;
  margin-top: 10%;
}

div.card.main {
  margin: 0px;
}

.card {
  padding: 0;
  margin-top: 30px;
  height: 100%;
}

.heading1 {
  margin: 5%;
  margin-bottom: 15%;
  font-size: 30px;
}

.heading2 {
  margin: 5%;
  margin-top: 15%;
  font-size: 20px;
}

.info {
  background-color: rgb(206, 233, 220);
  padding: 3px;
  margin-top: 40%;
}

.text1 {
  color: black;
  font-weight: 700;
  font-size: 20px;
}

.row1 {
  font-size: 12px;
}

.row2 {
  font-weight: 600;
}

.subRow {
  margin-left: 10%;
  margin-bottom: 2%;
  margin-top: 5%;
}

p.infoValues {
  margin: 5%;
  margin-bottom: 10%;
  font-weight: 600;
}

p.coordinateValues {
  margin: 5%;
  margin-bottom: 0%;
  font-weight: 600;
}

p.nameAndcvc,
p.cardAndExpire {
  margin-bottom: -10px;
}

.total {
  margin-top: 10%;
  margin-bottom: 5%;
  font-size: 30px;
}

.subtotal {
  margin-top: 5%;
  margin-bottom: 5%;
  font-size: 20px;
}

.totalText {
  font-weight: 700;
}

.totalText2 {
  font-weight: 700;
  font-size: 30px;
}

.card-img-top {
  width: 100%;
  border-top-left-radius: calc(0.25rem - 1px);
  border-top-right-radius: calc(0.25rem - 1px);
  height: 100%;
}
#back-btn {
  margin-top: 5%;
  margin-bottom: 2%;
  margin-right: 85%;
  background: rgb(6, 161, 149);
  color: #eee;
  padding: 1%;
  border-color: black;
  border-radius: 4px;
}
</style>
