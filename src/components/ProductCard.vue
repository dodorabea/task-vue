<template>
    <v-card class="prodct__card mx-auto pa-4"
     outlined variant="text" 
     rounded="xl" 
     @click="goToDetails"
     style="cursor: pointer;">
        <v-img color="" height="336" :src="product.thumbnail" />
        <v-card-text class="text-start">
            <div class="prodct__card--title ellipsed">{{ product.title }}</div>
            <span class="prodct__card--price">${{ product.price.toFixed(2) }}</span>
        </v-card-text>
        <v-card-actions>
            <v-btn rounded="xs" variant="outlined" elevation="0" color="green" class="capitalize-text"
                @click="reveal = true">
                Learn More
            </v-btn>
        </v-card-actions>
    </v-card>
</template>
<script>
export default {
    name: "ProductCard",
    props: {
        product: {
            type: Object,
            required: true
        }
    },
    methods: {
    goToDetails() {
      this.$router.push({ name: "productDetails", params: { id: this.product.id } });
    }
  }
};
</script>