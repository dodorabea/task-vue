<template>
    <v-container>
    <v-btn variant="text" color="success" @click="$router.push({ name: 'products' })"> <v-icon color="success">mdi-arrow-left-circle</v-icon> Back</v-btn>
    </v-container>
    <v-container class="text-center" v-if="product">
        <v-row density="comfortable" align="center">
            <v-col cols="12" md="4" class="mx-auto">
                <h4 class="title mb-4 capitalize-text">{{ product.category }} Groups ⚡</h4>
            </v-col>
            <v-col cols="12" md="8" class="mx-auto">
                <v-card class="prodct__card mx-auto pa-4" outlined  rounded="lg">
                    <v-row align="center" justify="center">
                        <v-col cols="12" md="4">
                            <v-img :src="product.thumbnail"/>
                        </v-col>
                        <v-col cols="12" md="8">
                            <v-card-text class="text-start">
                                <div class="prodct__card--title ellipsed">{{ product.title }}</div>
                                <span class="prodct__card--price"><span>price:</span> ${{ product.price.toFixed(2) }}</span>
                                <div class="rating">
                                    <v-icon v-for="star in 4" color="warning">mdi-star</v-icon>
                                    <span>({{ product.rating }})</span>
                                </div>
                                <p>{{ product.description }}</p>
                            </v-card-text>
                        </v-col>
                    </v-row>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
    <v-container v-else>
        <div>Product not found</div>
    </v-container>
</template>
<script>
export default {
  computed: {
    product() {
      return this.$store.state.product
    }
  },

  async mounted() {
    const id = this.$route.params.id
    await this.$store.dispatch('getProduct', id)
  }
}
</script>
<style lang="scss" scoped>
.title {
    position: relative;
    font-size: 32px;
    font-style: normal;
    font-weight: 700;
    line-height: 36px;
    width: max-content;
    padding-inline-start: 16px;

    &::before {
        content: '';
        position: absolute;
        display: block;
        width: 3px;
        height: calc(100% - 0px);
        background-color: #4CAF50;
        border-radius: 25px;
        inset-inline-start: 0;
    }
}
.v-card-text{
    display: flex;
    flex-direction: column;
    gap: 8px;
    p{
        font-size: 14px;
        color: #8F8F8F;
    }
}
.v-card {
    box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.1);
}

.prodct__card {
    &--title {
        font-size: 24px;
        font-weight: 600;
    }
    &--price{
        span{
            color: #27AE60;
            font-weight: 700;
        }
    }
}

.capitalize-text {
    text-transform: capitalize;
}
.rating{
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    span{
        padding-inline-start: 8px;
        color: #898990;
    }
}
.ellipsed {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
button{
    &.v-btn{
        padding: 0;
    }
}
</style>